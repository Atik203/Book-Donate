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
    genres = serializers.CharField(write_only=True)
    reward_point = serializers.IntegerField(write_only=True)
    pages = serializers.IntegerField(write_only=True)
    stock = serializers.IntegerField(write_only=True)
    donated_by = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all(), write_only=True, required=False)

    class Meta:
        model = Book
        fields = '__all__'

    def to_internal_value(self, data):
        genres_str = data.get('genres', '')
        genre_names = [name.strip() for name in genres_str.split(',')]
        genres = []
        for name in genre_names:
            try:
                genre = Genre.objects.get(name=name)
                print(genre.pk)
                genres.append(genre.pk)
            except Genre.DoesNotExist:
                raise serializers.ValidationError({"genres": f"Genre '{name}' does not exist."})

        data['reward_point'] = int(data.get('reward_point', 0))
        data['pages'] = int(data.get('pages', 0))
        data['stock'] = int(data.get('stock', 0))

        donated_by_id = data.get('donated_by')
        if donated_by_id is not None:
            try:
                donated_by_id = int(donated_by_id)
                donated_by = BookUser.objects.get(pk=donated_by_id)
                data['donated_by'] = donated_by.pk
            except (ValueError, BookUser.DoesNotExist):
                raise serializers.ValidationError("Invalid donated_by ID.")

        data['genre'] = genres

        return super().to_internal_value(data)

    def create(self, validated_data):
        genres = validated_data.pop('genre')
        book = super().create(validated_data)
        book.genre.set(genres)
        return book
        
    

    
class AddGenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ['name']

        def create(self, validated_data):
            name = validated_data['name']
            slug = name.lower().replace(' ', '-')
            genre, created = Genre.objects.get_or_create(name=name, defaults={'slug': slug})
            return genre

            
               