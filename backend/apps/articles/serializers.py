"""
Serializers for Articles app.
"""

from rest_framework import serializers
from .models import Article, Category, ArticleLike, ArticleView


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for categories."""
    
    articles_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'articles_count']
    
    def get_articles_count(self, obj):
        """Get count of published articles in this category."""
        return obj.articles.filter(status='published').count()


class ArticleListSerializer(serializers.ModelSerializer):
    """Serializer for article listing."""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'slug',
            'excerpt',
            'category',
            'category_name',
            'author',
            'publish_date',
            'image_url',
            'views_count',
            'likes_count',
            'read_time',
            'featured'
        ]
    
    def get_image_url(self, obj):
        """Get full URL for image."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ArticleDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for article."""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    image_url = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()
    related_articles = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'slug',
            'excerpt',
            'content',
            'category',
            'category_name',
            'category_slug',
            'author',
            'publish_date',
            'image_url',
            'views_count',
            'likes_count',
            'read_time',
            'featured',
            'tags_list',
            'related_articles',
            'created_at',
            'updated_at'
        ]
    
    def get_image_url(self, obj):
        """Get full URL for image."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_tags_list(self, obj):
        """Get tags as list."""
        return obj.get_tags_list()
    
    def get_related_articles(self, obj):
        """Get related articles from the same category."""
        related = Article.objects.filter(
            category=obj.category,
            status='published'
        ).exclude(id=obj.id)[:3]
        
        return ArticleListSerializer(
            related,
            many=True,
            context=self.context
        ).data


class ArticleLikeSerializer(serializers.Serializer):
    """Serializer for article like action."""
    
    article_id = serializers.IntegerField()
    
    def validate_article_id(self, value):
        """Validate article exists and is published."""
        try:
            article = Article.objects.get(id=value, status='published')
            return value
        except Article.DoesNotExist:
            raise serializers.ValidationError("Article not found or not published.")
    
    def create(self, validated_data):
        """Create a like record."""
        article_id = validated_data['article_id']
        ip_address = validated_data.get('ip_address')
        
        article = Article.objects.get(id=article_id)
        
        # Check if already liked
        like, created = ArticleLike.objects.get_or_create(
            article=article,
            ip_address=ip_address
        )
        
        if created:
            article.increment_likes()
            return {'liked': True, 'likes_count': article.likes_count}
        else:
            return {'liked': False, 'message': 'Already liked', 'likes_count': article.likes_count}


class ArticleViewSerializer(serializers.Serializer):
    """Serializer for article view action."""
    
    article_id = serializers.IntegerField()
    
    def validate_article_id(self, value):
        """Validate article exists and is published."""
        try:
            article = Article.objects.get(id=value, status='published')
            return value
        except Article.DoesNotExist:
            raise serializers.ValidationError("Article not found or not published.")
    
    def create(self, validated_data):
        """Create a view record."""
        article_id = validated_data['article_id']
        ip_address = validated_data.get('ip_address')
        user_agent = validated_data.get('user_agent', '')
        
        article = Article.objects.get(id=article_id)
        
        # Create view record
        ArticleView.objects.create(
            article=article,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Increment article view count
        article.increment_views()
        
        return {'viewed': True, 'views_count': article.views_count}
