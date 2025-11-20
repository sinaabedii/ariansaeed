"""
Serializers for Contact app.
"""

from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for creating contact messages."""
    
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_name(self, value):
        """Validate name field."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()
    
    def validate_message(self, value):
        """Validate message field."""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()
    
    def create(self, validated_data):
        """Create contact message with additional metadata."""
        request = self.context.get('request')
        
        if request:
            # Add IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                validated_data['ip_address'] = x_forwarded_for.split(',')[0]
            else:
                validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
            
            # Add user agent
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
        
        return super().create(validated_data)


class ContactMessageDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for admin view."""
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'subject', 'message',
            'status', 'ip_address', 'user_agent',
            'created_at', 'updated_at', 'admin_notes'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
