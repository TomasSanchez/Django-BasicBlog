from .views import LoggedInUserDetail, UserDetail, UserList, UserCreate
from django.urls import path
from django.urls.conf import include

app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='user_list'),
    path('create', UserCreate.as_view(), name='user_create'),
    path('<int:pk>',UserDetail.as_view(), name='user_detail'),          # RetrieveUpdateDestroy a user
    path('profile',LoggedInUserDetail.as_view(), name='user_detail'),   # Returns detail information of the current authenticated user
]