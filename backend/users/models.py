from django.db import models
from django.contrib.auth.models import AbstractUser
import os
from datetime import datetime


def avatar_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    timestamp = datetime.now().strftime('%d%m%y%H%M%S')
    new_filename = f'libronet_ava_{timestamp}.{ext}'
    return os.path.join('avatars/', new_filename)


class User(AbstractUser):
    avatar = models.ImageField(upload_to=avatar_upload_path, null=True, blank=True)
    bio = models.TextField(blank=True)
    interests = models.ManyToManyField('api.Category', related_name='interested_users', blank=True)
    reading_hours = models.IntegerField(default=0)
    books_read = models.IntegerField(default=0)
    recent_books = models.JSONField(default=list, blank=True)
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

    def add_recent_book(self, book_id):
        is_new_book = book_id not in self.recent_books
        if book_id in self.recent_books:
            self.recent_books.remove(book_id)
        self.recent_books.insert(0, book_id)
        self.recent_books = self.recent_books[:10]
        if is_new_book:
            self.books_read += 1
        self.save(update_fields=['recent_books', 'books_read'])

    def __str__(self):
        return self.username
