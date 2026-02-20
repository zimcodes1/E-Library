# Fix Migration Issue

## The problem: 
The authtoken migration is trying to run before the users table exists.

## Solution - Run these commands in order:

```bash
# 1. Activate your virtual environment
source /home/azimeh/.local/share/virtualenvs/backend-iyWqGYFg/bin/activate

# 2. Drop and recreate the database (EASIEST)
psql -U libronet_admin -d postgres
DROP DATABASE libronet_db;
CREATE DATABASE libronet_db;
\q

# 3. Create migrations for users app
python manage.py makemigrations users

# 4. Run all migrations
python manage.py migrate

# 5. Create superuser
python manage.py createsuperuser

# 6. Run server
python manage.py runserver
```

## Alternative (if you can't drop database):
```bash
# Delete migration files
rm -rf api/migrations/
rm -rf users/migrations/

# Recreate migrations folders
mkdir -p api/migrations users/migrations
touch api/migrations/__init__.py users/migrations/__init__.py

# Create all migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate
```
