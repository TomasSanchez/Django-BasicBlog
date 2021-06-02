from .views import CommentDetail, CommentList, PostDetail, PostList
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('', PostList.as_view(), name='blog_list'),
    path('<int:pk>',PostDetail.as_view(), name='post_detail'),
    path('<int:pk>/comment', CommentList.as_view(), name='comment_list'),
    path('<int:sk>/comment/<int:pk>', CommentDetail.as_view(), name='comment_list')

]
