from operator import add
from users.models import User
from django.db.models import query
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, BasePermission, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, SAFE_METHODS
from blog.models import Comment, Post
from .serializers import CommentSerializer, PostSerializer

class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to post owner'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user 

# Returning all post, or creating a post
class PostList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)


# returning a single post, updating a post or deleting it
class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# retrieving all comments related to a single post(pk) or creates a comment on post(pk)
class CommentList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = CommentSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Comment.objects.filter(post=pk)
        return queryset

    # def create() calls perform_create() to save the comment, we can edit 'create()' like commented below or edit perform_create like so, both work the same
    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        user = self.request.user
        post = Post.objects.get(id=pk)
        serializer.save(post=post, author=user)   


# get/delete/update single comment by id
class CommentDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


# Returns all post based on user id
class PostUserList(generics.ListAPIView):
    # permission_classes = [DjangoModelPermissions]
    permission_classes = [AllowAny]
    serializer_class = PostSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Post.objects.filter(author=pk)
        return queryset


class PostLike(generics.RetrieveUpdateAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        user = self.request.user
        if user in instance.likes.all():
            print('user already liked!')
            instance.likes.remove(user.id)
            print('you have been removed from likes')
        else:
            print('user hasnt liked')    
            instance.likes.add(user.id)
            print('you have been added to likes')
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