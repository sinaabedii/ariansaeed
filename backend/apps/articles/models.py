"""
Articles app models for blog posts and news articles.
"""

from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator


def article_image_path(instance, filename):
    """Generate upload path for article images."""
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title)[:50]
    return f"articles/{instance.created_at.year}/{instance.created_at.month:02d}/{safe_slug}.{ext}"


class Category(models.Model):
    """Model for article categories."""
    
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='Category Name'
    )
    slug = models.SlugField(
        max_length=120,
        unique=True,
        verbose_name='Slug'
    )
    description = models.TextField(
        blank=True,
        verbose_name='Description'
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name='Display Order',
        help_text='Lower numbers appear first'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Active'
    )
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        """Auto-generate slug from name."""
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Article(models.Model):
    """Model for articles and blog posts."""
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    # Basic Information
    title = models.CharField(
        max_length=300,
        verbose_name='Title',
        db_index=True
    )
    slug = models.SlugField(
        max_length=350,
        unique=True,
        verbose_name='Slug'
    )
    excerpt = models.TextField(
        max_length=500,
        verbose_name='Excerpt',
        help_text='Short summary of the article'
    )
    content = models.TextField(
        verbose_name='Content',
        help_text='Full article content'
    )
    
    # Categorization
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='articles',
        verbose_name='Category'
    )
    tags = models.CharField(
        max_length=500,
        blank=True,
        verbose_name='Tags',
        help_text='Comma-separated tags'
    )
    
    # Media
    image = models.ImageField(
        upload_to=article_image_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])],
        verbose_name='Featured Image',
        help_text='Main image for the article'
    )
    
    # Author Information
    author = models.CharField(
        max_length=200,
        default='Editorial Team',
        verbose_name='Author Name'
    )
    
    # Publishing
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',
        db_index=True,
        verbose_name='Status'
    )
    featured = models.BooleanField(
        default=False,
        verbose_name='Featured',
        help_text='Display this article prominently'
    )
    publish_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Publish Date',
        db_index=True
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
    
    # Statistics
    views_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Views Count'
    )
    likes_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Likes Count'
    )
    read_time = models.PositiveIntegerField(
        default=5,
        verbose_name='Read Time (minutes)',
        help_text='Estimated reading time in minutes'
    )
    
    # SEO
    meta_description = models.TextField(
        max_length=160,
        blank=True,
        verbose_name='Meta Description',
        help_text='SEO meta description (max 160 chars)'
    )
    meta_keywords = models.CharField(
        max_length=500,
        blank=True,
        verbose_name='Meta Keywords',
        help_text='SEO keywords, comma-separated'
    )
    
    class Meta:
        ordering = ['-publish_date', '-created_at']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'
        indexes = [
            models.Index(fields=['-publish_date', 'status']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['-views_count']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        """Auto-generate slug from title."""
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Auto-calculate read time based on word count
        if self.content:
            word_count = len(self.content.split())
            self.read_time = max(1, word_count // 200)  # Assume 200 words per minute
        
        super().save(*args, **kwargs)
    
    def increment_views(self):
        """Increment view count."""
        self.views_count += 1
        self.save(update_fields=['views_count'])
    
    def increment_likes(self):
        """Increment likes count."""
        self.likes_count += 1
        self.save(update_fields=['likes_count'])
    
    def get_tags_list(self):
        """Get tags as list."""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',')]
        return []


class ArticleLike(models.Model):
    """Model to track article likes (prevent duplicate likes)."""
    
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='article_likes',
        verbose_name='Article'
    )
    ip_address = models.GenericIPAddressField(
        verbose_name='IP Address'
    )
    session_key = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Session Key'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Liked At'
    )
    
    class Meta:
        unique_together = ['article', 'ip_address']
        verbose_name = 'Article Like'
        verbose_name_plural = 'Article Likes'
        indexes = [
            models.Index(fields=['article', 'ip_address']),
        ]
    
    def __str__(self):
        return f"Like on {self.article.title} from {self.ip_address}"


class ArticleView(models.Model):
    """Model to track article views."""
    
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='article_views',
        verbose_name='Article'
    )
    ip_address = models.GenericIPAddressField(
        verbose_name='IP Address'
    )
    user_agent = models.TextField(
        blank=True,
        verbose_name='User Agent'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Viewed At',
        db_index=True
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Article View'
        verbose_name_plural = 'Article Views'
        indexes = [
            models.Index(fields=['article', '-created_at']),
        ]
    
    def __str__(self):
        return f"View on {self.article.title} at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
