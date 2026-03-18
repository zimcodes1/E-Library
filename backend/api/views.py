from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db import models
from django.http import StreamingHttpResponse
from .models import Category, Book, Review, Shelve, ReadingProgress, BookDownload, Quote, AdminActivity, BookApprovalStatus, Feedback
from .serializers import (
    CategorySerializer, BookSerializer, BookCreateSerializer, ReviewSerializer,
    ShelveSerializer, ReadingProgressSerializer, BookDownloadSerializer, QuoteSerializer,
    AdminActivitySerializer, BookApprovalStatusSerializer, FeedbackSerializer
)
import requests

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_readings(request):
    book_ids = request.user.recent_books
    books = Book.objects.filter(id__in=book_ids, is_published=True)
    books_dict = {book.id: book for book in books}
    ordered_books = [books_dict[book_id] for book_id in book_ids if book_id in books_dict]
    serializer = BookSerializer(ordered_books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def recent_books(request):
    books = Book.objects.filter(is_published=True).order_by('-upload_date')[:4]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_reviews_count(request):
    count = Review.objects.filter(user=request.user).count()
    return Response({'count': count}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def public_stats(request):
    total_books = Book.objects.filter(is_published=True).count()
    total_users = User.objects.filter(is_active=True).count()
    total_downloads = BookDownload.objects.count()
    avg_rating = Book.objects.filter(is_published=True, average_rating__gt=0).aggregate(
        avg=models.Avg('average_rating')
    )['avg'] or 0
    
    return Response({
        'total_books': total_books,
        'total_users': total_users,
        'total_downloads': total_downloads,
        'average_rating': round(avg_rating, 1) if avg_rating else 0,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard_stats(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    total_users = User.objects.count()
    total_books = Book.objects.count()
    total_downloads = BookDownload.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    pending_books = BookApprovalStatus.objects.filter(status='pending').count()
    
    return Response({
        'total_users': total_users,
        'total_books': total_books,
        'total_downloads': total_downloads,
        'active_users': active_users,
        'pending_books': pending_books,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_recent_activities(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    activities = AdminActivity.objects.all()[:20]
    serializer = AdminActivitySerializer(activities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_pending_books(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    pending = BookApprovalStatus.objects.filter(status='pending').select_related('book', 'book__uploaded_by')
    serializer = BookApprovalStatusSerializer(pending, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_all_books(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    books = Book.objects.all().select_related('category', 'uploaded_by')
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_all_users(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    users = User.objects.all()
    data = [{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_active': user.is_active,
        'joined_date': user.date_joined.strftime('%Y-%m-%d'),
        'books_uploaded': user.uploaded_books.count(),
        'books_downloaded': BookDownload.objects.filter(user=user).count(),
        'role': 'admin' if user.is_staff else 'user',
    } for user in users]
    return Response(data)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_user_detail(request, user_id):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    user = get_object_or_404(User, id=user_id)
    
    if request.method == 'PATCH':
        role = request.data.get('role')
        is_active = request.data.get('isActive')
        
        if role is not None:
            user.is_staff = (role == 'admin')
        if is_active is not None:
            user.is_active = is_active
        
        user.save()
        return Response({'status': 'User updated'}, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response({'status': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_book(request, book_id):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        approval = BookApprovalStatus.objects.get(book_id=book_id)
        approval.status = 'approved'
        approval.reviewed_by = request.user
        approval.review_date = timezone.now()
        approval.save()
        
        AdminActivity.objects.create(
            user=request.user,
            activity_type='book_approved',
            book_id=book_id,
            description=f'Approved book: {approval.book.title}'
        )
        
        return Response({'status': 'Book approved'}, status=status.HTTP_200_OK)
    except BookApprovalStatus.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_book(request, book_id):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        approval = BookApprovalStatus.objects.get(book_id=book_id)
        approval.status = 'rejected'
        approval.reviewed_by = request.user
        approval.review_date = timezone.now()
        approval.rejection_reason = request.data.get('reason', '')
        approval.save()
        
        AdminActivity.objects.create(
            user=request.user,
            activity_type='book_rejected',
            book_id=book_id,
            description=f'Rejected book: {approval.book.title}'
        )
        
        return Response({'status': 'Book rejected'}, status=status.HTTP_200_OK)
    except BookApprovalStatus.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def admin_delete_book(request, book_id):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return Response({'status': 'Book deleted'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def admin_toggle_book_visibility(request, book_id):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    book = get_object_or_404(Book, id=book_id)
    book.is_published = not book.is_published
    book.save()
    return Response({'status': 'Visibility toggled', 'is_published': book.is_published}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_feedbacks(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.filter(user=request.user)
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_all_feedbacks(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    feedbacks = Feedback.objects.all().select_related('user', 'book')
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard_stats_detailed(request):
    if not request.user.is_staff:
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    from datetime import timedelta
    
    # Current stats
    total_users = User.objects.count()
    total_books = Book.objects.count()
    total_downloads = BookDownload.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    
    # Last 7 days stats for trend calculation
    seven_days_ago = timezone.now() - timedelta(days=7)
    
    users_last_7_days = User.objects.filter(date_joined__gte=seven_days_ago).count()
    books_last_7_days = Book.objects.filter(upload_date__gte=seven_days_ago).count()
    downloads_last_7_days = BookDownload.objects.filter(download_date__gte=seven_days_ago).count()
    active_users_last_7_days = User.objects.filter(
        is_active=True,
        last_login__gte=seven_days_ago
    ).count()
    
    # Calculate percentage changes
    def calculate_percentage_change(current, previous_period):
        if previous_period == 0:
            return 0 if current == 0 else 100
        return round(((current - previous_period) / previous_period) * 100, 1)
    
    # Previous period (7-14 days ago)
    fourteen_days_ago = timezone.now() - timedelta(days=14)
    users_prev_period = User.objects.filter(
        date_joined__gte=fourteen_days_ago,
        date_joined__lt=seven_days_ago
    ).count()
    books_prev_period = Book.objects.filter(
        upload_date__gte=fourteen_days_ago,
        upload_date__lt=seven_days_ago
    ).count()
    downloads_prev_period = BookDownload.objects.filter(
        download_date__gte=fourteen_days_ago,
        download_date__lt=seven_days_ago
    ).count()
    active_users_prev_period = User.objects.filter(
        is_active=True,
        last_login__gte=fourteen_days_ago,
        last_login__lt=seven_days_ago
    ).count()
    
    users_trend = calculate_percentage_change(users_last_7_days, users_prev_period)
    books_trend = calculate_percentage_change(books_last_7_days, books_prev_period)
    downloads_trend = calculate_percentage_change(downloads_last_7_days, downloads_prev_period)
    active_users_trend = calculate_percentage_change(active_users_last_7_days, active_users_prev_period)
    
    return Response({
        'total_users': total_users,
        'total_books': total_books,
        'total_downloads': total_downloads,
        'active_users': active_users,
        'users_trend': users_trend,
        'books_trend': books_trend,
        'downloads_trend': downloads_trend,
        'active_users_trend': active_users_trend,
        'last_updated': timezone.now().isoformat(),
    })


def book_file_proxy(request, pk):
    """Proxy endpoint to stream PDFs from external URLs to bypass CORS issues"""
    book = get_object_or_404(Book, pk=pk)
    
    file_url = book.file_url or book.file
    
    if not file_url:
        return Response({'error': 'No file available'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        response = requests.get(file_url, stream=True, timeout=30)
        response.raise_for_status()
        
        streaming_response = StreamingHttpResponse(
            response.iter_content(chunk_size=8192),
            content_type=response.headers.get('content-type', 'application/pdf')
        )
        streaming_response['Content-Disposition'] = f'inline; filename="{book.title}.pdf"'
        streaming_response['Access-Control-Allow-Origin'] = '*'
        return streaming_response
    except requests.exceptions.RequestException as e:
        return Response(
            {'error': f'Failed to fetch file: {str(e)}'}, 
            status=status.HTTP_502_BAD_GATEWAY
        )
