from django.conf import settings
from django.db import models
from apps.products.models import Product


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        PAID = "paid", "Paid"
        SHIPPED = "shipped", "Shipped"
        CANCELLED = "cancelled", "Cancelled"
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="orders")
    status = models.CharField(max_length=20, choices=Status.choices,
    default=Status.PENDING)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    """Snapshot of price at time of purchase — price_at_purchase
    protects historical orders even if the product price later changes."""
    order = models.ForeignKey(Order, related_name="items",
    on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)