import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAdmin }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">🛒 Pranav's Shop</h2>

      <div className="navbar-links">
        <Link to="/">Products</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/orders">Orders</Link>

        {/* 🔥 ADMIN LINK */}
        {isAdmin && <Link to="/admin">Admin</Link>}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
