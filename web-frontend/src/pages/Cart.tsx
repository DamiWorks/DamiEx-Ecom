import { useEffect, useState } from "react";
import api from "../api/client";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

interface Cart {
  id: number;
  items: CartItem[];
  total_price: number;
}

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [message, setMessage] = useState("");

  const fetchCart = () => {
    api.get("/cart/").then((res) => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (itemId: number) => {
    try {
      await api.delete(`/cart/items/${itemId}/`);
      setMessage("Item removed.");
      setTimeout(() => setMessage(""), 2000);
      fetchCart();
    } catch (err) {
      setMessage("Failed to remove item.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (!cart) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-slate-500">Loading cart...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {message && (
        <div className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg">
          {message}
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg">Your cart is empty.</p>
          <a href="/" className="text-teal-600 font-semibold mt-2 inline-block">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-slate-200
                         rounded-xl p-4 mb-3 shadow-sm"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{item.product.name}</p>
                <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                <p className="text-teal-600 font-bold">₱{item.subtotal}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 font-semibold text-sm transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
            <p className="text-lg font-bold text-slate-800">Total</p>
            <p className="text-xl font-bold text-teal-600">₱{cart.total_price}</p>
          </div>

          <button
            className="w-full mt-4 bg-teal-600 text-white rounded-xl py-3
                       font-semibold hover:bg-teal-700 transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}