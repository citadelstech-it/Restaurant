import React, { useState, useEffect } from "react";
import { starters, mainCourse } from "../../../data/foodData";
import productsStyle from "../products/Products.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
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
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedCategory = state?.category || "All";

  const handleAddToCart = (quantity) => {
    setCartCount((prev) => prev + quantity);
  };

  const renderCategory = () => {
    switch (selectedCategory) {
      case "Starters":
        return (
          <Category
            title="Starters"
            items={starters}
            onAddToCart={handleAddToCart}
          />
        );
      case "Main Course":
        return (
          <Category
            title="Main Course"
            items={mainCourse}
            onAddToCart={handleAddToCart}
          />
        );
      case "Beverages":
        return (
          <Category
            title="Beverages"
            items={beverages}
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return (
          <>
            <Category
              title="Starters"
              items={starters}
              onAddToCart={handleAddToCart}
            />
            <Category
              title="Main Course"
              items={mainCourse}
              onAddToCart={handleAddToCart}
            />
            {/* <Category
              title="Beverages"
              items={beverages}
              onAddToCart={handleAddToCart}
            /> */}
          </>
        );
    }
  };

  return (
    <div>
      <nav className={productsStyle.nav}>
        <button
          className={productsStyle.homeButton}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          className={productsStyle.cart_nav}
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          Cart ({cartCount})
        </button>
      </nav>
      <div className={productsStyle.products_page}>{renderCategory()}</div>
      <div className={productsStyle.rotatingBackground1}></div>
      <div className={productsStyle.rotatingBackground2}></div>
      <div className={productsStyle.rotatingBackground3}></div>
      <div className={productsStyle.rotatingBackground4}></div>
      <div className={productsStyle.rotatingBackground5}></div>
      <div className={productsStyle.rotatingBackground6}></div>
      <div className={productsStyle.rotatingBackground7}></div>
      <div className={productsStyle.rotatingBackground8}></div>
      <div className={productsStyle.rotatingBackground9}></div>
      <div className={productsStyle.rotatingBackground10}></div>
    </div>
  );
};

export default Products;
