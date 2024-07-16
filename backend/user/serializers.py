from django.contrib.auth.models import User
from rest_framework import serializers

from .models import BookUser


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email']

class BookUserSerializers(serializers.ModelSerializer):
    user = UserSerializers(many=False,read_only=True)
    class Meta:
        model = BookUser
        fields = '__all__'
    
class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['username',"first_name",'last_name', 'email', 'password', 'confirm_password', 'phone', 'address']
    
    def save(self):
        username = self.validated_data['username']
        first_name = self.validated_data['first_name']
        last_name = self.validated_data['last_name']
        email = self.validated_data['email']
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        phone = self.validated_data['phone']
        address = self.validated_data['address']
        
        if password != confirm_password:
            raise serializers.ValidationError({'error': 'Passwords do not match'})
        if(User.objects.filter(email = email).exists()):
            raise serializers.ValidationError({'error': 'email already exists'})
        if(User.objects.filter(username = username).exists()):
            raise serializers.ValidationError({'error': 'username already exists'})
        if(BookUser.objects.filter(phone = phone).exists()):
            raise serializers.ValidationError({'error': 'phone already exists'})
        
        account = User(username = username, email = email, first_name = first_name, last_name = last_name)
        account.set_password(password)
        account.save()
        
        book_user = BookUser(user = account, phone = phone, address = address)
        book_user.save()
        return account

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required = True)         


class PasswordChangeSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    old_password = serializers.CharField(required = True)
    new_password = serializers.CharField(required = True)
    confirm_password = serializers.CharField(required = True)
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({'error': 'Passwords do not match'})
        return data    