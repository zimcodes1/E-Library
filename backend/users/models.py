from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    interests = models.ManyToManyField('api.Category', related_name='interested_users', blank=True)
    reading_hours = models.IntegerField(default=0)
    books_read = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_total_books_read(self):
        return self.books_read

    def add_interests(self, categories):
        self.interests.add(*categories)

    def get_user_stats(self):
        return {
            'books_read': self.books_read,
            'reading_hours': self.reading_hours,
        }

    def __str__(self):
        return self.username
