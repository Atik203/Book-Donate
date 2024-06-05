from django.contrib.auth.models import User
from django.db import models


class BookUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to='users/', default='users/default.jpeg')

    def __str__(self):
        return self.user.username
