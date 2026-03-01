from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories, name='categories'),
    path('books/', views.books, name='books'),
    path('books/<int:pk>/', views.book_detail, name='book-detail'),
    path('books/<int:pk>/view/', views.book_view, name='book-view'),
    path('books/<int:pk>/download/', views.book_download, name='book-download'),
    path('books/<int:pk>/reviews/', views.book_reviews, name='book-reviews'),
    path('books/<int:pk>/progress/', views.reading_progress, name='reading-progress'),
    path('shelves/', views.user_shelves, name='user-shelves'),
    path('shelves/<int:pk>/', views.remove_from_shelf, name='remove-from-shelf'),
    path('quote/today/', views.today_quote, name='today-quote'),
    path('my-books/', views.user_uploaded_books, name='user-uploaded-books'),
    path('new-arrivals/', views.new_arrivals, name='new-arrivals'),
]
