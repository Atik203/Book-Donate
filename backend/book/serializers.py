from rest_framework import serializers

from user.models import BookUser

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



class ClaimedBookSerializers(serializers.ModelSerializer):
    claimed_by = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all())
    id = serializers.IntegerField()
    class Meta:
        model = Book
        fields = ['id', 'claimed_by']

    def validate(self, data):
        claimed_by = data.get('claimed_by')
        book_id = data.get('id')
      

        if claimed_by is None:
            raise serializers.ValidationError('User id is required')
        if book_id is None:
            raise serializers.ValidationError('Book id is required')
        if not Book.objects.filter(pk=book_id).exists():
            raise serializers.ValidationError('Book does not exist')
        return data

    def save(self, **kwargs):
        book = Book.objects.get(pk=self.validated_data['id'])
        book.claimed_by = self.validated_data['claimed_by']
        book.status = 'Claimed'
        user = BookUser.objects.get(pk=self.validated_data['claimed_by'].id)
        user.reward_point += book.reward_point
        user.save()
        book.save()
        return book
    
class UserClaimedBookSerializers(serializers.ModelSerializer):
    genre = GenreSerializers(many=True)
    class Meta:
        model = Book
        fields = '__all__'
        
class UserDonatedBookSerializers(serializers.ModelSerializer):
    genre = GenreSerializers(many=True)
    class Meta:
        model = Book
        fields = '__all__'            