from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories, name='categories'),
]
