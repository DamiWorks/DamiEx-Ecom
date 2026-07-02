from rest_framework import viewsets, filters
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ReadOnlyModelViewSet automatically gives us list + retrieve
    endpoints — no need to hand-write GET /products/ and GET /products/1/."""
    queryset = Product.objects.in_stock().select_related("category")
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]
