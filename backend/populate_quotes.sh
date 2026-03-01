#!/bin/bash
cd "$(dirname "$0")"
python manage.py populate_quotes
