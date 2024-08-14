
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from book.models import Book
from book.serializers import BookSerializers

from .models import BookUser
from .serializers import (BookUserSerializers, DeleteUserSerializer,
                          EditProfileSerializer, LoginSerializer,
                          MakeAdminSerializer, PasswordChangeSerializer,
                          RegistrationSerializer)


def send_confirm_email(confirm_link,subject,template_name,email):
    mail_subject = subject
    message = render_to_string(template_name, {
        'confirm_link': confirm_link,
    })
    send_email = EmailMessage(
        mail_subject,
        message,
        to=[email]
    )
    send_email.content_subtype = 'html'
    send_email.send()

class BookUserViewSet(viewsets.ModelViewSet):
    queryset =  BookUser.objects.all()
    serializer_class = BookUserSerializers
    
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)
            if not queryset.exists():
                return queryset
        return queryset
    


class RegistrationView(APIView):
    serializer_class = RegistrationSerializer
   
    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.is_active = False
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                # https://book-donate-yo6k.onrender.com
                confirm_link = 'https://book-donate-yo6k.onrender.com' + reverse('activate', args=[uid, token])
                send_confirm_email(confirm_link,'Confirm Email','confirm_email.html',user.email)
                return Response({'success': True, 'message': 'Account created successfully. Please confirm your email to login'})
        except Exception as e:
            return Response({'error':str(e)})    
        return Response(serializer.errors)
    
def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return JsonResponse({'success': True, 'message': 'Account activated successfully. Please login'})
    else:
        return JsonResponse({'error': 'Activation link is invalid!'})


class LoginViewSet(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                username = serializer.validated_data['username']
                password = serializer.validated_data['password']
                user = authenticate(username = username, password = password)
                if user:
                    token,_ = Token.objects.get_or_create(user = user)
                    login(request, user)
                    claimed_books = Book.objects.filter(claimed_by=user.bookuser.id)
                    claimed_books_serializer = BookSerializers(claimed_books, many=True).data
                    user_data = {
                        # BokkUser model id not user model id
                        'id': user.bookuser.id,
                        'username': user.username, 
                        'email': user.email, 
                        'first_name': user.first_name, 
                        'last_name': user.last_name,
                        'reward_point': user.bookuser.reward_point,
                        'role' : user.bookuser.role,
                        'claimed_books': claimed_books_serializer,
                        'address': user.bookuser.address
                    }
                    if hasattr(user, 'bookuser') and user.bookuser is not None:
                        user_data['phone'] = user.bookuser.phone
                        user_data['image'] = user.bookuser.image
                    return Response({'token': token.key, 'user': user_data })
                else:
                    return Response({'error': 'Invalid credentials'})
        except Exception as e:
            return Response({'error': str(e)})    
        return Response(serializer.errors)



class LogOutViewSet(APIView):
    def get(self, request):
        try:
            if request.user.is_authenticated:
                request.user.auth_token.delete()
                logout(request)
        except:
            return Response("Error Something")        
        return Response("Logged out successfully")

class PasswordChangeViewSet(APIView):
    serializer_class = PasswordChangeSerializer
    def post(self, request):
        try:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                username = serializer.validated_data['username']
                old_password = serializer.validated_data['old_password']
                new_password = serializer.validated_data['new_password']
                user = authenticate(username = username, password = old_password)
                if user:
                    user.set_password(new_password)
                    user.save()
                    return Response({'success': True, 'message': 'Password changed successfully'})
                else:
                    return Response({'error': 'Invalid credentials'})
        except Exception as e:
            return Response({'error': str(e)})    
        return Response(serializer.errors)        




class EditProfileView(APIView):
    serializer_class = EditProfileSerializer
    
    def post(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        id = request.data.get('id')
        if not id:
            return Response({'error': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = BookUser.objects.get(id=id)
        except BookUser.DoesNotExist:
            raise NotFound('BookUser matching query does not exist.')
        
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Profile Updated Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserView(APIView):
    parser_classes = [JSONParser]

    def delete(self, request, *args, **kwargs):
        serializer = DeleteUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.delete()
            return Response({'success': True, 'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MakeAdminView(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        serializer = MakeAdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.make_admin()
            return Response({'success': True, 'message': 'User promoted to admin successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)