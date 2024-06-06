from django.shortcuts import render
from rest_framework import viewsets

from .models import Book, Genre
from .serializers import BookSerializers, GenreSerializers


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializers
    queryset = Book.objects.all()
    
    
class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializers    