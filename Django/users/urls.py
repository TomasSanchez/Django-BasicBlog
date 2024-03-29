from django.urls import path
from .views import LoggedInUserDetail, SearchView, UserDetail, FollowingView, UserList, CreateUser, WhoAmI, get_csrf, login_view, logout_view

app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='user_list'),
    path('search', SearchView.as_view(), name='search'),
    path('get_csrf', get_csrf, name='get_csrf'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('create', CreateUser.as_view(), name='create'),
    path('me', WhoAmI.as_view(), name='check_current_user'),
    path('profile',LoggedInUserDetail.as_view(), name='user_detail'),   # Returns detail information of the current authenticated user
    path('<int:pk>',UserDetail.as_view(), name='user_detail'),          # RetrieveUpdateDestroy a user
    path('follow/<int:pk>', FollowingView.as_view(), name='follow_user'),
]