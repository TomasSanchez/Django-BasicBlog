from .views import CommentDetail, CommentList, PostDetail, PostList, PostUserList, PostLike
from django.urls import path

app_name = 'blog'

urlpatterns = [
    path('', PostList.as_view(), name='blog_list'),
    path('<int:pk>',PostDetail.as_view(), name='post_detail'),                              #pk = primary key of a post
    path('<int:pk>/comment', CommentList.as_view(), name='comment_list'),                   #pk = primary key of a post, all comments of a post
    path('<int:sk>/comment/<int:pk>', CommentDetail.as_view(), name='comment_list'),        #sk = secondary key of a post, pk of a comment of said post, gets a single comment currently sk not used
    path('<int:pk>/post_like/', PostLike.as_view(), name='post_like'),                      #pk of a post, add like to said post from logged user
    path('user-posts/<int:pk>', PostUserList.as_view(), name='posts_by_user'),              #pk of a user, returns all post of pk user
]
