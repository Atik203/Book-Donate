from django.contrib.auth.models import User
from django.db import models

ROLE_CHOICES = (
    ('User', 'User'),
    ('Admin', 'Admin'),
)


class BookUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=11)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to='users/', default='users/default.jpeg')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='User')
    reward_point = models.IntegerField(default=0)
    
    def save(self, *args, **kwargs):
        if self.user.is_superuser:
            self.role = 'Admin'
            self.user.first_name = 'Admin'
            self.user.last_name = ''
            self.user.save()
        super(BookUser, self).save(*args, **kwargs)    
    def __str__(self):
        return self.user.username
