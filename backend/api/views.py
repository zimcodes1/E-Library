from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Category, Book, Review, Shelve, ReadingProgress, BookDownload, Quote
from .serializers import (
    CategorySerializer, BookSerializer, BookCreateSerializer, ReviewSerializer,
    ShelveSerializer, ReadingProgressSerializer, BookDownloadSerializer, QuoteSerializer
)


@api_view(['GET'])
@permission_classes([AllowAny])
def categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def books(request):
    if request.method == 'GET':
        books = Book.objects.filter(is_published=True)
        
        # Filters
        category = request.query_params.get('category')
        search = request.query_params.get('search')
        featured = request.query_params.get('featured')
        
        if category:
            books = books.filter(category__slug=category)
        if search:
            books = books.filter(title__icontains=search) | books.filter(author__icontains=search)
        if featured:
            books = books.filter(is_featured=True)
        
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = BookCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Serializer errors:", serializer.errors)  # Debug line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    
    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        if not request.user.is_authenticated or request.user != book.uploaded_by:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = BookCreateSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if not request.user.is_authenticated or request.user != book.uploaded_by:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_download(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.increment_downloads()
    
    BookDownload.objects.create(
        book=book,
        user=request.user,
        download_format=request.data.get('format', 'pdf')
    )
    
    return Response({'message': 'Download recorded'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_view(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.increment_views()
    return Response({'message': 'View recorded'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def book_reviews(request, pk):
    book = get_object_or_404(Book, pk=pk)
    
    if request.method == 'GET':
        reviews = Review.objects.filter(book=book)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, book=book)
            book.calculate_average_rating()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_shelves(request):
    if request.method == 'GET':
        shelf_type = request.query_params.get('type', 'all')
        shelves = Shelve.objects.filter(user=request.user)
        
        if shelf_type != 'all':
            shelves = shelves.filter(shelf_type=shelf_type)
        
        serializer = ShelveSerializer(shelves, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ShelveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_shelf(request, pk):
    shelve = get_object_or_404(Shelve, pk=pk, user=request.user)
    shelve.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def reading_progress(request, pk):
    book = get_object_or_404(Book, pk=pk)
    
    if request.method == 'GET':
        progress = ReadingProgress.objects.filter(user=request.user, book=book).first()
        if progress:
            serializer = ReadingProgressSerializer(progress)
            return Response(serializer.data)
        return Response({'message': 'No progress found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        serializer = ReadingProgressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, book=book)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        progress = get_object_or_404(ReadingProgress, user=request.user, book=book)
        serializer = ReadingProgressSerializer(progress, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def today_quote(request):
    quotes = list(Quote.objects.filter(is_active=True))
    if quotes:
        import random
        selected_quotes = random.sample(quotes, min(5, len(quotes)))
        serializer = QuoteSerializer(selected_quotes, many=True)
        return Response(serializer.data)
    return Response({'message': 'No quote available'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_uploaded_books(request):
    books = Book.objects.filter(uploaded_by=request.user)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def new_arrivals(request):
    user = request.user
    user_interests = user.interests.all()
    
    if user_interests.exists():
        books = Book.objects.filter(
            category__in=user_interests,
            is_published=True
        ).order_by('-upload_date')[:10]
    else:
        books = Book.objects.filter(is_published=True).order_by('-upload_date')[:10]
    
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)
