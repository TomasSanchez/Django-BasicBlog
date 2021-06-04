from rest_framework import serializers
from blog.models import Comment, Likes, Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'content', 'status')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        