from django.contrib.auth.models import User
from django.db import models

from gift.models import Gift

ROLE_CHOICES = (
    ('User', 'User'),
    ('Admin', 'Admin'),
)


class BookUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=11)
    address = models.CharField(max_length=255)
    image = models.CharField(max_length=200, blank=True, null=True)
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
    
class BookUserGift(models.Model):
    book_user = models.ForeignKey(BookUser, on_delete=models.CASCADE)
    gift = models.ForeignKey(Gift, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    point_cost = models.IntegerField()
    
    def __str__(self):
        return self.book_user.user.username + ' - ' + self.gift.name    
