from rest_framework import serializers
from .models import User, UserFollowing


class UserSerializer(serializers.ModelSerializer):

    liked_posts = serializers.SerializerMethodField('get_liked_posts')
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_name', 'start_date', 'about', 'liked_posts', 'password', "following", "followers",)
        extra_kwargs = {'password': {'write_only': True}}


    def get_liked_posts(self, user):
        return user.post_likes.all().values()

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "following_user_id", "created")


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "user_id", "created")