from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf.urls.static import static
from django.conf import settings
from .views import index
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blog/', include('blog.urls', namespace='blog')),
    path('api/users/', include('users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # serving static files trough django    
    path('', TemplateView.as_view(template_name='index.html')),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('<int>', TemplateView.as_view(template_name='index.html')),
    path('profile/<int>', TemplateView.as_view(template_name='index.html')),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('signup', TemplateView.as_view(template_name='index.html'))
]

# static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS) + 

# if settings.DEBUG: 
#     urlpatterns += static(
#         settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
#     ),