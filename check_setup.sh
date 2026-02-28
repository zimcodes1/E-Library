#!/bin/bash

echo "======================================"
echo "E-Library Book System - Setup Checker"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "client" ]; then
    echo "❌ Error: Run this script from the E-Library root directory"
    exit 1
fi

echo "✅ Directory structure verified"
echo ""

# Check backend files
echo "Checking Backend Files..."
echo "------------------------"

files=(
    "backend/api/models.py"
    "backend/api/serializers.py"
    "backend/api/views.py"
    "backend/api/urls.py"
    "backend/api/admin.py"
    "backend/media/book_covers"
    "backend/media/books"
)

for file in "${files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "Checking Frontend Files..."
echo "-------------------------"

frontend_files=(
    "client/src/utils/books/bookService.ts"
    "client/src/utils/books/index.ts"
    "client/src/pages/Upload.tsx"
    "client/src/pages/HomePage.tsx"
    "client/src/components/BookItem.tsx"
)

for file in "${frontend_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo "1. Run migrations:"
echo "   cd backend && python manage.py migrate"
echo ""
echo "2. Create superuser (if not exists):"
echo "   python manage.py createsuperuser"
echo ""
echo "3. Start backend server:"
echo "   python manage.py runserver"
echo ""
echo "4. In another terminal, start frontend:"
echo "   cd client && npm run dev"
echo ""
echo "5. Test API endpoints:"
echo "   - http://localhost:8000/api/categories/"
echo "   - http://localhost:8000/api/books/"
echo "   - http://localhost:8000/api/quote/today/"
echo ""
echo "6. Access admin panel:"
echo "   - http://localhost:8000/admin/"
echo ""
echo "======================================"
