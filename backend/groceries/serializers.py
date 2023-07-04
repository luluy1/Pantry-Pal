from rest_framework import serializers
from .models import Groceries

class GroceriesSerializer(serializers.ModelSerializer):
    ingredients = serializers.ListField(required=False)
    recipeURL = serializers.ListField(required=False)

    class Meta:
        model = Groceries
        fields = ('id', 'user', 'ingredients', 'recipeURL')
