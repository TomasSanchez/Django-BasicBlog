from operator import add
from users.models import User
from django.db.models import query
from rest_framework import generics, status
from rest_framework.response import Response
from blog.models import Comment, Likes, Post
from .serializers import CommentSerializer, LikesSerializer, PostSerializer


# Returning all post, or creating a post
class PostList(generics.ListCreateAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer


# returning a single post, updating a post or deleting it
class PostDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer


# retrieving all comments related to a single post(pk)
class CommentList(generics.ListCreateAPIView):

    serializer_class = CommentSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Comment.objects.filter(post=pk)
        return queryset

    # def create() calls perform_create() to save the comment, we can edit create like commented below or edit perform_create like so, both work the same
    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        post = Post.objects.get(id=pk)
        serializer.save(post=post)   


# get/delete/update single comment by id
class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


# Returns all post based on user id
class PostUserList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Post.objects.filter(author=pk)
        return queryset

class PostLike(generics.RetrieveUpdateAPIView):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        pk = self.kwargs['pk']
        # user = User.objects.get(id=pk)
        # print('user is:', user)
        user = self.request.user
        action = self.kwargs['action']
        if action == 'add':
            instance.likes.add(user)
        elif action == 'remove':
            instance.likes.remove(user)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""