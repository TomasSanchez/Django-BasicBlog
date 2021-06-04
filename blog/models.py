from django.db import models
from users.models import User
from django.conf import settings
from django.utils import timezone

class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    content = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='post_author')
    status = models.CharField(max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

    #if likes is defined inside Post
    # def number_of_likes(self):
    #     return self.likes.count()    

class Comment(models.Model):
    
    content = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment_post')
    
    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title


class Likes(models.Model):
    user_liker = models.ForeignKey(User, on_delete=models.CASCADE)
    post_liked = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True)
    comment_liked = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True)

    def post_likes(self):
        return self.post_liked.count()

    def comment_likes(self):
        return self.comment_liked.count()

"""
likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='post_likes', blank=True)
"""