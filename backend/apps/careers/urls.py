"""
URL configuration for Careers app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ResumeViewSet

app_name = 'careers'

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'resume', ResumeViewSet, basename='resume')

urlpatterns = [
    path('', include(router.urls)),
]
