
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookViewSet, GenreViewSet, PopularBooksView

router = DefaultRouter()

router.register('list', BookViewSet)
router.register('genre', GenreViewSet)
router.register('popular', PopularBooksView, basename='popular-books')
urlpatterns =[
    path('', include(router.urls))
]
