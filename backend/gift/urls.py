from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (AddGiftView, BuyGiftView, DeleteGiftView,
                    GetSpecificUserGiftView, GiftViewSet)

router = DefaultRouter()

router.register('list', GiftViewSet, basename='gift')
router.register('user-gift', GetSpecificUserGiftView, basename='specific_user_gift')

urlpatterns = [
    path('', include(router.urls)),
    path('add/', AddGiftView.as_view(), name='add_gift'),
    path('delete/', DeleteGiftView.as_view(), name='delete_gift'),
    path('buy/', BuyGiftView.as_view(), name='buy_gift'),
]