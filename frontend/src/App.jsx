import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Chatbot from "./components/Chatbot";

import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (!token) {
    return <Login />;
  }

  return (
    <>
      <Navbar isAdmin={user?.role === "admin"} />

      <Routes>
        <Route path="/" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        {/* 🔥 REAL ADMIN PROTECTION */}
        {user?.role === "admin" && <Route path="/admin" element={<Admin />} />}
      </Routes>
      <Chatbot />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
