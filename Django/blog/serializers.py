from rest_framework import serializers
from .models import Comment, Post

class PostSerializer(serializers.ModelSerializer):
    
    author = serializers.SerializerMethodField()
    number_of_likes = serializers.SerializerMethodField()
    likes_usernames = serializers.SerializerMethodField()
    number_of_comments = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'content', 'status', 'published', 'number_of_likes', 'likes_usernames', 'number_of_comments')

    def get_author(self, post):
        user_name = post.author.user_name
        user_id = post.author.id
        return {'user_id':user_id, 'user_name': user_name}

    def get_number_of_likes(self, post):
        return post.number_of_likes()

    def get_number_of_comments(self, post):
        return post.comment_post.count()

    def get_likes_usernames(self, post):
        likes = post.likes.all()
        return [{"user_id":like.id,"user_name":like.user_name} for like in likes]   



class CommentSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField()
    number_of_likes = serializers.SerializerMethodField()
    likes_usernames = serializers.SerializerMethodField()
    post_id = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'number_of_likes', 'likes_usernames', 'post_id')


    def get_post_id(self, post):
        return post.post.id

    def get_author(self, post):
        user_name = post.author.user_name
        user_id = post.author.id
        return {'user_id':user_id, 'user_name': user_name}

    def get_number_of_likes(self, post):
        return post.number_of_likes()
    
    def get_likes_usernames(self, post):
        likes = post.likes.all()
        return [{"user_id":like.id,"user_name":like.user_name} for like in likes]   