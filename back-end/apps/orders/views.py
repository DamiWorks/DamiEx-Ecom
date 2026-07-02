# orders/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import OrderService

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            order = OrderService.create_order_from_cart(
                user=request.user, cart=request.user.cart
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=400)

        return Response({"order_id": order.id, "status": order.status}, status=201)