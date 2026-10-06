import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          CodeAlpha<span>Store</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>

          {user ? (
            <>
              <Link to="/my-orders">My Orders</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <span className="greeting">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
