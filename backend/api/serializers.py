from rest_framework import serializers
from .models import Category, Book, Review, Shelve, ReadingProgress, BookDownload, Quote, AdminActivity, BookApprovalStatus
from django.contrib.auth import get_user_model
import cloudinary.uploader

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    book_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'book_count']

    def get_book_count(self, obj):
        return obj.get_book_count()


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']


class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    uploaded_by = UserBasicSerializer(read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'category', 
                  'cover_image', 'file', 'file_url', 'publication_year', 'language', 
                  'uploaded_by', 'upload_date', 'updated_at', 'file_type', 'pages', 
                  'is_published', 'view_count', 'download_count', 'average_rating', 
                  'total_reviews', 'is_featured']
        read_only_fields = ['uploaded_by', 'upload_date', 'updated_at', 'view_count', 
                            'download_count', 'average_rating', 'total_reviews']


class BookCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'category', 'cover_image', 
                  'file', 'file_url', 'publication_year', 'language', 'file_type', 'pages']

    def validate(self, data):
        file_type = data.get('file_type', 'pdf')
        
        if file_type == 'pdf':
            if not data.get('file') and not data.get('file_url'):
                raise serializers.ValidationError("Either PDF file or file URL is required when file_type is 'pdf'")
        
        if file_type == 'url' and not data.get('file_url'):
            raise serializers.ValidationError("URL is required when file_type is 'url'")
        
        return data
    
    def update(self, instance, validated_data):
        # Delete old cover from Cloudinary if new one is provided
        if 'cover_image' in validated_data and validated_data['cover_image']:
            old_cover = instance.cover_image
            if old_cover and 'cloudinary.com' in old_cover:
                try:
                    public_id = old_cover.split('/')[-1].split('.')[0]
                    folder = '/'.join(old_cover.split('/')[7:-1])
                    if folder:
                        public_id = f"{folder}/{public_id}"
                    cloudinary.uploader.destroy(public_id)
                except Exception:
                    pass
        
        # Delete old file from Cloudinary if new one is provided
        if 'file_url' in validated_data and validated_data['file_url']:
            old_file = instance.file_url or instance.file
            if old_file and 'cloudinary.com' in str(old_file):
                try:
                    public_id = str(old_file).split('/')[-1].split('.')[0]
                    folder = '/'.join(str(old_file).split('/')[7:-1])
                    if folder:
                        public_id = f"{folder}/{public_id}"
                    cloudinary.uploader.destroy(public_id, resource_type='raw')
                except Exception:
                    pass
        
        return super().update(instance, validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'title', 'content', 
                  'created_at', 'updated_at', 'helpful_count']
        read_only_fields = ['user', 'created_at', 'updated_at']


class ShelveSerializer(serializers.ModelSerializer):
    book_details = BookSerializer(source='book', read_only=True)

    class Meta:
        model = Shelve
        fields = ['id', 'user', 'book', 'book_details', 'shelf_type', 'added_date', 'reading_status']
        read_only_fields = ['user', 'added_date']


class ReadingProgressSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = ReadingProgress
        fields = ['id', 'user', 'book', 'current_page', 'total_pages', 'reading_time', 
                  'started_at', 'last_read_at', 'completed_at', 'progress_percentage']
        read_only_fields = ['user', 'started_at', 'last_read_at']

    def get_progress_percentage(self, obj):
        return obj.get_progress_percentage()


class BookDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookDownload
        fields = ['id', 'book', 'user', 'download_date', 'download_format']
        read_only_fields = ['user', 'download_date']


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ['id', 'text', 'author', 'category', 'created_at', 'is_active']


class AdminActivitySerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    target_username = serializers.CharField(source='target_user.username', read_only=True)

    class Meta:
        model = AdminActivity
        fields = ['id', 'user', 'activity_type', 'book', 'book_title', 'target_user', 'target_username', 'description', 'timestamp']
        read_only_fields = ['user', 'timestamp']


class BookApprovalStatusSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    reviewed_by_username = serializers.CharField(source='reviewed_by.username', read_only=True)

    class Meta:
        model = BookApprovalStatus
        fields = ['id', 'book', 'book_title', 'status', 'reviewed_by', 'reviewed_by_username', 'review_date', 'rejection_reason', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
