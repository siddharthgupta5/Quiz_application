from django.urls import path
from .views import RegisterView, LoginView, get_user_details

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("user/", get_user_details, name="user-details"),
]
