"""
Tests for Careers app.
"""

from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status
from .models import Job, Resume


class JobTestCase(TestCase):
    """Test cases for Job model and API."""
    
    def setUp(self):
        self.client = APIClient()
        self.job_data = {
            'title': 'Senior Software Engineer',
            'department': 'Engineering',
            'location': 'Tehran, Iran',
            'employment_type': 'full-time',
            'description': 'Looking for an experienced software engineer.',
            'status': 'active'
        }
        self.job = Job.objects.create(**self.job_data)
    
    def test_job_creation(self):
        """Test creating a job listing."""
        self.assertEqual(Job.objects.count(), 1)
        self.assertEqual(self.job.title, 'Senior Software Engineer')
        self.assertIsNotNone(self.job.slug)
    
    def test_job_list_api(self):
        """Test getting list of jobs."""
        response = self.client.get('/api/careers/jobs/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_job_detail_api(self):
        """Test getting job details."""
        response = self.client.get(f'/api/careers/jobs/{self.job.id}/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Senior Software Engineer')
    
    def test_job_increment_views(self):
        """Test incrementing job views."""
        initial_views = self.job.views_count
        self.job.increment_views()
        
        self.assertEqual(self.job.views_count, initial_views + 1)
    
    def test_job_filtering_by_department(self):
        """Test filtering jobs by department."""
        response = self.client.get('/api/careers/jobs/?department=Engineering')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_inactive_jobs_not_shown(self):
        """Test that inactive jobs are not shown in API."""
        self.job.status = 'closed'
        self.job.save()
        
        response = self.client.get('/api/careers/jobs/')
        
        self.assertEqual(len(response.data['results']), 0)


class ResumeTestCase(TestCase):
    """Test cases for Resume model and API."""
    
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/careers/resume/'
        
        # Create a job
        self.job = Job.objects.create(
            title='Test Job',
            department='IT',
            location='Tehran',
            employment_type='full-time',
            description='Test job description',
            status='active'
        )
        
        # Create a test PDF file
        self.test_file = SimpleUploadedFile(
            "resume.pdf",
            b"file_content",
            content_type="application/pdf"
        )
    
    def test_resume_submission_success(self):
        """Test successful resume submission."""
        data = {
            'full_name': 'Jane Doe',
            'email': 'jane@example.com',
            'phone': '+98 912 345 6789',
            'position': 'Software Engineer',
            'location': 'Tehran',
            'experience': '3-5',
            'cover_letter': 'I am interested in this position...',
            'resume_file': self.test_file,
            'job_id': self.job.id
        }
        
        response = self.client.post(self.url, data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(Resume.objects.count(), 1)
        
        resume = Resume.objects.first()
        self.assertEqual(resume.full_name, 'Jane Doe')
        self.assertEqual(resume.job, self.job)
    
    def test_resume_submission_without_job(self):
        """Test resume submission for general application."""
        data = {
            'full_name': 'John Smith',
            'email': 'john@example.com',
            'phone': '+98 912 111 2222',
            'position': 'Any position',
            'location': 'Tehran',
            'experience': '1-3',
            'resume_file': self.test_file
        }
        
        response = self.client.post(self.url, data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        
        resume = Resume.objects.first()
        self.assertIsNone(resume.job)
