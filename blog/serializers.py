from rest_framework import serializers
from .models import Comment, Post

class PostSerializer(serializers.ModelSerializer):
    
    user_name = serializers.SerializerMethodField('get_username_from_author')
    likes = serializers.SerializerMethodField('get_number_of_likes')
    likes_usernames = serializers.SerializerMethodField('get_username_from_postLikes')
    nbr_of_comments = serializers.SerializerMethodField('get_number_of_comments')
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'user_name', 'content', 'status', 'published', 'likes', 'likes_usernames', 'nbr_of_comments')

    def get_username_from_author(self, post):
        user_name = post.author.user_name
        return user_name

    def get_number_of_likes(self, post):
        return post.number_of_likes()

    def get_number_of_comments(self, post):
        return post.comment_post.count()

    def get_username_from_postLikes(self, post):
        likes = post.likes.all()
        return [like.user_name for like in likes]   

class CommentSerializer(serializers.ModelSerializer):

    user_name = serializers.SerializerMethodField('get_username_from_author')
    likes = serializers.SerializerMethodField('get_number_of_likes')
    likes_usernames = serializers.SerializerMethodField('get_username_from_postLikes')

    class Meta:
        model = Comment
        fields = ('id', 'content', 'user_name', 'likes', 'likes_usernames')

    def get_username_from_author(self, post):
        user_name = post.author.user_name
        return user_name

    def get_number_of_likes(self, post):
        likes = post.likes.all()
        return post.number_of_likes()
    
    def get_username_from_postLikes(self, post):
        likes = post.likes.all()
        return [like.user_name for like in likes]