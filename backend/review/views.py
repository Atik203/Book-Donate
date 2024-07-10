from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response

from book.models import Book
from user.models import BookUser

# Create your views here.
from .models import Review
from .serializers import PostReviewSerializer, ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        bookId = self.request.query_params.get('bookId', None)
        userId = self.request.query_params.get('userId', None)
        if id is not None:
            queryset = queryset.filter(id=id)
            if not queryset.exists():
                return queryset
        if bookId is not None:
            queryset = queryset.filter(book__id=bookId) 
            if not queryset.exists():
                return queryset
        if userId is not None:
            queryset = queryset.filter(user__id=userId)
            if not queryset.exists():
                return queryset
            
        return queryset

class PostReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = PostReviewSerializer
    
    # def perform_create(self, serializer):
    #     user_id = self.request.data.get('user')
    #     book_id = self.request.data.get('book')
    #     print(user_id)
    #     print(book_id)
    #     try:
    #         user = BookUser.objects.get(user__id=user_id)
    #     except BookUser.DoesNotExist:
    #         return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     try:
    #         book = Book.objects.get(id=book_id)
    #     except Book.DoesNotExist:
    #         return Response({'error': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
    #     serializer.save(user=user, book=book)    
            