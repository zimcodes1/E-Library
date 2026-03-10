from django.contrib import admin
from .models import Category, Book, Review, Shelve, ReadingProgress, BookDownload, Quote, AdminActivity, BookApprovalStatus


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'uploaded_by', 'publication_year', 'average_rating', 'is_published']
    list_filter = ['category', 'is_published', 'is_featured', 'language']
    search_fields = ['title', 'author', 'description']
    readonly_fields = ['view_count', 'download_count', 'average_rating', 'total_reviews']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['user__username', 'book__title', 'content']


@admin.register(Shelve)
class ShelveAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'shelf_type', 'reading_status', 'added_date']
    list_filter = ['shelf_type', 'reading_status']


@admin.register(ReadingProgress)
class ReadingProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'current_page', 'total_pages', 'last_read_at']
    readonly_fields = ['started_at']


@admin.register(BookDownload)
class BookDownloadAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'download_date', 'download_format']
    list_filter = ['download_format', 'download_date']


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['text', 'author', 'is_active', 'created_at']
    list_filter = ['is_active', 'category']


@admin.register(AdminActivity)
class AdminActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'book', 'timestamp']
    list_filter = ['activity_type', 'timestamp']
    readonly_fields = ['user', 'timestamp']


@admin.register(BookApprovalStatus)
class BookApprovalStatusAdmin(admin.ModelAdmin):
    list_display = ['book', 'status', 'reviewed_by', 'review_date']
    list_filter = ['status', 'review_date']
    readonly_fields = ['created_at', 'updated_at']
