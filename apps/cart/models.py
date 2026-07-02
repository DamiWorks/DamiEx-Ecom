from django.conf import settings
from django.db import models
from apps.products.models import Product
class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        """Behavior lives on the model, not scattered in views."""
        return sum(item.subtotal for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items",
    on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    class Meta:
        unique_together = ("cart", "product")

    @property
    def subtotal(self):
            return self.product.price * self.quantity