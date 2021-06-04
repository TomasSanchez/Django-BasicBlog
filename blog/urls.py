from .views import CommentDetail, CommentList, PostDetail, PostList, PostUserList, PostLike
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('', PostList.as_view(), name='blog_list'),
    path('<int:pk>',PostDetail.as_view(), name='post_detail'),                          #pk = primary key of a post
    path('<int:pk>/comment', CommentList.as_view(), name='comment_list'),               #pk = primary key of a comment, all comments of a post
    path('<int:sk>/comment/<int:pk>', CommentDetail.as_view(), name='comment_list'),    #sk = secondary key of a post, pk of a comment of said post, gets a single comment currently sk not used
    path('<int:pk>/post_like/<str:action>/', PostLike.as_view(), name='post_like'),          #pk of a post, sk of a user to add like to said post from pk user
    path('profile/<int:pk>', PostUserList.as_view(), name='post_by_user'),              #pk of a user, returns all post of pk user
]
