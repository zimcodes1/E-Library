from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Book, BookApprovalStatus, AdminActivity

@receiver(post_save, sender=Book)
def create_book_approval_status(sender, instance, created, **kwargs):
    if created:
        BookApprovalStatus.objects.get_or_create(book=instance)
        AdminActivity.objects.create(
            user=instance.uploaded_by,
            activity_type='upload',
            book=instance,
            description=f'Uploaded book: {instance.title}'
        )
