from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from user.models import BookUser, BookUserGift

from .models import Gift
from .serializers import (AddGiftSerializer, BuyGiftSerializer,
                          DeleteGiftSerializer, GetSpecificUserGiftSerializer,
                          GiftSerializer)


class AddGiftView(APIView):
    parser_classes = (FormParser, MultiPartParser)

    def post(self, request):
        serializer = AddGiftSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteGiftView(APIView):
    def delete(self, request):
        serializer = DeleteGiftSerializer(data=request.data)
        if serializer.is_valid():
            serializer.delete(serializer.validated_data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BuyGiftView(APIView):
    parser_classes = (FormParser, MultiPartParser)

    def post(self, request):
        serializer = BuyGiftSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetSpecificUserGiftView(APIView):
    def get(self, request, user_id):
        book_user = BookUser.objects.get(id=user_id)
        serializer = GetSpecificUserGiftSerializer(book_user)
        return Response(serializer.data)

class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
