from django.urls import path
from .views import CommentCreate, CommentDetail, CommentLike, CommentList, PostCreate, PostDetail, PostList, PostUserList, PostLike, SearchView

app_name = 'blog'

urlpatterns = [
    path('', PostList.as_view(), name='post_list'),
    path('create', PostCreate.as_view(), name='post_create'),
    path('<int:pk>',PostDetail.as_view(), name='post_detail'),                              #pk = primary key of a post
    
    # REMOVE TEST
    path('search', SearchView.as_view(), name='search'),
    
    path('<int:pk>/comments', CommentList.as_view(), name='comment_list'),                   #pk = primary key of a post, all comments of a post
    path('<int:pk>/comment/create', CommentCreate.as_view(), name='comment_create'),        #pk = primary key of a post, create comment on post
    path('<int:pk>/comment/detail', CommentDetail.as_view(), name='comment_detail'),        #sk = secondary key of a post, pk of a comment of said post, gets a single comment currently sk not used

    path('<int:pk>/post_like', PostLike.as_view(), name='post_like'),                       #pk of a post, add like to said post from logged user
    path('<int:pk>/comment_like', CommentLike.as_view(), name='comment_like'),              #pk of a comment, add like to said comment from logged user
    
    path('user-posts/<int:pk>', PostUserList.as_view(), name='posts_by_user'),              #pk of a user, returns all post of pk user

]
