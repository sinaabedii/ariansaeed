"""
Admin configuration for Contact app.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Admin interface for Contact Messages."""
    
    list_display = [
        'id',
        'name',
        'email',
        'subject_preview',
        'status_badge',
        'created_at',
        'quick_actions'
    ]
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['id', 'created_at', 'updated_at', 'ip_address', 'user_agent']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject', 'message')
        }),
        ('Status & Management', {
            'fields': ('status', 'admin_notes')
        }),
        ('Metadata', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_replied', 'mark_as_archived']
    
    def subject_preview(self, obj):
        """Show preview of subject."""
        if len(obj.subject) > 50:
            return f"{obj.subject[:50]}..."
        return obj.subject
    subject_preview.short_description = 'Subject'
    
    def status_badge(self, obj):
        """Display status as colored badge."""
        colors = {
            'new': '#dc3545',
            'read': '#ffc107',
            'replied': '#28a745',
            'archived': '#6c757d',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def quick_actions(self, obj):
        """Display quick action buttons."""
        if obj.status == 'new':
            return format_html(
                '<a class="button" href="#" onclick="return false;">Mark as Read</a>'
            )
        return '-'
    quick_actions.short_description = 'Quick Actions'
    
    def mark_as_read(self, request, queryset):
        """Mark selected messages as read."""
        updated = queryset.filter(status='new').update(status='read')
        self.message_user(request, f'{updated} message(s) marked as read.')
    mark_as_read.short_description = 'Mark as Read'
    
    def mark_as_replied(self, request, queryset):
        """Mark selected messages as replied."""
        updated = queryset.update(status='replied')
        self.message_user(request, f'{updated} message(s) marked as replied.')
    mark_as_replied.short_description = 'Mark as Replied'
    
    def mark_as_archived(self, request, queryset):
        """Mark selected messages as archived."""
        updated = queryset.update(status='archived')
        self.message_user(request, f'{updated} message(s) archived.')
    mark_as_archived.short_description = 'Archive'
    
    def get_queryset(self, request):
        """Optimize queryset."""
        return super().get_queryset(request).select_related()
