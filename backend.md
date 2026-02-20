# Backend Architecture - E-Library (Libronet)

## Project Overview

**Libronet** is a comprehensive e-library platform that allows users to:
- Discover and browse books across multiple categories
- Read books directly in the application
- Download or save books to personal shelves
- Upload and contribute books to the community
- Rate and review books
- Track reading statistics and personal interests
- Manage user profiles and authentication

---

## Core Features Analysis

### 1. **User Management**
- User registration and authentication
- Profile management (name, email, password)
- User interests/preferences (Technology, Science, Reading, etc.)
- Reading statistics tracking (books read, hours spent)
- User Avatar/Profile pictures

### 2. **Book Management**
- Book catalog with metadata (title, author, publication year, category)
- Book uploads by community members
- Book cover images and PDF files
- Multi-format support (PDF, URL-based books)
- Book categorization and filtering

### 3. **Reading Features**
- Book reading interface with PDF rendering
- Bookmarking functionality
- Reading progress tracking
- Favorites management

### 4. **Social Features**
- User ratings (1-5 stars)
- Book reviews with user comments and timestamps
- Community contributions display

### 5. **Search & Discovery**
- Search functionality across books
- Category-based filtering
- Advanced filtering options (filters visible in Search & Shelve pages)
- New arrivals section

### 6. **User Content Management**
- Personal shelves (All Books, Favorites, Bookmarks, Downloads)
- Book upload management
- User contributions tracking

---

## Database Models Design

### **1. User (Extended Custom User)**

Extends Django's built-in User model for additional functionality.

```
Fields:
- user (OneToOneField → django.contrib.auth.User)
- avatar (ImageField) - Profile picture
- bio (TextField) - Optional user biography
- interests (ManyToManyField → Category) - User's book interests
- reading_hours (IntegerField) - Total hours spent reading
- books_read (IntegerField) - Count of books completed
- created_at (DateTimeField) - Registration date
- updated_at (DateTimeField) - Last profile update

Key Methods:
- get_total_books_read()
- add_interests()
- get_user_stats()
```

---

### **2. Category**

Represents book categories/genres.

```
Fields:
- name (CharField) - Category name (Science, Technology, Fiction, etc.)
- slug (SlugField) - URL-friendly identifier
- description (TextField) - Category description
- icon (CharField) - Font Awesome icon class (optional)
- created_at (DateTimeField)

Key Methods:
- __str__() - Returns category name
- get_book_count() - Total books in category
```

**Examples**: Science, Technology, Storybook, Novel, Biography, Self-Help, etc.

---

### **3. Book**

Core model representing books in the library.

```
Fields:
- title (CharField) - Book title
- author (CharField) - Author name
- description (TextField) - Book description/synopsis
- category (ForeignKey → Category)
- cover_image (ImageField) - Book cover image
- file (FileField) - PDF file upload
- file_url (URLField) - External URL if hosted elsewhere
- publication_year (IntegerField)
- language (CharField) - Language of the book (English, Spanish, etc.)
- uploaded_by (ForeignKey → User) - Uploader/contributor
- upload_date (DateTimeField)
- updated_at (DateTimeField)
- file_type (CharField) - Choices: pdf, url
- pages (IntegerField) - Optional number of pages
- is_published (BooleanField) - Admin approval status

Metadata Fields:
- view_count (IntegerField) - Times book was opened
- download_count (IntegerField) - Times book was downloaded
- average_rating (FloatField) - Cached average from reviews
- total_reviews (IntegerField) - Count of reviews
- is_featured (BooleanField) - Featured in library

Key Methods:
- __str__() - Returns book title
- get_absolute_url()
- calculate_average_rating()
- increment_views()
- increment_downloads()
```

---

### **4. Review**

User reviews and ratings for books.

```
Fields:
- user (ForeignKey → User)
- book (ForeignKey → Book)
- rating (IntegerField) - Choices: 1, 2, 3, 4, 5 stars
- title (CharField) - Optional review title
- content (TextField) - Review text
- created_at (DateTimeField)
- updated_at (DateTimeField)
- helpful_count (IntegerField) - "Helpful" votes count

Key Methods:
- __str__() - Returns "{user.username} reviewed {book.title}"
- get_star_display() - Display rating as stars
```

**Constraints**: One review per user per book (unique_together constraint)

---

### **5. Shelve (User's Personal Shelf)**

