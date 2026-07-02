import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}