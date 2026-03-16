from django.db import models
from django.utils.text import slugify
from django.conf import settings
import os
from datetime import datetime


def book_cover_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    timestamp = datetime.now().strftime('%d%m%y%H%M%S')
    new_filename = f'cover_{timestamp}.{ext}'
    return os.path.join('book_covers/', new_filename)


def book_file_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    timestamp = datetime.now().strftime('%d%m%y%H%M%S')
    new_filename = f'book_{timestamp}.{ext}'
    return os.path.join('books/', new_filename)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_book_count(self):
        return self.book_set.count()

    def __str__(self):
        return self.name


class Book(models.Model):
    FILE_TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('url', 'URL'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    cover_image = models.URLField(max_length=500, blank=True, null=True)
    file = models.URLField(max_length=500, blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)
    publication_year = models.IntegerField()
    language = models.CharField(max_length=50, default='English')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='uploaded_books')
    upload_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default='pdf')
    pages = models.IntegerField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    view_count = models.IntegerField(default=0)
    download_count = models.IntegerField(default=0)
    average_rating = models.FloatField(default=0.0)
    total_reviews = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-upload_date']

    def calculate_average_rating(self):
        reviews = self.review_set.all()
        if reviews.exists():
            total = sum(review.rating for review in reviews)
            self.average_rating = total / reviews.count()
            self.total_reviews = reviews.count()
            self.save()

    def increment_views(self):
        self.view_count += 1
        self.save(update_fields=['view_count'])

    def increment_downloads(self):
        self.download_count += 1
        self.save(update_fields=['download_count'])

    def __str__(self):
        return self.title


class Review(models.Model):
    RATING_CHOICES = [(i, i) for i in range(1, 6)]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    helpful_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ['user', 'book']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} reviewed {self.book.title}"


class Shelve(models.Model):
    SHELF_TYPE_CHOICES = [
        ('all', 'All Books'),
        ('favorite', 'Favorites'),
        ('bookmark', 'Bookmarks'),
        ('downloaded', 'Downloaded'),
    ]

    READING_STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('reading', 'Reading'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    shelf_type = models.CharField(max_length=20, choices=SHELF_TYPE_CHOICES)
    added_date = models.DateTimeField(auto_now_add=True)
    reading_status = models.CharField(max_length=20, choices=READING_STATUS_CHOICES, default='not_started')

    class Meta:
        unique_together = ['user', 'book', 'shelf_type']
        ordering = ['-added_date']

    def __str__(self):
        return f"{self.user.username}'s {self.book.title} in {self.shelf_type}"


class ReadingProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    current_page = models.IntegerField(default=0)
    total_pages = models.IntegerField()
    reading_time = models.IntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    last_read_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'book']

    def get_progress_percentage(self):
        if self.total_pages > 0:
            return (self.current_page / self.total_pages) * 100
        return 0

    def mark_as_completed(self):
        from django.utils import timezone
        self.completed_at = timezone.now()
        self.current_page = self.total_pages
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.get_progress_percentage():.1f}%)"


class BookDownload(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    download_date = models.DateTimeField(auto_now_add=True)
    download_format = models.CharField(max_length=10, default='pdf')

    class Meta:
        ordering = ['-download_date']

    def __str__(self):
        return f"{self.user.username} downloaded {self.book.title}"


class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.text[:50] + '...' if len(self.text) > 50 else self.text

    @staticmethod
    def get_today_quote():
        import random
        active_quotes = Quote.objects.filter(is_active=True)
        if active_quotes.exists():
            return random.choice(active_quotes)
        return None


class AdminActivity(models.Model):
    ACTIVITY_TYPES = [
        ('upload', 'Book Upload'),
        ('download', 'Book Download'),
        ('review', 'Review Posted'),
        ('register', 'User Registration'),
        ('book_approved', 'Book Approved'),
        ('book_rejected', 'Book Rejected'),
        ('user_deleted', 'User Deleted'),
        ('book_deleted', 'Book Deleted'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='admin_activities')
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True, blank=True)
    target_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='admin_activity_targets')
    description = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} - {self.timestamp}"


class BookApprovalStatus(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name='approval_status')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_books')
    review_date = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Book Approval Statuses'

    def __str__(self):
        return f"{self.book.title} - {self.status}"


class Feedback(models.Model):
    FEEDBACK_TYPE_CHOICES = [
        ('bug', 'Bug Report'),
        ('plagiarism', 'Plagiarism Report'),
        ('inappropriate', 'Inappropriate Content'),
        ('feature_request', 'Feature Request'),
        ('improvement', 'Improvement Suggestion'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True, blank=True, related_name='feedbacks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.CharField(max_length=10, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    admin_response = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.feedback_type} - {self.title}"
