# Libronet Backend

Django REST Framework backend for the Libronet E-Library platform.

## 🎯 Overview

RESTful API backend providing book management, user authentication, reviews, and reading progress tracking.

## 🛠 Tech Stack

- **Django** 6.0.2 - Web framework
- **Django REST Framework** 3.15.2 - API framework
- **PostgreSQL** - Database
- **Pillow** 11.0.0 - Image processing
- **django-cors-headers** 4.6.0 - CORS handling
- **python-dotenv** 1.0.0 - Environment management

## 📦 Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables (see Configuration section)

4. Setup database:
```bash
createdb libronet_db
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run development server:
```bash
python manage.py runserver
```

## ⚙️ Configuration

Create `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.postgresql
DB_NAME=libronet_db
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
```

## 📁 Project Structure

```
backend/
├── api/                    # Main API application
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views
│   ├── urls.py            # API routes
│   └── permissions.py     # Custom permissions
├── core/                   # Project settings
│   ├── settings.py        # Django settings
│   ├── urls.py            # Root URL config
│   └── wsgi.py            # WSGI config
├── users/                  # User management
│   ├── models.py          # User models
│   ├── serializers.py     # User serializers
│   └── views.py           # Auth views
├── media/                  # Uploaded files
│   ├── books/             # PDF files
│   ├── book_covers/       # Cover images
│   └── avatars/           # User avatars
├── manage.py
└── requirements.txt
```

## 🗄️ Database Models

### Core Models

- **User**: Extended user model with profile information
- **Category**: Book categories/genres
- **Book**: Book metadata and files
- **Review**: User reviews and ratings
- **Shelve**: User's personal book collections
- **ReadingProgress**: Reading progress tracking
- **Quote**: Daily motivational quotes

See [backend.md](../backend.md) for detailed model documentation.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Books
- `GET /api/books/` - List books
- `POST /api/books/` - Upload book
- `GET /api/books/{id}/` - Book details
- `PUT /api/books/{id}/` - Update book
- `DELETE /api/books/{id}/` - Delete book

### Reviews
- `GET /api/books/{id}/reviews/` - Get reviews
- `POST /api/books/{id}/reviews/` - Add review

### Shelves
- `GET /api/shelves/` - Get user shelves
- `POST /api/shelves/` - Add to shelf
- `DELETE /api/shelves/{id}/` - Remove from shelf

See [API_ENDPOINTS.md](../API_ENDPOINTS.md) for complete API documentation.

## 🔐 Authentication

Token-based authentication using DRF's TokenAuthentication.

Include token in request headers:
```
Authorization: Token <your-token>
```

## 🧪 Testing

Run tests:
```bash
python manage.py test
```

## 📊 Database Management

Create migrations:
```bash
python manage.py makemigrations
```

Apply migrations:
```bash
python manage.py migrate
```

## 🚀 Deployment

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use production database
- [ ] Configure static/media file storage
- [ ] Set up HTTPS
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Set up logging
- [ ] Configure backup strategy

### Vercel Deployment

Configuration files included:
- `vercel.json` - Vercel configuration
- `build.sh` - Build script
- `vercel_app.py` - WSGI application

## 🛠️ Management Commands

Populate sample quotes:
```bash
./populate_quotes.sh
```

Setup script:
```bash
./setup.sh
```

## 📝 Admin Panel

Access Django admin at `http://localhost:8000/admin`

Features:
- User management
- Book moderation
- Category management
- Review moderation
- System statistics

## 🤝 Contributing

1. Follow PEP 8 style guide
2. Write tests for new features
3. Update documentation
4. Create migrations for model changes

## 📄 License

MIT License - See main project for details.

## 📚 Additional Documentation

- [Backend Architecture](../backend.md)
- [API Reference](../API_ENDPOINTS.md)
- [Migration Guide](./MIGRATION_FIX.md)
