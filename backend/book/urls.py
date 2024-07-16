
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (AddBookView, AuthorListAPIView, BookViewSet,
                    ClaimBookAPIView, GenreViewSet, PopularBooksView,
                    UserClaimedBooksView, UserDonatedBooksView)

router = DefaultRouter()

router.register('list', BookViewSet)
router.register('genre', GenreViewSet)
router.register('popular', PopularBooksView, basename='popular-books')
urlpatterns =[
    path('', include(router.urls)),
    path('authors/', AuthorListAPIView.as_view(), name='author-list'),
    path('claimed-book/', ClaimBookAPIView.as_view(), name='claimed-book'),
    path('user-claimed-book/<int:id>/', UserClaimedBooksView.as_view(), name='user-claimed-books'),
    path('user-donated-book/<int:id>/', UserDonatedBooksView.as_view(), name='user-donated-books'),
    path('add-book/',AddBookView.as_view(),name="add-book"),
]
