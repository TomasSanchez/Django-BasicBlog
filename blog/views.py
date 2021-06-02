from rest_framework import generics, status
from rest_framework.response import Response
from blog.models import Comment, Post
from .serializers import CommentSerializer, PostSerializer

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    # print(self.request.pk)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentList(generics.ListCreateAPIView):
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Comment.objects.filter(post=pk)
        return queryset

    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        post = Post.objects.get(id=pk)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(post=post)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CommentDetail(generics.RetrieveDestroyAPIView):
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Comment.objects.filter(post=pk)
        return queryset

    serializer_class = CommentSerializer


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