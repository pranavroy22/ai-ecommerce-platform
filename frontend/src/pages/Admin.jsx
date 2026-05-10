import { useEffect, useState } from "react";
import API from "../api";
import "./Admin.css";
import { toast } from "react-toastify";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    try {
      await API.post("/products", {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      });

      toast.success("Product Added ✅");

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image_url: "",
      });

      fetchProducts();
    } catch (err) {
      toast.error("Failed ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      toast.success("Deleted 🗑️");

      fetchProducts();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, null, {
        params: { status },
      });

      toast.success("Order Updated 🚚");

      fetchOrders();
    } catch (err) {
      toast.error("Update Failed ❌");
    }
  };
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard 👑</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>

          <p>
            ₹ {orders.reduce((acc, order) => acc + (order.total_price || 0), 0)}
          </p>
        </div>

        <div className="stat-card">
          <h3>Pending Orders</h3>

          <p>{orders.filter((o) => o.status === "pending").length}</p>
        </div>
      </div>

      {/* ADD PRODUCT */}
      <div className="admin-card">
        <h2>Add Product</h2>

        <div className="admin-form">
          <input
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
          />

          <input
            name="image_url"
            placeholder="Image URL"
            value={newProduct.image_url}
            onChange={handleChange}
          />

          <button onClick={addProduct}>Add Product</button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="admin-card">
        <h2>Manage Products</h2>

        <div className="admin-products">
          {products.map((product) => (
            <div className="admin-product-card" key={product.id}>
              <img src={product.image_url} alt={product.name} />

              <h3>{product.name}</h3>

              <p>₹ {product.price}</p>

              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div className="admin-card">
        <h2>All Orders</h2>

        {orders.map((order) => (
          <div className="order-box" key={order.id}>
            <h3>Order #{order.id}</h3>

            <p>
              Payment:
              <span className="payment-status">{order.payment_status}</span>
            </p>

            <div className="status-update">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              >
                <option value="pending">Pending</option>

                <option value="paid">Paid</option>

                <option value="shipped">Shipped</option>

                <option value="delivered">Delivered</option>

                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
