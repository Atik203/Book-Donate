from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PostReviewViewSet, ReviewViewSet

router = DefaultRouter()
router.register('list', ReviewViewSet, basename='review-list')
router.register('review-post', PostReviewViewSet, basename='review-post')

urlpatterns = [
    path('', include(router.urls))
]