Represents a user's personal book collection/shelf.

```
Fields:
- user (ForeignKey → User)
- book (ForeignKey → Book)
- shelf_type (CharField) - Choices:
  - 'all' - All books in library (viewing history)
  - 'favorite' - Favorited books
  - 'bookmark' - Bookmarked pages
  - 'downloaded' - Downloaded for offline
- added_date (DateTimeField) - When added to shelf
- reading_status (CharField) - Choices:
  - 'not_started'
  - 'reading'
  - 'completed'

Key Methods:
- __str__() - Returns "{user.username}'s {book.title} in {shelf_type}"
```

**Constraints**: Unique together (user, book, shelf_type)

---

### **6. ReadingProgress**

Tracks user's reading progress for a specific book.

```
Fields:
- user (ForeignKey → User)
- book (ForeignKey → Book)
- current_page (IntegerField) - Last read page
- total_pages (IntegerField) - Total pages in book
- reading_time (IntegerField) - Minutes spent reading
- started_at (DateTimeField)
- last_read_at (DateTimeField)
- completed_at (DateTimeField, null=True) - When book was finished

Key Methods:
- get_progress_percentage()
- mark_as_completed()
- estimate_completion_date()
```

**Constraints**: Unique together (user, book)

---

### **7. UserInterest**

Through model for user interests/preferences.

```
Fields:
- user (ForeignKey → User)
- category (ForeignKey → Category)
- added_at (DateTimeField)

Note: Can be simplified by using ManyToManyField directly on UserProfile
```

---

### **8. Author**

Separate model for author management (optional but recommended).

```
Fields:
- name (CharField) - Full author name
- bio (TextField) - Author biography
- date_of_birth (DateField, null=True)
- date_of_death (DateField, null=True)
- website (URLField, null=True)
- books (ManyToManyField → Book) - Books written

Key Methods:
- __str__() - Returns author name
- get_book_count()
```

**Note**: Can enhance Book model to use this or keep simpler with CharField.

---

### **9. BookDownload**

Track download statistics for analytics.

```
Fields:
- book (ForeignKey → Book)
- user (ForeignKey → User)
- download_date (DateTimeField)
- download_format (CharField) - 'pdf' or 'ebook'

Key Methods:
- __str__() - Returns "{user.username} downloaded {book.title}"
```

---

### **10. Quote (Daily Quotes)**

Daily quotes feature visible on home page.

```
Fields:
- text (TextField) - Quote text
- author (CharField) - Quote author/source
- category (CharField) - Category/topic
- created_at (DateTimeField)
- is_active (BooleanField)

Key Methods:
- __str__() - Returns quote text (truncated)
- get_today_quote() - Static method for today's quote
```

**Note**: Sample quotes visible in HomePage component.

---

## RelationShip Diagram

```
User (Extended)
├── 1:N → Book (uploaded_by)
├── 1:N → Review
├── 1:N → Shelve
├── 1:N → ReadingProgress
├── M:M → Category (interests)
└── 1:N → BookDownload

Book
├── N:1 → Category
├── N:1 → User (uploaded_by)
├── 1:N → Review
├── 1:N → Shelve
├── 1:N → ReadingProgress
└── 1:N → BookDownload

Category
├── 1:N → Book
└── M:M → User (interests)

Review
├── N:1 → User
└── N:1 → Book

Shelve
├── N:1 → User
└── N:1 → Book

ReadingProgress
├── N:1 → User
└── N:1 → Book
```

---

## API Endpoints Overview

### **Authentication Endpoints**
```
POST   /api/auth/register/          - User registration
POST   /api/auth/login/             - User login
POST   /api/auth/logout/            - User logout
POST   /api/auth/refresh/           - Refresh token
POST   /api/auth/password-change/   - Change password
POST   /api/auth/password-reset/    - Password reset request
```

### **User Endpoints**
```
GET    /api/users/profile/          - Get user profile
PUT    /api/users/profile/          - Update user profile
POST   /api/users/interests/        - Update user interests
GET    /api/users/stats/            - Get reading statistics
GET    /api/users/{id}/             - Get user public profile
```

