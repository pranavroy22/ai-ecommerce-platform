import { useEffect, useState } from "react";
import API from "../api";
import "./Products.css";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔥 NEW
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add", null, {
        params: {
          product_id: productId,
          quantity: 1,
        },
      });

      toast.success("Added to cart 🛒");
    } catch (err) {
      toast.error("Failed to add ❌");
    }
  };

  // 🔥 DYNAMIC CATEGORIES
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // 🔥 FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-container">
      <h1 className="title">Products</h1>

      {/* 🔥 SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 CATEGORY FILTERS */}
      <div className="category-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={
              selectedCategory === category
                ? "category-btn active-category"
                : "category-btn"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔥 PRODUCTS */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={
                product.image_url && product.image_url.startsWith("http")
                  ? product.image_url
                  : "https://via.placeholder.com/300"
              }
              alt={product.name}
              className="product-image"
            />

            <h3>{product.name}</h3>

            <p className="desc">{product.description}</p>

            <h4 className="price">₹ {product.price.toLocaleString()}</h4>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id);
              }}
              disabled={product.stock === 0}
              className="btn"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 PRODUCT MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            {/* IMAGE */}
            <img
              src={
                selectedProduct.image_url &&
                selectedProduct.image_url.startsWith("http")
                  ? selectedProduct.image_url
                  : "https://via.placeholder.com/500"
              }
              alt={selectedProduct.name}
              className="modal-image"
            />

            {/* INFO */}
            <div className="modal-info">
              <h2>{selectedProduct.name}</h2>

              <p className="modal-category">{selectedProduct.category}</p>

              <p className="modal-desc">{selectedProduct.description}</p>

              <h1 className="modal-price">
                ₹ {selectedProduct.price.toLocaleString()}
              </h1>

              <p className="modal-stock">
                {selectedProduct.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}
              </p>

              <button
                className="modal-btn"
                onClick={() => addToCart(selectedProduct.id)}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
