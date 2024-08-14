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

class EditProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(write_only=True)
    image = serializers.CharField(required=False)
    user = UserSerializers(many=False, read_only=True)
    class Meta:
        model = BookUser
        fields = ['id', 'phone', 'address', 'image', 'user']

    def update(self, instance, validated_data):
        image = validated_data.pop('image', None)
        if image:
            instance.image = image
        
        user_data = validated_data.get('user')
        if user_data:
            instance.user.username = user_data.get('username', instance.user.username)
            instance.user.first_name = user_data.get('first_name', instance.user.first_name)
            instance.user.last_name = user_data.get('last_name', instance.user.last_name)
            instance.user.email = user_data.get('email', instance.user.email)
            instance.user.save()
        
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return super().update(instance, validated_data)
    


class DeleteUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    
    class Meta:
        model = BookUser
        fields = ['id'] 
    
    def validate(self, data):
        id = data['id']
        if not BookUser.objects.filter(id = id).exists():
            raise serializers.ValidationError({'error': 'User does not exist'})
        return data    
    
    def delete(self):
        id = self.validated_data['id']
        user = BookUser.objects.get(id = id)
        user.delete()
        return user

class MakeAdminSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    
    class Meta:
        model = BookUser
        fields = ['id'] 
    
    def validate(self, data):
        id = data['id']
        if not BookUser.objects.filter(id = id).exists():
            raise serializers.ValidationError({'error': 'User does not exist'})
        return data    
    
    def make_admin(self):
        id = self.validated_data['id']
        user = BookUser.objects.get(id = id)
        user.role = 'Admin'
        user.user.is_staff = True
        user.user.save()
        user.save()
        return user        