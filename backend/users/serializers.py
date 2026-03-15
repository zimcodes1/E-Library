from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import Category
import cloudinary.uploader
import os

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class UserSerializer(serializers.ModelSerializer):
    interests = CategorySerializer(many=True, read_only=True)
    interest_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Category.objects.all(), 
        write_only=True, 
        required=False
    )
    avatar_url = serializers.URLField(source='avatar', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar_url', 'bio', 'reading_hours', 'books_read', 'interests', 'interest_ids', 'recent_books', 'is_staff']
        read_only_fields = ['id', 'reading_hours', 'books_read', 'recent_books', 'is_staff']

    def update(self, instance, validated_data):
        interest_ids = validated_data.pop('interest_ids', None)
        
        # Delete old avatar from Cloudinary if new one is provided
        if 'avatar' in validated_data and validated_data['avatar']:
            old_avatar = instance.avatar
            if old_avatar and 'cloudinary.com' in old_avatar:
                try:
                    # Extract public_id from Cloudinary URL
                    public_id = old_avatar.split('/')[-1].split('.')[0]
                    folder = '/'.join(old_avatar.split('/')[7:-1])  # Extract folder path
                    if folder:
                        public_id = f"{folder}/{public_id}"
                    cloudinary.uploader.destroy(public_id)
                except Exception as e:
                    pass  # Silently fail if deletion fails
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if interest_ids is not None:
            instance.interests.set(interest_ids)
        
        return instance


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    avatar_url = serializers.URLField(source='avatar', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'avatar_url']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
