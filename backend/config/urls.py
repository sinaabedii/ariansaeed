"""
URL configuration for Arian Saeed Industrial Group backend project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # API Endpoints
    path('api/contact/', include('apps.contact.urls')),
    path('api/careers/', include('apps.careers.urls')),
    path('api/articles/', include('apps.articles.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin Site Customization
admin.site.site_header = "Arian Saeed Industrial Group"
admin.site.site_title = "Arian Saeed Admin"
admin.site.index_title = "Administration Panel"
