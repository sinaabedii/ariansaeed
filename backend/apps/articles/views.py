"""
Views for Articles app.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.utils import timezone
from .models import Article, Category, ArticleLike, ArticleView
from .serializers import (
    ArticleListSerializer,
    ArticleDetailSerializer,
    CategorySerializer,
    ArticleLikeSerializer,
    ArticleViewSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for article categories.
    
    list: GET /api/articles/categories/
    """
    
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for articles.
    
    list: GET /api/articles/?page=1&category=...
    retrieve: GET /api/articles/{id}/
    """
    
    queryset = Article.objects.filter(
        status='published',
        publish_date__lte=timezone.now()
    ).select_related('category')
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured', 'author']
    search_fields = ['title', 'excerpt', 'content', 'tags']
    ordering_fields = ['publish_date', 'views_count', 'likes_count', 'created_at']
    ordering = ['-publish_date']
    lookup_field = 'id'
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return ArticleDetailSerializer
        return ArticleListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured articles."""
        featured_articles = self.queryset.filter(featured=True)[:5]
        serializer = self.get_serializer(featured_articles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Get most popular articles (by views)."""
        popular_articles = self.queryset.order_by('-views_count')[:10]
        serializer = self.get_serializer(popular_articles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trending(self, request):
        """Get trending articles (by likes in last 30 days)."""
        from datetime import timedelta
        thirty_days_ago = timezone.now() - timedelta(days=30)
        
        trending_articles = self.queryset.filter(
            publish_date__gte=thirty_days_ago
        ).order_by('-likes_count', '-views_count')[:10]
        
        serializer = self.get_serializer(trending_articles, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def like(self, request, id=None):
        """
        Like an article.
        
        POST /api/articles/{id}/like/
        """
        article = self.get_object()
        
        # Get IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')
        
        # Check if already liked
        already_liked = ArticleLike.objects.filter(
            article=article,
            ip_address=ip_address
        ).exists()
        
        if already_liked:
            return Response(
                {
                    'success': False,
                    'message': 'You have already liked this article',
                    'likes_count': article.likes_count
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create like
        ArticleLike.objects.create(
            article=article,
            ip_address=ip_address
        )
        article.increment_likes()
        
        return Response(
            {
                'success': True,
                'message': 'Article liked successfully',
                'likes_count': article.likes_count
            },
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['post'])
    def view(self, request, id=None):
        """
        Track article view.
        
        POST /api/articles/{id}/view/
        """
        article = self.get_object()
        
        # Get IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')
        
        # Get user agent
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Create view record
        ArticleView.objects.create(
            article=article,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Increment view count
        article.increment_views()
        
        return Response(
            {
                'success': True,
                'message': 'View recorded',
                'views_count': article.views_count
            },
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """
        Get articles by category slug.
        
        GET /api/articles/by-category/?slug=automotive
        """
        category_slug = request.query_params.get('slug')
        
        if not category_slug:
            return Response(
                {'error': 'Category slug is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            category = Category.objects.get(slug=category_slug, is_active=True)
            articles = self.queryset.filter(category=category)
            
            # Paginate
            page = self.paginate_queryset(articles)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            serializer = self.get_serializer(articles, many=True)
            return Response(serializer.data)
            
        except Category.DoesNotExist:
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND
            )
