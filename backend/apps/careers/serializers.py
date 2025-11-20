"""
Serializers for Careers app.
"""

from rest_framework import serializers
from .models import Job, Resume


class JobListSerializer(serializers.ModelSerializer):
    """Serializer for job listing (list view)."""
    
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'slug',
            'department',
            'location',
            'employment_type',
            'description',
            'featured',
            'views_count',
            'applications_count',
            'created_at'
        ]
        read_only_fields = ['id', 'slug', 'views_count', 'applications_count', 'created_at']


class JobDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for job (detail view)."""
    
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'slug',
            'department',
            'location',
            'employment_type',
            'description',
            'requirements',
            'responsibilities',
            'benefits',
            'salary_min',
            'salary_max',
            'salary_currency',
            'status',
            'featured',
            'application_deadline',
            'views_count',
            'applications_count',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'views_count', 'applications_count', 'created_at', 'updated_at']


class ResumeSubmitSerializer(serializers.ModelSerializer):
    """Serializer for submitting resume/application."""
    
    job_id = serializers.IntegerField(
        required=False,
        allow_null=True,
        write_only=True,
        help_text='ID of the job being applied for (optional for general applications)'
    )
    
    class Meta:
        model = Resume
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'job_id',
            'position',
            'location',
            'experience',
            'cover_letter',
            'resume_file',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate_full_name(self, value):
        """Validate full name."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters long.")
        return value.strip()
    
    def validate_phone(self, value):
        """Validate phone number."""
        # Remove spaces and dashes
        cleaned = value.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
        if len(cleaned) < 10:
            raise serializers.ValidationError("Please enter a valid phone number.")
        return value
    
    def validate_resume_file(self, value):
        """Validate resume file."""
        # Check file size (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Resume file size cannot exceed 10MB.")
        
        # Check file extension
        allowed_extensions = ['pdf', 'doc', 'docx']
        ext = value.name.split('.')[-1].lower()
        if ext not in allowed_extensions:
            raise serializers.ValidationError(
                f"Only {', '.join(allowed_extensions).upper()} files are allowed."
            )
        
        return value
    
    def create(self, validated_data):
        """Create resume submission."""
        job_id = validated_data.pop('job_id', None)
        request = self.context.get('request')
        
        # Link to job if job_id provided
        if job_id:
            try:
                job = Job.objects.get(id=job_id, status='active')
                validated_data['job'] = job
                # Increment job applications count
                job.increment_applications()
            except Job.DoesNotExist:
                pass
        
        # Add IP address
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                validated_data['ip_address'] = x_forwarded_for.split(',')[0]
            else:
                validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
        
        return super().create(validated_data)


class ResumeDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for resume (admin view)."""
    
    job_title = serializers.CharField(source='job.title', read_only=True)
    file_size = serializers.SerializerMethodField()
    
    class Meta:
        model = Resume
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'job',
            'job_title',
            'position',
            'location',
            'experience',
            'cover_letter',
            'resume_file',
            'file_size',
            'status',
            'recruiter_notes',
            'rating',
            'ip_address',
            'created_at',
            'updated_at'
        ]
    
    def get_file_size(self, obj):
        """Get file size in MB."""
        return obj.get_file_size()
