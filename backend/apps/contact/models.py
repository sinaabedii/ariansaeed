"""
Contact app models for handling contact form submissions.
"""

from django.db import models
from django.core.validators import EmailValidator


class ContactMessage(models.Model):
    """Model for storing contact form submissions."""
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]
    
    # Contact Information
    name = models.CharField(
        max_length=200,
        verbose_name='Full Name',
        help_text='Full name of the person contacting'
    )
    email = models.EmailField(
        max_length=254,
        validators=[EmailValidator()],
        verbose_name='Email Address'
    )
    subject = models.CharField(
        max_length=300,
        verbose_name='Subject',
        help_text='Subject of the message'
    )
    message = models.TextField(
        verbose_name='Message',
        help_text='Content of the message'
    )
    
    # Status & Metadata
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        db_index=True,
        verbose_name='Status'
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name='IP Address'
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        verbose_name='User Agent'
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
    
    # Admin Notes
    admin_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name='Admin Notes',
        help_text='Internal notes for admin use only'
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
        indexes = [
            models.Index(fields=['-created_at', 'status']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%Y-%m-%d')})"
    
    def mark_as_read(self):
        """Mark message as read."""
        if self.status == 'new':
            self.status = 'read'
            self.save(update_fields=['status', 'updated_at'])
    
    def mark_as_replied(self):
        """Mark message as replied."""
        self.status = 'replied'
        self.save(update_fields=['status', 'updated_at'])
