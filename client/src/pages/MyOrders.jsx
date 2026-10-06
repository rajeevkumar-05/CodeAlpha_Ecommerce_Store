import { useEffect, useState } from "react";
import api from "../api/axios.js";

const statusClass = (status) => `status status-${status.toLowerCase()}`;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="muted">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h2>You have no orders yet</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-head">
            <span className="muted">
              Order #{order._id.slice(-6).toUpperCase()}
            </span>
            <span className={statusClass(order.status)}>{order.status}</span>
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
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
