import { useEffect, useState } from "react";
import api from "../api/client";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: Category;
  image: string;
  is_available: boolean;
}

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/products/").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (productId: number) => {
    try {
      await api.post("/cart/", { product_id: productId });
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Please login first.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (

    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200">
  <h1 className="text-xl font-bold text-slate-800">DamiEx Shop</h1>
  <div className="flex gap-4">
    <a href="/cart" className="text-teal-600 font-semibold hover:underline">
      Cart
    </a>
    <a href="/login" className="text-slate-600 font-semibold hover:underline">
      Login
    </a>
  </div>
</nav>
      {message && (
        <div className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg">
          {message}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200
                       hover:shadow-md transition p-4 flex flex-col"
          >
            <img src={p.image} alt={p.name} className="rounded-lg h-40 object-cover" />
            <h3 className="font-semibold text-slate-800 mt-3">{p.name}</h3>
            <p className="text-teal-600 font-bold mt-1">${p.price}</p>
            <button
              onClick={() => addToCart(p.id)}
              className="mt-3 bg-teal-600 text-white rounded-lg py-2
                         hover:bg-teal-700 transition disabled:bg-slate-300"
              disabled={!p.is_available}
            >
              {p.is_available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}