"""
Views for Careers app.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.core.mail import send_mail
from django.conf import settings
from .models import Job, Resume
from .serializers import (
    JobListSerializer,
    JobDetailSerializer,
    ResumeSubmitSerializer
)


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for job listings.
    
    list: GET /api/careers/jobs/
    retrieve: GET /api/careers/jobs/{id}/
    """
    
    queryset = Job.objects.filter(status='active')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['department', 'employment_type', 'location']
    search_fields = ['title', 'description', 'department']
    ordering_fields = ['created_at', 'views_count', 'applications_count']
    ordering = ['-featured', '-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve job detail and increment view count."""
        instance = self.get_object()
        # Increment view count
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured jobs."""
        featured_jobs = self.queryset.filter(featured=True)[:5]
        serializer = self.get_serializer(featured_jobs, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def departments(self, request):
        """Get list of unique departments."""
        departments = self.queryset.values_list('department', flat=True).distinct()
        return Response({'departments': list(departments)})


class ResumeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for resume submissions.
    
    create: POST /api/careers/resume/
    """
    
    queryset = Resume.objects.all()
    serializer_class = ResumeSubmitSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    http_method_names = ['post']  # Only allow POST
    
    def create(self, request, *args, **kwargs):
        """Create a new resume submission."""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            resume = serializer.save()
            
            # Send confirmation email to applicant
            try:
                self.send_confirmation_email(resume)
            except Exception as e:
                print(f"Failed to send confirmation email: {str(e)}")
            
            # Send notification email to HR
            try:
                self.send_notification_email(resume)
            except Exception as e:
                print(f"Failed to send notification email: {str(e)}")
            
            return Response(
                {
                    'success': True,
                    'message': 'Your application has been submitted successfully! '
                               'We will review your resume and get back to you soon.',
                    'data': serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            {
                'success': False,
                'message': 'Validation error',
                'errors': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def send_confirmation_email(self, resume):
        """Send confirmation email to applicant."""
        job_title = resume.job.title if resume.job else resume.position
        
        subject = f"Application Received - {job_title}"
        message = f"""
Dear {resume.full_name},

Thank you for applying for the {job_title} position at Arian Saeed Industrial Group!

We have received your application and resume. Our HR team will carefully review your 
qualifications and experience. If your profile matches our requirements, we will 
contact you within 2-3 business days.

Best regards,
Arian Saeed HR Team
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[resume.email],
            fail_silently=False,
        )
    
    def send_notification_email(self, resume):
        """Send notification email to HR team."""
        job_title = resume.job.title if resume.job else resume.position
        
        subject = f"New Application: {job_title} - {resume.full_name}"
        message = f"""
New job application received:

Applicant: {resume.full_name}
Email: {resume.email}
Phone: {resume.phone}
Position: {job_title}
Location: {resume.location}
Experience: {resume.get_experience_display()}

Cover Letter:
{resume.cover_letter or 'N/A'}

Resume File: {resume.resume_file.url if resume.resume_file else 'N/A'}

---
Submitted at: {resume.created_at.strftime('%Y-%m-%d %H:%M:%S')}
Application ID: {resume.id}
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=False,
        )
