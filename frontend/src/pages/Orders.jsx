import { useEffect, useState } from "react";
import API from "../api";
import "./Orders.css";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const payOrder = async (order_id) => {
    try {
      await API.post(`/orders/${order_id}/pay`);

      toast.success("Payment successful 💳");

      fetchOrders();
    } catch (err) {
      toast.error("Payment failed ❌");
    }
  };

  return (
    <div className="orders-container">
      <h1>Your Orders 📦</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet 😢</h2>
        </div>
      ) : (
        orders.map((order) => {
          // 🔥 TOTAL PRICE
          const total = order.items.reduce(
            (sum, item) => sum + (item.price || 0) * item.quantity,
            0,
          );

          return (
            <div className="order-card" key={order.order_id}>
              {/* TOP */}
              <div className="order-top">
                <div>
                  <div className="order-id">Order #{order.order_id}</div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="badge status-badge">{order.status}</span>

                  <span
                    className={
                      order.payment_status === "success"
                        ? "badge payment-success"
                        : "badge payment-pending"
                    }
                  >
                    {order.payment_status}
                  </span>
                </div>
              </div>

              {/* ITEMS */}
              <div className="items-container">
                {order.items.map((item, index) => (
                  <div className="item-card" key={index}>
                    <div className="item-name">
                      {item.name || `Product ${item.product_id}`}
                    </div>

                    <div className="item-qty">Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="order-total">
                Total: ₹ {total.toLocaleString()}
              </div>

              {/* PAY BUTTON */}
              {order.payment_status !== "success" && (
                <button
                  className="pay-btn"
                  onClick={() => payOrder(order.order_id)}
                >
                  Pay Now 💳
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;
