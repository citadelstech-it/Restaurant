import React, { useState, useEffect } from "react";
import axios from "axios";
import productsStyle from "../products/Products.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const ItemCard = ({ item, onAddToCart }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < item.stock) setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    onAddToCart(count);
  };

  return (
    <div className={productsStyle.item_card}>
      <img
        src={item.image}
        alt={item.name}
        className={productsStyle.food_image}
      />
      <div className={productsStyle.stock_badge}>{item.stock} left</div>
      <h3>{item.name}</h3>
      <p className={productsStyle.description}>{item.description}</p>
      <div className={productsStyle.priceDiv}>
        <p className={productsStyle.price}>₹{item.price.toFixed(2)}</p>
        <div className={productsStyle.quantity_controls}>
          <button onClick={decrement}>−</button>
          <span className={productsStyle.products_span}>{count}</span>
          <button onClick={increment}>+</button>
        </div>
      </div>
      <button className={productsStyle.cart_button} onClick={handleAddToCart}>
        🛒 Add to Cart
      </button>
    </div>
  );
};

const Category = ({ title, items, onAddToCart }) => (
  <div className={productsStyle.category}>
    <h2>{title}</h2>
    <div className={productsStyle.item_grid}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  </div>
);

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.category || "All";

  const [productsByCategory, setProductsByCategory] = useState({});
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Decode JWT and set user_id
    const token = Cookies.get("your_jwt_secret_key");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id); // Adjust key if your JWT structure differs
    }

    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        let filteredItems = res.data.items || [];

        if (selectedCategory !== "All") {
          filteredItems = filteredItems.filter(
            (item) => item.Category?.name === selectedCategory
          );
        }

        const grouped = {};
        const initialQuantities = {};

        filteredItems.forEach((item) => {
          const categoryName = item.Category?.name || "Others";
          if (!grouped[categoryName]) grouped[categoryName] = [];
          grouped[categoryName].push(item);

          initialQuantities[item.id] = 1;
        });

        setProductsByCategory(grouped);
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, [selectedCategory]);

  const handleIncrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1,
    }));
  };

  const handleAddToCart = async (itemId) => {
    try {
      if (!userId) {
        alert("Please login to add items to cart");
        return;
      }

      const quantity = quantities[itemId];
      const payload = {
        user_id: userId,
        item_id: itemId,
        quantity,
      };

      const res = await axios.post("http://localhost:5000/api/cart", payload);

      if (res.status === 200) {
        setCartCount((prev) => prev + quantity);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className={productsStyle.products_page}>
      <nav className={productsStyle.nav}>
        <button className={productsStyle.nav_button} onClick={goHome}>
          Home
        </button>
        <button className={productsStyle.nav_button} onClick={goToCart}>
          <FontAwesomeIcon icon={faCartShopping} /> View Cart ({cartCount})
        </button>
      </nav>

      {Object.keys(productsByCategory).length === 0 && (
        <p className={productsStyle.no_items}>No items found.</p>
      )}

      {Object.entries(productsByCategory).map(([category, items]) => (
        <div key={category}>
          <h2 className={productsStyle.category_heading}>{category}</h2>
          <div className={productsStyle.products_grid}>
            {items.map((item) => (
              <div key={item.id} className={productsStyle.product_card}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={productsStyle.image}
                />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Stock: {item.inStock}</p>

                <div className={productsStyle.quantity_controls}>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{quantities[item.id]}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>

                <button
                  className={productsStyle.add_to_cart}
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
