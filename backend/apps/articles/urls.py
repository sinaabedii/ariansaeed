"""
URL configuration for Articles app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, CategoryViewSet

app_name = 'articles'

router = DefaultRouter()
router.register(r'', ArticleViewSet, basename='article')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
]
