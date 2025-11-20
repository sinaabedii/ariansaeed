"""
Careers app models for job listings and resume submissions.
"""

import os
from django.db import models
from django.core.validators import EmailValidator, FileExtensionValidator
from django.utils.text import slugify


def resume_upload_path(instance, filename):
    """Generate upload path for resume files."""
    # Get file extension
    ext = filename.split('.')[-1]
    # Generate filename: resumes/2024/11/john_doe_software_engineer.pdf
    safe_name = slugify(f"{instance.full_name}_{instance.position}")
    return f"resumes/{instance.created_at.year}/{instance.created_at.month:02d}/{safe_name}.{ext}"


class Job(models.Model):
    """Model for job listings."""
    
    EMPLOYMENT_TYPE_CHOICES = [
        ('full-time', 'Full-time'),
        ('part-time', 'Part-time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('closed', 'Closed'),
    ]
    
    # Basic Information
    title = models.CharField(
        max_length=200,
        verbose_name='Job Title',
        db_index=True
    )
    slug = models.SlugField(
        max_length=250,
        unique=True,
        verbose_name='Slug'
    )
    department = models.CharField(
        max_length=100,
        verbose_name='Department',
        db_index=True
    )
    location = models.CharField(
        max_length=200,
        verbose_name='Location'
    )
    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_TYPE_CHOICES,
        default='full-time',
        verbose_name='Employment Type'
    )
    
    # Job Details
    description = models.TextField(
        verbose_name='Job Description',
        help_text='Detailed description of the job role'
    )
    requirements = models.TextField(
        blank=True,
        verbose_name='Requirements',
        help_text='Required skills and qualifications'
    )
    responsibilities = models.TextField(
        blank=True,
        verbose_name='Responsibilities',
        help_text='Key responsibilities of the role'
    )
    benefits = models.TextField(
        blank=True,
        verbose_name='Benefits',
        help_text='Benefits and perks'
    )
    
    # Salary (Optional)
    salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Minimum Salary'
    )
    salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Maximum Salary'
    )
    salary_currency = models.CharField(
        max_length=3,
        default='USD',
        verbose_name='Currency'
    )
    
    # Status & Metadata
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
        db_index=True,
        verbose_name='Status'
    )
    featured = models.BooleanField(
        default=False,
        verbose_name='Featured Job',
        help_text='Display this job prominently'
    )
    application_deadline = models.DateField(
        null=True,
        blank=True,
        verbose_name='Application Deadline'
    )
    
    # Timestamps
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created At',
        db_index=True
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated At'
    )
    
    # Statistics
    views_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Views Count'
    )
    applications_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Applications Count'
    )
    
    class Meta:
        ordering = ['-featured', '-created_at']
        verbose_name = 'Job Listing'
        verbose_name_plural = 'Job Listings'
        indexes = [
            models.Index(fields=['-created_at', 'status']),
            models.Index(fields=['department', 'status']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.department}"
    
    def save(self, *args, **kwargs):
        """Auto-generate slug from title."""
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def increment_views(self):
        """Increment view count."""
        self.views_count += 1
        self.save(update_fields=['views_count'])
    
    def increment_applications(self):
        """Increment applications count."""
        self.applications_count += 1
        self.save(update_fields=['applications_count'])


class Resume(models.Model):
    """Model for resume/CV submissions."""
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewing', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('interviewed', 'Interviewed'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    ]
    
    EXPERIENCE_CHOICES = [
        ('0-1', '0-1 years'),
        ('1-3', '1-3 years'),
        ('3-5', '3-5 years'),
        ('5-10', '5-10 years'),
        ('10+', '10+ years'),
    ]
    
    # Applicant Information
    full_name = models.CharField(
        max_length=200,
        verbose_name='Full Name'
    )
    email = models.EmailField(
        max_length=254,
        validators=[EmailValidator()],
        verbose_name='Email Address',
        db_index=True
    )
    phone = models.CharField(
        max_length=20,
        verbose_name='Phone Number'
    )
    
    # Job Information
    job = models.ForeignKey(
        Job,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='applications',
        verbose_name='Applied Job'
    )
    position = models.CharField(
        max_length=200,
        verbose_name='Desired Position'
    )
    location = models.CharField(
        max_length=200,
        verbose_name='Current Location'
    )
    experience = models.CharField(
        max_length=10,
        choices=EXPERIENCE_CHOICES,
        verbose_name='Years of Experience'
    )
    
    # Additional Information
    cover_letter = models.TextField(
        blank=True,
        verbose_name='Cover Letter'
    )
    resume_file = models.FileField(
        upload_to=resume_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])],
        verbose_name='Resume/CV File',
        help_text='Allowed formats: PDF, DOC, DOCX'
    )
    
    # Status & Review
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        db_index=True,
        verbose_name='Application Status'
    )
    recruiter_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name='Recruiter Notes',
        help_text='Internal notes for HR team'
    )
    rating = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        verbose_name='Rating (1-5)',
        help_text='Recruiter rating'
    )
    
    # Timestamps
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Submitted At',
        db_index=True
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated At'
    )
    
    # Metadata
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name='IP Address'
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Resume/Application'
        verbose_name_plural = 'Resumes/Applications'
        indexes = [
            models.Index(fields=['-created_at', 'status']),
            models.Index(fields=['email', 'status']),
        ]
    
    def __str__(self):
        job_title = self.job.title if self.job else self.position
        return f"{self.full_name} - {job_title}"
    
    def get_file_size(self):
        """Get resume file size in MB."""
        if self.resume_file:
            return round(self.resume_file.size / (1024 * 1024), 2)
        return 0
