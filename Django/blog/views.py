from django.http.response import JsonResponse
from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from .models import Comment, Post
from .serializers import CommentSerializer, PostSerializer


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to post owner'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user 


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

# get/delete/update single post by id
class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    # Check/test permission
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# retrieving all comments related to a single post(pk) 
class CommentList(generics.ListAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Comment.objects.filter(post=pk)
        return queryset

class CommentCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

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


# Returns all post based on user id, used for viewing posts on user profile
class PostUserList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Post.objects.filter(author=pk)
        return queryset


class PostLike(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
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
            response = JsonResponse({"Info": "Success - Removed like"})
        else:
            print('user hasnt liked')    
            instance.likes.add(user.id)
            print('you have been added to likes')
            response = JsonResponse({"Info": "Success - Added Like"})
        return response



class CommentLike(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

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
        serializer = self.get_serializer(instance, partial=partial)
 
        if getattr(instance, '_prefetched_objects_cache', None):            
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)


class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])


class SearchView(generics.ListAPIView):
    filter_backends = (DynamicSearchFilter,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer