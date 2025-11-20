"""
Tests for Contact app.
"""

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ContactMessage


class ContactMessageTestCase(TestCase):
    """Test cases for Contact Message functionality."""
    
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/contact/'
        self.valid_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'subject': 'Business Inquiry',
            'message': 'I would like to discuss partnership opportunities.'
        }
    
    def test_create_contact_message_success(self):
        """Test creating a contact message with valid data."""
        response = self.client.post(self.url, self.valid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(ContactMessage.objects.count(), 1)
        
        message = ContactMessage.objects.first()
        self.assertEqual(message.name, 'John Doe')
        self.assertEqual(message.email, 'john@example.com')
        self.assertEqual(message.status, 'new')
    
    def test_create_contact_message_invalid_email(self):
        """Test creating a contact message with invalid email."""
        invalid_data = self.valid_data.copy()
        invalid_data['email'] = 'invalid-email'
        
        response = self.client.post(self.url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])
        self.assertEqual(ContactMessage.objects.count(), 0)
    
    def test_create_contact_message_short_message(self):
        """Test creating a contact message with too short message."""
        invalid_data = self.valid_data.copy()
        invalid_data['message'] = 'Short'
        
        response = self.client.post(self.url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])
    
    def test_contact_message_str_method(self):
        """Test string representation of ContactMessage."""
        message = ContactMessage.objects.create(**self.valid_data)
        self.assertIn('John Doe', str(message))
        self.assertIn('Business Inquiry', str(message))
    
    def test_mark_as_read(self):
        """Test marking message as read."""
        message = ContactMessage.objects.create(**self.valid_data)
        self.assertEqual(message.status, 'new')
        
        message.mark_as_read()
        message.refresh_from_db()
        
        self.assertEqual(message.status, 'read')
