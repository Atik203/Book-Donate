from django.db import models

from book.models import Book
from user.models import BookUser

STAR_CHOICES = (
    ('⭐', '⭐'),
    ('⭐⭐', '⭐⭐'),
    ('⭐⭐⭐', '⭐⭐⭐'),
    ('⭐⭐⭐⭐', '⭐⭐⭐⭐'),
    ('⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'),
)
# Create your models here.
class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(BookUser, related_name='reviews', on_delete=models.CASCADE)
    rating = models.CharField(max_length=10, choices=STAR_CHOICES)
    comment = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review for {self.book.title} by {self.user.user.username}'