from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import GiftViewSet

router = DefaultRouter()

router.register('list', GiftViewSet, basename='gift')

urlpatterns = [
    path('', include(router.urls))
]