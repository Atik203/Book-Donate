from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import Gift
from .serializers import GiftSerializer


class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
