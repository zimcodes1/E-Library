# Libronet Frontend

React-based frontend application for the Libronet E-Library platform.

## 🎯 Overview

Modern, responsive web interface for browsing, reading, and managing digital books. Built with React, TypeScript, and Tailwind CSS.

## 🛠 Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.2.4 - Build tool and dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS
- **React Router** 7.11.0 - Client-side routing
- **Framer Motion** 12.34.2 - Animations
- **React PDF** 10.2.0 - PDF rendering

## 📦 Installation

```bash
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## 🔌 API Integration

The frontend connects to the Django backend API at `http://localhost:8000/api`. Update the base URL in your API service configuration if needed.

## 🎨 Features

- **Home Page**: Featured books, categories, daily quotes
- **Book Browser**: Search, filter, and browse books
- **Book Reader**: Built-in PDF viewer with progress tracking
- **User Dashboard**: Personal library management
- **Authentication**: Login and registration
- **Profile Management**: User settings and statistics
- **Reviews**: Rate and review books
- **Responsive Design**: Mobile-first approach

## 🔧 Configuration

Environment variables can be configured in `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

See the main [README](../README.md) for contribution guidelines.

## 📄 License

MIT License - See main project for details.
