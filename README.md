# Libronet - E-Library Platform

A comprehensive e-library web application that enables users to discover, read, upload, and manage digital books. Built with Django REST Framework and React.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Book Management**: Browse, search, upload, and download books in PDF format
- **User Authentication**: Secure registration and login system
- **Personal Library**: Organize books into favorites, bookmarks, and downloads
- **Reading Progress**: Track reading progress with page tracking
- **Reviews & Ratings**: Rate and review books with 1-5 star system
- **Categories**: Browse books by categories (Science, Technology, Fiction, etc.)
- **Search & Filter**: Advanced search and filtering capabilities
- **User Profiles**: Customizable profiles with reading statistics
- **Daily Quotes**: Motivational quotes on the homepage
- **Responsive Design**: Mobile-friendly interface

## 🛠 Tech Stack

### Backend
- **Framework**: Django 6.0.2
- **API**: Django REST Framework 3.15.2
- **Database**: PostgreSQL
- **Authentication**: Token-based authentication
- **File Storage**: Django FileField with media storage
- **CORS**: django-cors-headers 4.6.0

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.11.0
- **Animations**: Framer Motion 12.34.2
- **PDF Viewer**: react-pdf 10.2.0

## 📦 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🚀 Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create PostgreSQL database:
```bash
createdb libronet_db
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
```

7. Start development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

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

### Frontend Configuration

Update API base URL in your frontend configuration if needed (default: `http://localhost:8000/api`).

## 📖 Usage

1. Access the application at `http://localhost:5173` (frontend)
2. Backend API available at `http://localhost:8000/api`
3. Admin panel at `http://localhost:8000/admin`

### Quick Start Guide

1. **Register**: Create a new account
2. **Browse**: Explore books by category or search
3. **Upload**: Share books with the community
4. **Read**: Open books in the built-in PDF reader
5. **Organize**: Add books to your personal shelves
6. **Review**: Rate and review books you've read

## 📚 API Documentation

Comprehensive API documentation available in [API_ENDPOINTS.md](./API_ENDPOINTS.md).

### Quick Reference

- **Base URL**: `http://localhost:8000/api`
- **Authentication**: Token-based (Header: `Authorization: Token <token>`)
- **Public Endpoints**: Books listing, categories, book details
- **Protected Endpoints**: Upload, reviews, shelves, reading progress

## 📁 Project Structure

```
E-Library/
├── backend/                 # Django backend
│   ├── api/                # API app
│   ├── core/               # Core settings
│   ├── users/              # User management
│   ├── media/              # Uploaded files
│   ├── manage.py
│   └── requirements.txt
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── API_ENDPOINTS.md        # API documentation
├── backend.md              # Backend architecture
└── README.md               # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Additional Resources

- [Backend Architecture Documentation](./backend.md)
- [API Endpoints Reference](./API_ENDPOINTS.md)
- [Book System Implementation](./BOOK_SYSTEM_IMPLEMENTATION.md)
- [Categories Documentation](./CATEGORIES.md)

## 📧 Support

For issues and questions, please open an issue on the repository.

---

**Made with ❤️ by the Libronet Team**
