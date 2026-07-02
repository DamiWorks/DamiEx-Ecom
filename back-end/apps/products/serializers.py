from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    is_available = serializers.ReadOnlyField()
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "stock","category", "image", "is_available"]

    
