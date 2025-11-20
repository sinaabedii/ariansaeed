"""
Admin configuration for Articles app.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from .models import Category, Article, ArticleLike, ArticleView


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin interface for Categories."""
    
    list_display = ['id', 'name', 'slug', 'order', 'articles_count', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    
    def articles_count(self, obj):
        """Count of articles in this category."""
        return obj.articles.count()
    articles_count.short_description = 'Articles'


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Admin interface for Articles."""
    
    list_display = [
        'id',
        'title_preview',
        'category',
        'author',
        'status_badge',
        'featured_badge',
        'views_count',
        'likes_count',
        'publish_date',
        'image_preview'
    ]
    list_filter = ['status', 'featured', 'category', 'publish_date', 'created_at']
    search_fields = ['title', 'excerpt', 'content', 'author', 'tags']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views_count', 'likes_count', 'read_time', 'created_at', 'updated_at', 'image_preview']
    date_hierarchy = 'publish_date'
    autocomplete_fields = ['category']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category')
        }),
        ('Content', {
            'fields': ('excerpt', 'content')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Categorization', {
            'fields': ('tags',)
        }),
        ('Publishing', {
            'fields': ('status', 'featured', 'publish_date')
        }),
        ('SEO', {
            'fields': ('meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('views_count', 'likes_count', 'read_time', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = [
        'mark_as_published',
        'mark_as_draft',
        'mark_as_featured',
        'mark_as_archived'
    ]
    
    def title_preview(self, obj):
        """Show preview of title."""
        if len(obj.title) > 60:
            return f"{obj.title[:60]}..."
        return obj.title
    title_preview.short_description = 'Title'
    
    def status_badge(self, obj):
        """Display status as colored badge."""
        colors = {
            'draft': '#6c757d',
            'published': '#28a745',
            'archived': '#ffc107',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def featured_badge(self, obj):
        """Display featured status."""
        if obj.featured:
            return format_html('<span style="color: #ffc107; font-size: 18px;">⭐</span>')
        return '-'
    featured_badge.short_description = 'Featured'
    
    def image_preview(self, obj):
        """Display image preview."""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 150px; border-radius: 8px;"/>',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Image Preview'
    
    def mark_as_published(self, request, queryset):
        """Mark selected articles as published."""
        from django.utils import timezone
        updated = queryset.update(status='published', publish_date=timezone.now())
        self.message_user(request, f'{updated} article(s) published.')
    mark_as_published.short_description = 'Publish Selected Articles'
    
    def mark_as_draft(self, request, queryset):
        """Mark selected articles as draft."""
        updated = queryset.update(status='draft')
        self.message_user(request, f'{updated} article(s) marked as draft.')
    mark_as_draft.short_description = 'Mark as Draft'
    
    def mark_as_featured(self, request, queryset):
        """Mark selected articles as featured."""
        updated = queryset.update(featured=True)
        self.message_user(request, f'{updated} article(s) marked as featured.')
    mark_as_featured.short_description = 'Mark as Featured'
    
    def mark_as_archived(self, request, queryset):
        """Mark selected articles as archived."""
        updated = queryset.update(status='archived')
        self.message_user(request, f'{updated} article(s) archived.')
    mark_as_archived.short_description = 'Archive Selected'
    
    def get_queryset(self, request):
        """Optimize queryset."""
        return super().get_queryset(request).select_related('category')


@admin.register(ArticleLike)
class ArticleLikeAdmin(admin.ModelAdmin):
    """Admin interface for Article Likes."""
    
    list_display = ['id', 'article', 'ip_address', 'created_at']
    list_filter = ['created_at']
    search_fields = ['article__title', 'ip_address']
    readonly_fields = ['article', 'ip_address', 'session_key', 'created_at']
    date_hierarchy = 'created_at'
    
    def has_add_permission(self, request):
        """Disable manual adding of likes."""
        return False


@admin.register(ArticleView)
class ArticleViewAdmin(admin.ModelAdmin):
    """Admin interface for Article Views."""
    
    list_display = ['id', 'article', 'ip_address', 'created_at']
    list_filter = ['created_at']
    search_fields = ['article__title', 'ip_address']
    readonly_fields = ['article', 'ip_address', 'user_agent', 'created_at']
    date_hierarchy = 'created_at'
    
    def has_add_permission(self, request):
        """Disable manual adding of views."""
        return False
