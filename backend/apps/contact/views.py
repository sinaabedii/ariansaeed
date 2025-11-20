"""
Views for Contact app.
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageCreateView(APIView):
    """
    API endpoint for creating contact messages.
    
    POST /api/contact/
    """
    
    def post(self, request):
        """Create a new contact message."""
        serializer = ContactMessageSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            contact_message = serializer.save()
            
            # Send email notification to admin
            try:
                self.send_notification_email(contact_message)
            except Exception as e:
                # Log error but don't fail the request
                print(f"Failed to send email notification: {str(e)}")
            
            return Response(
                {
                    'success': True,
                    'message': 'Thank you for contacting us! We will get back to you soon.',
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
    
    def send_notification_email(self, contact_message):
        """Send email notification to admin."""
        subject = f"New Contact Message: {contact_message.subject}"
        message = f"""
New contact message received:

Name: {contact_message.name}
Email: {contact_message.email}
Subject: {contact_message.subject}

Message:
{contact_message.message}

---
Submitted at: {contact_message.created_at.strftime('%Y-%m-%d %H:%M:%S')}
IP Address: {contact_message.ip_address or 'N/A'}
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=False,
        )
