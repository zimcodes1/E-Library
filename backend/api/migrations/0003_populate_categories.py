# Generated migration for populating categories

from django.db import migrations
from django.utils.text import slugify


def populate_categories(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    
    # Clear any existing empty slug entries
    Category.objects.filter(slug='').delete()
    
    categories = [
        {'name': 'Fiction', 'description': 'Fictional stories and novels', 'icon': 'book'},
        {'name': 'Non-Fiction', 'description': 'Real-world topics and facts', 'icon': 'file-text'},
        {'name': 'Science', 'description': 'Scientific books and research', 'icon': 'flask'},
        {'name': 'Technology', 'description': 'Tech, programming, and computing', 'icon': 'laptop'},
        {'name': 'History', 'description': 'Historical events and biographies', 'icon': 'clock'},
        {'name': 'Biography', 'description': 'Life stories of notable people', 'icon': 'user'},
        {'name': 'Self-Help', 'description': 'Personal development and growth', 'icon': 'heart'},
        {'name': 'Business', 'description': 'Business and entrepreneurship', 'icon': 'briefcase'},
        {'name': 'Philosophy', 'description': 'Philosophical thoughts and ideas', 'icon': 'lightbulb'},
        {'name': 'Psychology', 'description': 'Human mind and behavior', 'icon': 'brain'},
        {'name': 'Education', 'description': 'Educational and academic books', 'icon': 'graduation-cap'},
        {'name': 'Health', 'description': 'Health, fitness, and wellness', 'icon': 'heartbeat'},
        {'name': 'Art', 'description': 'Art, design, and creativity', 'icon': 'paint-brush'},
        {'name': 'Religion', 'description': 'Religious and spiritual texts', 'icon': 'book-open'},
        {'name': 'Travel', 'description': 'Travel guides and adventures', 'icon': 'plane'},
        {'name': 'Cooking', 'description': 'Recipes and culinary arts', 'icon': 'utensils'},
        {'name': 'Poetry', 'description': 'Poems and poetic works', 'icon': 'feather'},
        {'name': 'Drama', 'description': 'Plays and dramatic works', 'icon': 'theater-masks'},
        {'name': 'Comics', 'description': 'Comic books and graphic novels', 'icon': 'image'},
        {'name': 'Children', 'description': 'Books for children', 'icon': 'child'},
    ]
    
    for cat_data in categories:
        slug = slugify(cat_data['name'])
        if not Category.objects.filter(slug=slug).exists():
            Category.objects.create(
                name=cat_data['name'],
                slug=slug,
                description=cat_data['description'],
                icon=cat_data['icon']
            )


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_quote_book_bookdownload_readingprogress_review_and_more'),
    ]

    operations = [
        migrations.RunPython(populate_categories),
    ]
