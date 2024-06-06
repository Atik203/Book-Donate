
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookViewSet, GenreViewSet

router = DefaultRouter()

router.register('list', BookViewSet)
router.register('genre', GenreViewSet)

urlpatterns =[
    path('', include(router.urls))
]
