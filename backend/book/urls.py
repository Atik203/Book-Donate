
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (AddBookView, AddGenreView, ApprovedBookView,
                    AuthorListAPIView, BookViewSet, ClaimBookAPIView,
                    DeleteBookView, GenreViewSet, PendingBooksView,
                    PopularBooksView, UpdateBookView, UserClaimedBooksView,
                    UserDonatedBooksView)

router = DefaultRouter()

router.register('list', BookViewSet)
router.register('genre', GenreViewSet)
router.register('popular', PopularBooksView, basename='popular-books')
router.register('pending', PendingBooksView, basename='pending-books')

urlpatterns =[
    path('', include(router.urls)),
    path('authors/', AuthorListAPIView.as_view(), name='author-list'),
    path('claimed-book/', ClaimBookAPIView.as_view(), name='claimed-book'),
    path('user-claimed-book/<int:id>/', UserClaimedBooksView.as_view(), name='user-claimed-books'),
    path('user-donated-book/<int:id>/', UserDonatedBooksView.as_view(), name='user-donated-books'),
    path('add-book/',AddBookView.as_view(),name="add-book"),
    path('add-genre/',AddGenreView.as_view(),name='add-genre'),
    path('update-book/',UpdateBookView.as_view(),name="update-book"),
    path('approve-book/',ApprovedBookView.as_view(),name='approve-book'),
    path('delete-book/',DeleteBookView.as_view(),name='delete-book'),
   
]
