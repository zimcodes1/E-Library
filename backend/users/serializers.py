from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import Category

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
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'bio', 'reading_hours', 'books_read', 'interests', 'interest_ids']
        read_only_fields = ['id', 'reading_hours', 'books_read']

    def get_avatar(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def update(self, instance, validated_data):
        interest_ids = validated_data.pop('interest_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if interest_ids is not None:
            instance.interests.set(interest_ids)
        
        return instance


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'avatar']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
