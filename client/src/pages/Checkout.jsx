import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        products: items.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),
        shippingAddress: address,
      };
      await api.post("/orders", payload);
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h1>Shipping Details</h1>
        {error && <p className="error">{error}</p>}
        <label>Full Name</label>
        <input name="fullName" value={address.fullName} onChange={handleChange} required />
        <label>Address</label>
        <input name="address" value={address.address} onChange={handleChange} required />
        <label>City</label>
        <input name="city" value={address.city} onChange={handleChange} required />
        <label>Postal Code</label>
        <input name="postalCode" value={address.postalCode} onChange={handleChange} required />
        <label>Country</label>
        <input name="country" value={address.country} onChange={handleChange} required />
        <button className="btn btn-block" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <aside className="cart-summary">
        <h3>Order Summary</h3>
        {items.map((i) => (
          <div key={i._id} className="summary-row">
            <span>
              {i.name} × {i.quantity}
            </span>
            <span>${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="summary-row total">
          <span>Total</span>
          <span className="price">${totalPrice.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}
