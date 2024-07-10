from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import Review
from .serializers import ReviewSerializer


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