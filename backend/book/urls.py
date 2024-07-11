
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (AuthorListAPIView, BookViewSet, ClaimBookAPIView,
                    GenreViewSet, PopularBooksView)

router = DefaultRouter()

router.register('list', BookViewSet)
router.register('genre', GenreViewSet)
router.register('popular', PopularBooksView, basename='popular-books')
urlpatterns =[
    path('', include(router.urls)),
    path('authors/', AuthorListAPIView.as_view(), name='author-list'),
    path('claimed-book/', ClaimBookAPIView.as_view(), name='claimed-book')
]
