import { useEffect, useState } from "react";
import API from "../api";
import "./Cart.css";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  const removeItem = async (product_id) => {
    try {
      await API.delete(`/cart/remove/${product_id}`);

      toast.success("Item removed 🗑️");

      fetchCart();
    } catch {
      toast.error("Failed to remove ❌");
    }
  };

  const updateQuantity = async (product_id, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put("/cart/update", null, {
        params: { product_id, quantity },
      });

      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Update failed ❌");
    }
  };

  const checkout = async () => {
    try {
      const res = await API.post("/payment/create-order", {
        amount: cart.total_price,
      });

      const order = res.data;

      const options = {
        key: "rzp_test_SnYAGWBbo4sCDi",

        amount: order.amount,

        currency: order.currency,

        name: "MyShop",

        description: "Order Payment",

        order_id: order.id,

        handler: async function (response) {
          alert("Payment Successful 🎉");

          console.log(response);
        },

        prefill: {
          name: "Pranav",
          email: "test@example.com",
        },

        theme: {
          color: "#131921",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      console.error(err);

      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart 🛒</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 😢</h2>
        </div>
      ) : (
        <div className="cart-layout">
          {/* LEFT SIDE */}
          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-card" key={item.id}>
                {/* IMAGE */}
                <img
                  src={
                    item.image_url && item.image_url.startsWith("http")
                      ? item.image_url
                      : "https://via.placeholder.com/200"
                  }
                  alt={item.name}
                  className="cart-image"
                />

                {/* INFO */}
                <div className="cart-info">
                  <h2>{item.name}</h2>

                  <p className="cart-price">₹ {item.price.toLocaleString()}</p>

                  <p className="stock">In Stock ✅</p>

                  {/* QUANTITY */}
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="item-total">
                    Total: ₹ {item.total.toLocaleString()}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cart.items.length}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹ {cart.total_price.toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
