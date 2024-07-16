from django.db.models import Avg, Case, FloatField, IntegerField, Value, When
from django.db.models.functions import Coalesce
from django.shortcuts import render
from rest_framework import generics, serializers, status, viewsets
from rest_framework.filters import BaseFilterBackend, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from review.models import Review
from user.models import BookUser

from .models import Book, Genre
from .serializers import (AddBookSerializers, AddGenreSerializer,
                          AuthorSerializers, BookSerializers,
                          ClaimedBookSerializers, GenreSerializers,
                          UserClaimedBookSerializers,
                          UserDonatedBookSerializers)


class BookPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    
     


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    pagination_class = BookPagination
    serializer_class = BookSerializers
    filter_backends = [SearchFilter]
    search_fields = ['title', 'author', 'genre__slug', 'publisher','condition','status','genre__name','condition','status','author']
    
    # query with id
    def get_queryset(self):
        queryset = super().get_queryset()
        id = self.request.query_params.get('id', None)
        genre_slug = self.request.query_params.get('genre', None)
        condition = self.request.query_params.get('condition', None)
        status = self.request.query_params.get('status', None)
        rating = self.request.query_params.get('rating', None)
        author = self.request.query_params.get('author', None)
        if id is not None:
            queryset = queryset.filter(id=id)
            if not queryset.exists():
                return queryset
        
        if genre_slug is not None:
            queryset = queryset.filter(genre__slug=genre_slug)
        if condition is not None:
            queryset = queryset.filter(condition=condition)
        if status is not None:
            queryset = queryset.filter(status=status)
        if rating is not None:
            star_rating = f'⭐' * int(rating)
            queryset = queryset.filter(reviews__rating=star_rating)
        if author is not None:
            author_name = author.replace('+', ' ')
            queryset = queryset.filter(author=author_name)
        
            
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

class AuthorListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        authors = Book.objects.values_list('author', flat=True).distinct()
        serializer = AuthorSerializers(authors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ClaimBookAPIView(APIView):
    def post(self, request, *args, **kwargs): # Debugging line to print incoming request data
        serializer = ClaimedBookSerializers(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({'Claimed Book Successfully'}, status=status.HTTP_201_CREATED)
            except serializers.ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class UserClaimedBooksView(generics.ListAPIView):
    serializer_class = UserClaimedBookSerializers

    def get_queryset(self):
        id = self.kwargs['id']
        return Book.objects.filter(claimed_by__id=id)

class UserDonatedBooksView(generics.ListAPIView):
    serializer_class = UserDonatedBookSerializers

    def get_queryset(self):
        id = self.kwargs['id']
        return Book.objects.filter(donated_by__id=id)
    
class AddBookView(APIView):
    parser_classes = (FormParser, MultiPartParser)
    def post(self, request):
        serializer = AddBookSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Book added successfully'})
        return Response(serializer.errors, status=400)
    
class AddGenreView(APIView):
    def post(self, request):
        serializer = AddGenreSerializer(data=request.data)
        if serializer.is_valid():
            genre = serializer.save()
            return Response({'id': genre.id, 'name': genre.name, 'slug': genre.slug}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       