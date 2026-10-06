import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="muted">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h2>No orders yet</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">All Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-head">
            <div>
              <span className="muted">
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <br />
              <small className="muted">
                {order.user?.name} ({order.user?.email})
              </small>
            </div>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="order-items">
            {order.products.map((p, idx) => (
              <div key={idx} className="order-item">
                <img src={p.image} alt={p.name} />
                <span>
                  {p.name} × {p.quantity}
                </span>
                <span className="price">
                  ${(p.price * p.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-foot">
            <span className="muted">
              Ships to: {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.country}
            </span>
            <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