### **Book Endpoints**
```
GET    /api/books/                  - List all books (with pagination)
POST   /api/books/                  - Upload new book
GET    /api/books/{id}/             - Get book details
PUT    /api/books/{id}/             - Update book (by uploader)
DELETE /api/books/{id}/             - Delete book (by uploader/admin)
GET    /api/books/search/           - Search books
GET    /api/books/category/{id}/    - Books by category
GET    /api/books/new-arrivals/     - Recently uploaded books
GET    /api/books/featured/         - Featured books
GET    /api/books/{id}/download/    - Download book PDF
```

### **Review Endpoints**
```
GET    /api/books/{id}/reviews/     - Get reviews for a book
POST   /api/books/{id}/reviews/     - Post a review
PUT    /api/reviews/{id}/           - Update review
DELETE /api/reviews/{id}/           - Delete review
GET    /api/reviews/                - User's all reviews
```

### **Shelve Endpoints**
```
GET    /api/shelves/                - Get user's shelves
GET    /api/shelves/{type}/         - Get specific shelf
POST   /api/shelves/                - Add book to shelf
DELETE /api/shelves/{id}/           - Remove from shelf
PUT    /api/shelves/{id}/           - Update shelf entry
GET    /api/shelves/favorites/      - Get favorite books
GET    /api/shelves/downloads/      - Get downloaded books
```

### **Reading Progress Endpoints**
```
GET    /api/reading-progress/{bookId}/  - Get reading progress
POST   /api/reading-progress/           - Update reading progress
PUT    /api/reading-progress/{id}/      - Update progress details
```

### **Category Endpoints**
```
GET    /api/categories/             - List all categories
GET    /api/categories/{id}/        - Get category details
```

### **Quote Endpoints**
```
GET    /api/quotes/today/           - Get today's quote
GET    /api/quotes/                 - Get all quotes
```

---

## Key Design Considerations

### **1. Authentication**
- Use Django REST Framework's token authentication or JWT
- Implement token refresh mechanism
- Secure password storage with Django's built-in hashing

### **2. File Handling**
- Store PDF files using Django's FileField
- Implement cloud storage (AWS S3, Google Cloud Storage) for production
- Add file validation (size limits, format validation)
- Generate file URLs for streaming

### **3. Performance Optimization**
- Cache average ratings and review counts on Book model
- Implement pagination for large datasets
- Add database indexing on frequently queried fields
- Use select_related() and prefetch_related() in queries

### **4. Security**
- Implement permission-based access control
- Only allow users to edit their own reviews/uploads
- Validate file uploads
- Rate limit API endpoints
- Add CORS configuration for frontend integration

### **5. Search & Filtering**
- Implement full-text search on book titles and descriptions
- Add filtering by category, author, year, rating
- Use Django-filter or DRF filtering capabilities

### **6. Caching**
- Cache recently viewed books
- Cache popular/trending books
- Cache user interests and preferences

---

## Serializers Overview

Each model should have corresponding DRF serializers:

```
✓ UserSerializer - User profile data
✓ UserDetailSerializer - Extended user info with interests
✓ BookSerializer - Basic book information
✓ BookDetailSerializer - Complete book with reviews and ratings
✓ ReviewSerializer - Book reviews
✓ ShelveSerializer - Personal shelf entries
✓ ReadingProgressSerializer - Reading progress data
✓ CategorySerializer - Category information
✓ QuoteSerializer - Daily quotes
```

---

## Implementation Priority

### **Phase 1 (Core)**
1. User model and authentication
2. Category model
3. Book model
4. Review model
5. Basic CRUD endpoints

### **Phase 2 (Features)**
1. Shelve functionality
2. Reading progress tracking
3. Search and filtering
4. File upload handling

### **Phase 3 (Enhancement)**
1. Advanced analytics
2. Caching strategies
3. Quote system
4. Author model
5. Download tracking

---

## Technology Stack

- **Framework**: Django 6.0+
- **API**: Django REST Framework
- **Database**: PostgreSQL (recommended for production)
- **Authentication**: Token/JWT
- **File Storage**: Django FileField (S3 for production)
- **Task Queue**: Celery (optional, for async operations)
- **Caching**: Redis (optional, for performance)

---

## Next Steps

1. Create all models in `backend/api/models.py`
2. Generate initial migrations
3. Create serializers in `backend/api/serializers.py`
4. Implement views and viewsets in `backend/api/views.py`
5. Configure URL routing in `backend/api/urls.py`
6. Set up CORS and authentication in settings
7. Implement file upload and PDF serving
8. Create comprehensive API documentation
9. Add test coverage
10. Deploy with production configurations

