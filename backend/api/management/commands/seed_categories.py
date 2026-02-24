from django.core.management.base import BaseCommand
from api.models import Category


class Command(BaseCommand):
    help = 'Seed default categories'

    def handle(self, *args, **kwargs):
        categories = [
            "Technology", "Science", "Art", "Music", "Cooking", 
            "Gaming", "Sports", "Travel", "Photography", "Reading"
        ]
        
        for cat_name in categories:
            Category.objects.get_or_create(name=cat_name)
            self.stdout.write(self.style.SUCCESS(f'Created category: {cat_name}'))
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded categories'))
