from rest_framework import serializers

from user.models import BookUser, BookUserGift
from user.serializers import BookUserSerializers

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
    book_user_id = serializers.IntegerField(write_only=True)
    gift_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = BookUserGift
        fields = ['book_user_id', 'gift_id']

    def create(self, validated_data):
        book_user_id = validated_data.pop('book_user_id')
        gift_id = validated_data.pop('gift_id')
        
        book_user = BookUser.objects.get(id=book_user_id)
        gift = Gift.objects.get(id=gift_id)
        
        point_cost = gift.point_cost
        book_user.reward_point -= point_cost
        gift.stock -= 1
        gift.save()
        book_user.save()
        
        book_user_gift = BookUserGift.objects.create(book_user=book_user, gift=gift, point_cost=point_cost)
        return book_user_gift

class GetSpecificUserGiftSerializer(serializers.ModelSerializer):
    book_user = BookUserSerializers()
    gift = GiftSerializer()
    class Meta:
        model = BookUserGift
        fields = '__all__'