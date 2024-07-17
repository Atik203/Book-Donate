from rest_framework import serializers

from user.models import BookUser
from user.serializers import BookUserSerializers

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


class AddBookSerializers(serializers.ModelSerializer):
    genre = serializers.CharField(write_only=True)
    donated_by = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all(), required=False)
    stock = serializers.IntegerField()
    pages = serializers.IntegerField()
    reward_point = serializers.IntegerField()

    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'genre', 'reward_point', 'pages', 'stock', 'donated_by', 'publisher', 'publication_date', 'isbn', 'image', 'condition']

    def create(self, validated_data):
        genre_str = validated_data.pop('genre')
        genre_names = [name.strip() for name in genre_str.split(',')]
        
        genres = []
        for name in genre_names:
            genre, created = Genre.objects.get_or_create(name=name)
            genres.append(genre)
        # Set donated_by to the current user if not provided
        if 'donated_by' not in validated_data:
            request = self.context.get('request')
            if request and hasattr(request, 'user'):
                validated_data['donated_by'] = request.user
        
        book = Book.objects.create(**validated_data)
        book.genre.set(genres)
        return book

    def validate_genre(self, value):
        genre_names = [name.strip() for name in value.split(',')]
        if not genre_names:
            raise serializers.ValidationError("Genre field cannot be empty.")
        
        for name in genre_names:
            if not Genre.objects.filter(name=name).exists():
                raise serializers.ValidationError(f"Genre '{name}' does not exist.")
        
        return value
              

class UpdateBookSerializers(serializers.ModelSerializer):
    genre = serializers.CharField(write_only=True, required=False)
    donated_by = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all(), required=False)
    stock = serializers.IntegerField(required=False)
    pages = serializers.IntegerField(required=False)
    reward_point = serializers.IntegerField(required=False)

    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'genre', 'reward_point', 'pages', 'stock', 'donated_by', 'publisher', 'publication_date', 'isbn', 'image', 'condition']

    def update(self, instance, validated_data):
        genre_str = validated_data.pop('genre', None)
        if genre_str:
            genre_names = [name.strip() for name in genre_str.split(',')]
            genres = []
            for name in genre_names:
                genre, created = Genre.objects.get_or_create(name=name)
                genres.append(genre)
            instance.genre.set(genres)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def validate_genre(self, value):
        genre_names = [name.strip() for name in value.split(',')]
        if not genre_names:
            raise serializers.ValidationError("Genre field cannot be empty.")
        
        for name in genre_names:
            if not Genre.objects.filter(name=name).exists():
                raise serializers.ValidationError(f"Genre '{name}' does not exist.")
        
        return value
    

    
class AddGenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ['name']

        def create(self, validated_data):
            name = validated_data['name']
            slug = name.lower().replace(' ', '-')
            genre, created = Genre.objects.get_or_create(name=name, defaults={'slug': slug})
            return genre



 


class PendingBookSerializers(serializers.ModelSerializer):
    genre = GenreSerializers(many=True)
    donated_by = BookUserSerializers()
    claimed_by = BookUserSerializers() 
    class Meta:
        model = Book
        fields = '__all__'

class ApprovedBookSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Book
        fields = ['id']

    def validate(self, data):
        book_id = data.get('id')
        if book_id is None:
            raise serializers.ValidationError('Book id is required')
        if not Book.objects.filter(pk=book_id).exists():
            raise serializers.ValidationError('Book does not exist')
        return data

    def save(self, **kwargs):
        book = Book.objects.get(pk=self.validated_data['id'])
        donated_by = book.donated_by
        book_user = BookUser.objects.get(pk=donated_by.id)  # Ensure we get the ID of the donated_by field
        book_user.reward_point += book.reward_point
        book.approve = 'Approved'
        book_user.save()
        book.save()
        return book 
    
class DeleteBookSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Book
        fields = ['id']

    def validate(self, data):
        book_id = data.get('id')
        if book_id is None:
            raise serializers.ValidationError('Book id is required')
        if not Book.objects.filter(pk=book_id).exists():
            raise serializers.ValidationError('Book does not exist')
        return data

    def save(self, **kwargs):
        book = Book.objects.get(pk=self.validated_data['id'])
        book.delete()
        return book    
            
               