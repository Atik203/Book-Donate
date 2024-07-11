from rest_framework import serializers

from .models import Book, Genre


class GenreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
        
class BookSerializers(serializers.ModelSerializer):
    genre = GenreSerializers(many=True)
    class Meta:
        model = Book
        fields = '__all__'

class AuthorSerializers(serializers.Serializer):
    author = serializers.CharField(max_length=100)
    
    def to_representation(self, instance):
        return {'author': instance}