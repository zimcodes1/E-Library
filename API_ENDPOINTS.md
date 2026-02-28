# E-Library API Endpoints Reference

Base URL: `http://localhost:8000/api`

## 🔓 Public Endpoints (No Authentication Required)

### Categories
```
GET /categories/
```
Returns all book categories with book counts.

### Books
```
GET /books/
Query Parameters:
  - category: Filter by category slug
  - search: Search in title and author
  - featured: true/false
```
Returns list of published books.

```
GET /books/{id}/
```
Returns book details and increments view count.

### Quote
```
GET /quote/today/
```
Returns a random daily motivational quote.

---

## 🔐 Authenticated Endpoints (Requires Token)

**Header Required:** `Authorization: Token <your_token>`

### Book Management

#### Upload Book
```
POST /books/
Content-Type: multipart/form-data

Required Fields:
  - title: string
  - author: string
  - description: string
  - category: integer (category ID)
  - cover_image: file (image)
  - publication_year: integer
  - language: string
  - file_type: 'pdf' or 'url'
  
Conditional Fields:
  - file: file (PDF) - required if file_type='pdf'
  - file_url: string (URL) - required if file_type='url'
  
Optional Fields:
  - pages: integer
```

#### Update Book
```
PUT /books/{id}/
Content-Type: multipart/form-data

Note: Only book owner can update
Same fields as POST (all optional for partial update)
```

#### Delete Book
```
DELETE /books/{id}/

Note: Only book owner can delete
```

#### Get User's Uploaded Books
```
GET /my-books/
```
Returns all books uploaded by authenticated user.

### Downloads

```
POST /books/{id}/download/
Content-Type: application/json

Body:
{
  "format": "pdf"  // optional, defaults to 'pdf'
}
```
Records download and increments download count.

### Reviews

#### Get Book Reviews
```
GET /books/{id}/reviews/
```
Returns all reviews for a book.

#### Add Review
```
POST /books/{id}/reviews/
Content-Type: application/json

Body:
{
  "rating": 1-5,           // required
  "title": "string",       // optional
  "content": "string"      // required
}
```
Adds review and recalculates book's average rating.

### Shelves (Bookmarks/Favorites)

#### Get User Shelves
```
GET /shelves/
Query Parameters:
  - type: 'all', 'favorite', 'bookmark', 'downloaded'
```
Returns user's shelved books.

#### Add to Shelf
```
POST /shelves/
Content-Type: application/json

Body:
{
  "book": integer,                    // required (book ID)
  "shelf_type": "string",             // required: 'all', 'favorite', 'bookmark', 'downloaded'
  "reading_status": "string"          // optional: 'not_started', 'reading', 'completed'
}
```

#### Remove from Shelf
```
DELETE /shelves/{id}/
```
Removes book from shelf.

### Reading Progress

#### Get Reading Progress
```
GET /books/{id}/progress/
```
Returns reading progress for a specific book.

#### Create Reading Progress
```
POST /books/{id}/progress/
Content-Type: application/json

Body:
{
  "current_page": integer,    // required
  "total_pages": integer,     // required
  "reading_time": integer     // optional (in minutes)
}
```

#### Update Reading Progress
```
PUT /books/{id}/progress/
Content-Type: application/json

Body:
{
  "current_page": integer,    // optional
  "total_pages": integer,     // optional
  "reading_time": integer     // optional
}
```

---

## 📊 Response Examples

### Book Object
```json
{
  "id": 1,
  "title": "The Great Book",
  "author": "John Doe",
  "description": "An amazing book...",
  "category": 1,
  "category_name": "Science",
  "cover_image": "http://localhost:8000/media/book_covers/book.jpg",
  "file": "http://localhost:8000/media/books/book.pdf",
  "file_url": null,
  "publication_year": 2024,
  "language": "English",
  "uploaded_by": 1,
  "uploaded_by_username": "uploader123",
  "uploaded_by_avatar": "http://localhost:8000/media/avatars/avatar.jpg",
  "upload_date": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z",
  "file_type": "pdf",
  "pages": 250,
  "is_published": true,
  "view_count": 100,
  "download_count": 50,
  "average_rating": 4.5,
  "total_reviews": 10,
  "is_featured": false
}
```

### Review Object
```json
{
  "id": 1,
  "user": 1,
  "user_username": "reader123",
  "user_avatar": "http://localhost:8000/media/avatars/avatar.jpg",
  "book": 1,
  "rating": 5,
  "title": "Excellent Book!",
  "content": "This book changed my life...",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z",
  "helpful_count": 5
}
```

### Shelve Object
```json
{
  "id": 1,
  "user": 1,
  "book": 1,
  "book_details": { /* Full book object */ },
  "shelf_type": "favorite",
  "added_date": "2024-01-01T12:00:00Z",
  "reading_status": "reading"
}
```

### Reading Progress Object
```json
{
  "id": 1,
  "user": 1,
  "book": 1,
  "current_page": 125,
  "total_pages": 250,
  "reading_time": 180,
  "started_at": "2024-01-01T12:00:00Z",
  "last_read_at": "2024-01-05T15:30:00Z",
  "completed_at": null,
  "progress_percentage": 50.0
}
```

---

## 🔑 Authentication

To get a token, use the auth endpoints:
```
POST /api/auth/login/
POST /api/auth/register/
```

Then include in all authenticated requests:
```
Authorization: Token <your_token_here>
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Permission denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```
