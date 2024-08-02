from django.shortcuts import render
from rest_framework import serializers, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from book.models import Book
from user.models import BookUser

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


class PostReviewAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PostReviewSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({'success': True, 'message': 'Review posted successfully'}, status=status.HTTP_201_CREATED)
            except serializers.ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            