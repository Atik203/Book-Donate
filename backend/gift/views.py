from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
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
    def post(self, request):
        serializer = BuyGiftSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            reward_point = result['reward_point'] 
            return Response({'success':True,'reward_point': reward_point }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetSpecificUserGiftView(viewsets.ModelViewSet):
    serializer_class = GetSpecificUserGiftSerializer
    queryset = BookUserGift.objects.all()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('id')
        if user_id:
            queryset = queryset.filter(book_user__id=user_id)
        return queryset    
    


class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    
   
