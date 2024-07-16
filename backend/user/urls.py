from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter

from .views import (BookUserViewSet, EditProfileView, LoginViewSet,
                    LogOutViewSet, PasswordChangeViewSet, RegistrationView,
                    activate)

router = DefaultRouter()
router.register('list', BookUserViewSet) 



urlpatterns = [
    path('', include(router.urls)),
    path('register/', csrf_exempt(RegistrationView.as_view()), name = 'register'),
    path('active/<uidb64>/<token>/', activate,name='activate'),
    path('login/', LoginViewSet.as_view(), name = 'login'),
    path('logout/', LogOutViewSet.as_view(), name = 'logout'),
    path('change-password/', PasswordChangeViewSet.as_view(), name = 'change-password'),
    path('update-profile/', EditProfileView.as_view(), name = 'update-profile'),
]