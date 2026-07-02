# orders/services.py
from django.db import transaction
from apps.orders.models import Order, OrderItem

class OrderService:
    """All the business rules for turning a cart into an order
    live here, in one place — not duplicated across views."""

    @staticmethod
    @transaction.atomic
    def create_order_from_cart(user, cart):
        if not cart.items.exists():
            raise ValueError("Cannot create an order from an empty cart.")

        order = Order.objects.create(user=user, total_price=cart.total_price)

        for item in cart.items.select_related("product"):
            if item.quantity > item.product.stock:
                raise ValueError(f"Not enough stock for {item.product.name}.")

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price_at_purchase=item.product.price,
            )

            item.product.stock -= item.quantity
            item.product.save()
        cart.items.all().delete()
        return order