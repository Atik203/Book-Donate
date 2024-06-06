from django.db import models

from user.models import BookUser

CONDITIONS=[
    ('New','New'),
    ('Used','Used'),
    ('Refurbished','Refurbished')
]
STATUS_CHOICES = [
    ('Available', 'Available'),
    ('Claimed', 'Claimed'),
    ('Donated', 'Donated'),
]
# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.ManyToManyField(Genre)
    description = models.TextField()
    condition = models.CharField(max_length=100, choices=CONDITIONS)
    image = models.ImageField(upload_to='books/',default='books/default.jpg')
    donated_by = models.ForeignKey(BookUser, related_name='donations', on_delete=models.SET_NULL, blank=True, null=True)
    claimed_by = models.ForeignKey(BookUser, related_name='claims', on_delete=models.SET_NULL, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Available')
    isbn = models.CharField(max_length=13, blank=True, null=True)
    publisher = models.CharField(max_length=100, blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    stock = models.IntegerField(default=0)
    pages = models.IntegerField(blank=True, null=True)
    reward_point = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title    