from django.db.models import Avg, Case, FloatField, IntegerField, Value, When
from django.db.models.functions import Coalesce
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from review.models import Review

from .models import Book, Genre
from .serializers import BookSerializers, GenreSerializers


class BookPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    
     


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    pagination_class = BookPagination
    serializer_class = BookSerializers
    filter_backends = [SearchFilter]
    search_fields = ['title', 'author', 'genre__name', 'publisher']
    
    # query with id
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)
            if not queryset.exists():
                return queryset
        return queryset
    
     
        
    
   
    
    
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializers    
    
class PopularBooksView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializers
    def get_queryset(self):
        # Convert star ratings to numerical values and calculate the average
        ratings_case = Case(
            When(reviews__rating='⭐', then=Value(1)),
            When(reviews__rating='⭐⭐', then=Value(2)),
            When(reviews__rating='⭐⭐⭐', then=Value(3)),
            When(reviews__rating='⭐⭐⭐⭐', then=Value(4)),
            When(reviews__rating='⭐⭐⭐⭐⭐', then=Value(5)),
            default=Value(0),
            output_field=IntegerField(),
        )
        # Annotate books with their average rating
# Annotate books with their average rating
        books_with_avg_rating = Book.objects.annotate(
            avg_rating=Coalesce(Avg(ratings_case, output_field=FloatField()), Value(0.0))
        ).order_by('-avg_rating')[:6]  
        return books_with_avg_rating
       