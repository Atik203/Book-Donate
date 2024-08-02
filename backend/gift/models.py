from django.db import models


# Create your models here.
class Gift(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='gifts/',default='gifts/default.jpg')
    point_cost = models.IntegerField()
    stock = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    