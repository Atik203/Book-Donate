from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PostReviewAPIView, ReviewViewSet

router = DefaultRouter()
router.register('list', ReviewViewSet, basename='review-list')


urlpatterns = [
    path('', include(router.urls)),
    path('review-post/', PostReviewAPIView.as_view(), name='review-post')
]