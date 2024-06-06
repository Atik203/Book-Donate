
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from .views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('', home, name='home')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
