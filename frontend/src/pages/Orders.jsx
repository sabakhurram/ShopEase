
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  CalendarDays,
  CreditCard,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/api";
import "./Orders.css";

const Orders = () => {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyOrders(token);
        setOrders(data.orders || []);
      } catch (error) {
        setError(error.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getStatusClass = (status) =>
    status?.toLowerCase() || "pending";

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-state">
          <RefreshCw size={28} className="orders-loading-icon" />
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-state">
          <Package size={36} />
          <h2>Unable to Load Orders</h2>
          <p>{error}</p>
          <button
            className="orders-retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <p className="orders-eyebrow">YOUR ACCOUNT</p>
            <h1>My Orders</h1>
            <p>Keep track of your purchases and deliveries.</p>
          </div>

          <Link to="/products" className="orders-shop-link">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="orders-count">
          <span>{orders.length} {orders.length === 1 ? "Order" : "Orders"}</span>
          <span>Your purchase history</span>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">
              <ShoppingBag size={34} />
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet. Explore our collection
              and discover something you'll love.
            </p>

            <Link to="/products" className="orders-shop-button">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order._id}>
                <div className="order-card-header">
                  <div>
                    <span className="order-label">ORDER NUMBER</span>
                    <strong className="order-number">
                      #{order._id}
                    </strong>
                  </div>

                  <span
                    className={`order-status ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="order-meta">
                  <div>
                    <CalendarDays size={16} />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>

                  <div>
                    <CreditCard size={16} />
                    <span>{order.paymentMethod}</span>
                  </div>

                  <div>
                    <Truck size={16} />
                    <span>{order.paymentStatus}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div
                      className="order-item"
                      key={`${order._id}-${index}`}
                    >
                      <div className="order-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <ShoppingBag size={22} />
                        )}
                      </div>

                      <div className="order-item-info">
                        <strong>{item.name}</strong>

                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}

                        <span>Quantity: {item.quantity}</span>
                      </div>

                      <strong className="order-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div>
                    <span>Total Amount</span>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>

                  <span className="order-payment-method">
                    Cash on Delivery
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
