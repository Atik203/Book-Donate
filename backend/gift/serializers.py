from rest_framework import serializers

from user.models import BookUser, BookUserGift

from .models import Gift


class GiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'
        
class AddGiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'
        
    def create(self, validated_data):
        gift = Gift.objects.create(**validated_data)
        return gift

class DeleteGiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Gift
        fields =  ['id']
        
    def delete(self, validated_data):
        id = validated_data['id']
        gift = Gift.objects.get(id=id)
        gift.delete()
        return gift

class BuyGiftSerializer(serializers.ModelSerializer):
    book_user = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all())
    gift = serializers.PrimaryKeyRelatedField(queryset=Gift.objects.all())
    class Meta:
        model = BookUserGift
        fields = '__all__'
        
    def create(self, validated_data):
        book_user = validated_data['book_user']
        gift = validated_data['gift']
        point_cost = gift.point_cost
        book_user.reward_point -= point_cost
        book_user.save()
        book_user_gift = BookUserGift.objects.create(book_user=book_user, gift=gift, point_cost=point_cost)
        return book_user_gift

class GetSpecificUserGiftSerializer(serializers.ModelSerializer):
    book_user = serializers.PrimaryKeyRelatedField(queryset=BookUser.objects.all())
    class Meta:
        model = BookUserGift
        fields = '__all__'
        
    def get(self, validated_data):
        book_user = validated_data['book_user']
        book_user_gift = BookUserGift.objects.filter(book_user=book_user)
        return book_user_gift