from .models import *
from rest_framework import serializers

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= '__all__'
        
        
class CardsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Cards
        fields='__all__'