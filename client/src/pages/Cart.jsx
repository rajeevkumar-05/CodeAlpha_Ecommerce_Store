import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(user ? "/checkout" : "/login", {
      state: user ? undefined : { from: { pathname: "/checkout" } },
    });
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <Link to={`/product/${item._id}`}>{item.name}</Link>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, Number(e.target.value))
                }
              />
              <span className="line-total">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total</span>
            <span className="price">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn btn-block" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
