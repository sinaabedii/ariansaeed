"""
Admin configuration for Careers app.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from .models import Job, Resume


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    """Admin interface for Job Listings."""
    
    list_display = [
        'id',
        'title',
        'department',
        'location',
        'employment_type',
        'status_badge',
        'featured_badge',
        'applications_count',
        'views_count',
        'created_at'
    ]
    list_filter = ['status', 'employment_type', 'department', 'featured', 'created_at']
    search_fields = ['title', 'description', 'department', 'location']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views_count', 'applications_count', 'created_at', 'updated_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'department', 'location', 'employment_type')
        }),
        ('Job Details', {
            'fields': ('description', 'requirements', 'responsibilities', 'benefits')
        }),
        ('Salary Information', {
            'fields': ('salary_min', 'salary_max', 'salary_currency'),
            'classes': ('collapse',)
        }),
        ('Status & Settings', {
            'fields': ('status', 'featured', 'application_deadline')
        }),
        ('Statistics', {
            'fields': ('views_count', 'applications_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_active', 'mark_as_paused', 'mark_as_closed', 'mark_as_featured']
    
    def status_badge(self, obj):
        """Display status as colored badge."""
        colors = {
            'active': '#28a745',
            'paused': '#ffc107',
            'closed': '#dc3545',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def featured_badge(self, obj):
        """Display featured status."""
        if obj.featured:
            return format_html(
                '<span style="color: #ffc107; font-size: 18px;">⭐</span>'
            )
        return '-'
    featured_badge.short_description = 'Featured'
    
    def mark_as_active(self, request, queryset):
        updated = queryset.update(status='active')
        self.message_user(request, f'{updated} job(s) marked as active.')
    mark_as_active.short_description = 'Mark as Active'
    
    def mark_as_paused(self, request, queryset):
        updated = queryset.update(status='paused')
        self.message_user(request, f'{updated} job(s) marked as paused.')
    mark_as_paused.short_description = 'Mark as Paused'
    
    def mark_as_closed(self, request, queryset):
        updated = queryset.update(status='closed')
        self.message_user(request, f'{updated} job(s) marked as closed.')
    mark_as_closed.short_description = 'Mark as Closed'
    
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f'{updated} job(s) marked as featured.')
    mark_as_featured.short_description = 'Mark as Featured'


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    """Admin interface for Resume Submissions."""
    
    list_display = [
        'id',
        'full_name',
        'email',
        'position_display',
        'experience',
        'status_badge',
        'rating_display',
        'created_at',
        'file_link'
    ]
    list_filter = ['status', 'experience', 'created_at', 'job__department']
    search_fields = ['full_name', 'email', 'phone', 'position', 'job__title']
    readonly_fields = ['created_at', 'updated_at', 'ip_address', 'file_size_display']
    date_hierarchy = 'created_at'
    autocomplete_fields = ['job']
    
    fieldsets = (
        ('Applicant Information', {
            'fields': ('full_name', 'email', 'phone', 'location')
        }),
        ('Job Information', {
            'fields': ('job', 'position', 'experience')
        }),
        ('Application Details', {
            'fields': ('cover_letter', 'resume_file', 'file_size_display')
        }),
        ('Status & Review', {
            'fields': ('status', 'rating', 'recruiter_notes')
        }),
        ('Metadata', {
            'fields': ('ip_address', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = [
        'mark_as_reviewing',
        'mark_as_shortlisted',
        'mark_as_rejected',
        'mark_as_interviewed'
    ]
    
    def position_display(self, obj):
        """Display position with job title if available."""
        if obj.job:
            return f"{obj.job.title} ({obj.job.department})"
        return obj.position
    position_display.short_description = 'Position'
    
    def status_badge(self, obj):
        """Display status as colored badge."""
        colors = {
            'new': '#007bff',
            'reviewing': '#ffc107',
            'shortlisted': '#17a2b8',
            'interviewed': '#6f42c1',
            'rejected': '#dc3545',
            'hired': '#28a745',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold; font-size: 11px;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def rating_display(self, obj):
        """Display rating as stars."""
        if obj.rating:
            stars = '⭐' * obj.rating
            return format_html(f'<span style="font-size: 16px;">{stars}</span>')
        return '-'
    rating_display.short_description = 'Rating'
    
    def file_link(self, obj):
        """Display link to resume file."""
        if obj.resume_file:
            return format_html(
                '<a href="{}" target="_blank" class="button">View Resume</a>',
                obj.resume_file.url
            )
        return '-'
    file_link.short_description = 'Resume File'
    
    def file_size_display(self, obj):
        """Display file size."""
        size = obj.get_file_size()
        return f"{size} MB" if size > 0 else "N/A"
    file_size_display.short_description = 'File Size'
    
    def mark_as_reviewing(self, request, queryset):
        updated = queryset.update(status='reviewing')
        self.message_user(request, f'{updated} application(s) marked as under review.')
    mark_as_reviewing.short_description = 'Mark as Under Review'
    
    def mark_as_shortlisted(self, request, queryset):
        updated = queryset.update(status='shortlisted')
        self.message_user(request, f'{updated} application(s) shortlisted.')
    mark_as_shortlisted.short_description = 'Mark as Shortlisted'
    
    def mark_as_rejected(self, request, queryset):
        updated = queryset.update(status='rejected')
        self.message_user(request, f'{updated} application(s) rejected.')
    mark_as_rejected.short_description = 'Mark as Rejected'
    
    def mark_as_interviewed(self, request, queryset):
        updated = queryset.update(status='interviewed')
        self.message_user(request, f'{updated} application(s) marked as interviewed.')
    mark_as_interviewed.short_description = 'Mark as Interviewed'
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('job')
