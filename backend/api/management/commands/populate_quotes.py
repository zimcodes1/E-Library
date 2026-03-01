from django.core.management.base import BaseCommand
from api.models import Quote

class Command(BaseCommand):
    help = 'Populate database with inspirational quotes'

    def handle(self, *args, **kwargs):
        quotes_data = [
            {"text": "A reader lives a thousand lives before he dies. The man who never reads lives only one.", "author": "George R.R. Martin"},
            {"text": "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", "author": "Dr. Seuss"},
            {"text": "There is no friend as loyal as a book.", "author": "Ernest Hemingway"},
            {"text": "Books are a uniquely portable magic.", "author": "Stephen King"},
            {"text": "Reading is essential for those who seek to rise above the ordinary.", "author": "Jim Rohn"},
            {"text": "I have always imagined that Paradise will be a kind of library.", "author": "Jorge Luis Borges"},
            {"text": "A book is a dream that you hold in your hand.", "author": "Neil Gaiman"},
            {"text": "Reading is to the mind what exercise is to the body.", "author": "Joseph Addison"},
            {"text": "The reading of all good books is like a conversation with the finest minds of past centuries.", "author": "René Descartes"},
            {"text": "Books are the quietest and most constant of friends.", "author": "Charles William Eliot"},
            {"text": "Today a reader, tomorrow a leader.", "author": "Margaret Fuller"},
            {"text": "Reading gives us someplace to go when we have to stay where we are.", "author": "Mason Cooley"},
            {"text": "A room without books is like a body without a soul.", "author": "Marcus Tullius Cicero"},
            {"text": "You can never get a cup of tea large enough or a book long enough to suit me.", "author": "C.S. Lewis"},
            {"text": "If you don't like to read, you haven't found the right book.", "author": "J.K. Rowling"},
            {"text": "Think before you speak. Read before you think.", "author": "Fran Lebowitz"},
            {"text": "Let's be reasonable and add an eighth day to the week that is devoted exclusively to reading.", "author": "Lena Dunham"},
            {"text": "The person who deserves most pity is a lonesome one on a rainy day who doesn't know how to read.", "author": "Benjamin Franklin"},
            {"text": "Reading is a discount ticket to everywhere.", "author": "Mary Schmich"},
            {"text": "Once you learn to read, you will be forever free.", "author": "Frederick Douglass"},
        ]

        created_count = 0
        for quote_data in quotes_data:
            quote, created = Quote.objects.get_or_create(
                text=quote_data['text'],
                defaults={'author': quote_data['author'], 'is_active': True}
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully added {created_count} new quotes. Total quotes: {Quote.objects.count()}'))
