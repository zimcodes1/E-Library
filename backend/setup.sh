#!/bin/bash

# Activate virtual environment
source /home/azimeh/.local/share/virtualenvs/backend-iyWqGYFg/bin/activate

# Install requirements
pip install -r requirements.txt

# Remove existing migration history from database
python manage.py migrate --fake authtoken zero
python manage.py migrate --fake contenttypes zero
python manage.py migrate --fake auth zero

# Create users migrations
python manage.py makemigrations users

# Run all migrations in correct order
python manage.py migrate

echo "Setup complete! Run: python manage.py runserver"
