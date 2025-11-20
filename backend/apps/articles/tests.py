"""
Tests for Articles app.
"""

from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Article, ArticleLike


class CategoryTestCase(TestCase):
    """Test cases for Category model."""
    
    def setUp(self):
        self.category = Category.objects.create(
            name='Technology',
            description='Tech articles'
        )
    
    def test_category_creation(self):
        """Test creating a category."""
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(self.category.name, 'Technology')
        self.assertIsNotNone(self.category.slug)
    
    def test_category_slug_auto_generation(self):
        """Test automatic slug generation."""
        self.assertEqual(self.category.slug, 'technology')


class ArticleTestCase(TestCase):
    """Test cases for Article model and API."""
    
    def setUp(self):
        self.client = APIClient()
        
        # Create category
        self.category = Category.objects.create(
            name='Automotive',
            description='Auto news'
        )
        
        # Create published article
        self.article = Article.objects.create(
            title='BYD Showroom Opening',
            excerpt='Short summary of the article',
            content='Full content of the article. ' * 50,
            category=self.category,
            author='Editorial Team',
            status='published',
            publish_date=timezone.now(),
            featured=True
        )
    
    def test_article_creation(self):
        """Test creating an article."""
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(self.article.title, 'BYD Showroom Opening')
        self.assertIsNotNone(self.article.slug)
    
    def test_article_read_time_calculation(self):
        """Test automatic read time calculation."""
        # The article has about 300 words, should be ~2 min
        self.assertGreater(self.article.read_time, 0)
    
    def test_article_list_api(self):
        """Test getting list of articles."""
        response = self.client.get('/api/articles/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_article_detail_api(self):
        """Test getting article details."""
        response = self.client.get(f'/api/articles/{self.article.id}/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'BYD Showroom Opening')
    
    def test_draft_articles_not_shown(self):
        """Test that draft articles are not shown in API."""
        draft_article = Article.objects.create(
            title='Draft Article',
            excerpt='This is a draft',
            content='Draft content',
            category=self.category,
            status='draft'
        )
        
        response = self.client.get('/api/articles/')
        
        # Should only show published article
        self.assertEqual(len(response.data['results']), 1)
    
    def test_article_like_api(self):
        """Test liking an article."""
        initial_likes = self.article.likes_count
        
        response = self.client.post(f'/api/articles/{self.article.id}/like/')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        
        self.article.refresh_from_db()
        self.assertEqual(self.article.likes_count, initial_likes + 1)
    
    def test_article_view_tracking(self):
        """Test tracking article views."""
        initial_views = self.article.views_count
        
        response = self.client.post(f'/api/articles/{self.article.id}/view/')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.article.refresh_from_db()
        self.assertEqual(self.article.views_count, initial_views + 1)
    
    def test_featured_articles_api(self):
        """Test getting featured articles."""
        response = self.client.get('/api/articles/featured/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data[0]['featured'])
    
    def test_category_filtering(self):
        """Test filtering articles by category."""
        response = self.client.get(f'/api/articles/?category={self.category.id}')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_get_tags_list(self):
        """Test getting tags as list."""
        self.article.tags = 'BYD, Automotive, Iran'
        self.article.save()
        
        tags = self.article.get_tags_list()
        
        self.assertEqual(len(tags), 3)
        self.assertIn('BYD', tags)
