from django.db import models
from users.models import User
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

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
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_author')
    likes = models.ManyToManyField(User, related_name='post_likes', blank=True)
    status = models.CharField(max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

    #if likes is defined inside Post
    def number_of_likes(self):
        return self.likes.count()    

class Comment(models.Model):
    
    content = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, related_name='comment_likes', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment_post')
    
    class Meta:
        ordering = ('-published',)

    def number_of_likes(self):
        return self.likes.count()
