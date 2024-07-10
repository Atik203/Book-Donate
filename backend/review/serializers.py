
from django.contrib.auth.models import User
from rest_framework import serializers

from book.models import Book
from user.models import BookUser

from .models import Review


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = BookUser
        fields = ['username', 'email', 'first_name', 'last_name','image','id']


    def get_id(self, obj):
        return obj.user.id
      
    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name
    
    def get_image(self, obj):
        return obj.image.url
    
    
        
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author','id','image']
    
    def get_image(self, obj):
        return obj.image.url
    
    def get_id(self, obj):
        return obj.id    
                

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    book = BookSerializer()
    class Meta:
        model = Review
        fields = '__all__'