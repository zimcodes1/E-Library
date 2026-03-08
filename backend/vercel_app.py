import os
import sys

# Add the project directory to the sys.path
path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.append(path)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from core.wsgi import application

app = application