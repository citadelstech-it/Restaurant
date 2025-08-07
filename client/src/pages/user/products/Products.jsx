// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import productsStyle from "../products//Products.module.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// const Products = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const category = location.state?.category || "All";

//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [cartCount, setCartCount] = useState(0);

//   const token = Cookies.get("your_jwt_secret_key");
//   const user_id = jwtDecode(token)?.id;

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/items").then((res) => {
//       let filtered = res.data.items || [];
//       if (category !== "All") filtered = filtered.filter(item => item.Category?.name === category);
//       setProducts(filtered);

//       const q = {};
//       filtered.forEach((item) => (q[item.id] = 1));
//       setQuantities(q);
//     });
//   }, [category]);

//   const handleAddToCart = async (itemId) => {
//     const quantity = quantities[itemId];
//     await axios.post("http://localhost:5000/api/cart", { user_id, item_id: itemId, quantity });
//     setCartCount((prev) => prev + quantity);
//   };

//   return (
//     <div className={productsStyle.products_page}>
//       <nav className={productsStyle.nav}>
//         <button onClick={() => navigate("/home")}>Home</button>
//         <button onClick={() => navigate("/cart")}>
//           <FontAwesomeIcon icon={faCartShopping} /> Cart ({cartCount})
//         </button>
//       </nav>

//       <div className={productsStyle.products_grid}>
//         {products.map((item) => (
//           <div key={item.id} className={productsStyle.product_card}>
//             <img src={item.imageUrl} alt={item.name} />
//             <h3>{item.name}</h3>
//             <p>₹{item.price} | Stock: {item.inStock}</p>
//             <div>
//               <button onClick={() => setQuantities((q) => ({ ...q, [item.id]: Math.max(1, q[item.id] - 1) }))}>-</button>
//               <span>{quantities[item.id]}</span>
//               <button onClick={() => setQuantities((q) => ({ ...q, [item.id]: q[item.id] + 1 }))}>+</button>
//             </div>
//             <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import axios from "axios";
import productsStyle from "../products/Products.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.category || "All";

  const [productsByCategory, setProductsByCategory] = useState({});
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);

  const token = Cookies.get("your_jwt_secret_key");
  const user_id = jwtDecode(token)?.id;

  useEffect(() => {
    axios.get("http://localhost:5000/api/items").then((res) => {
      const items = res.data.items || [];

      // Filter items if a specific category is selected
      const filtered = selectedCategory === "All"
        ? items
        : items.filter((item) => item.Category?.name === selectedCategory);

      // Group by category
      const grouped = {};
      const q = {};

      filtered.forEach((item) => {
        const cat = item.Category?.name || "Uncategorized";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
        q[item.id] = 1;
      });

      setProductsByCategory(grouped);
      setQuantities(q);
    });
  }, [selectedCategory]);

  const handleAddToCart = async (itemId) => {
    const quantity = quantities[itemId];
    await axios.post("http://localhost:5000/api/cart", { user_id, item_id: itemId, quantity });
    setCartCount((prev) => prev + quantity);
  };

  return (
    <div className={productsStyle.products_page}>
      <nav className={productsStyle.nav}>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faCartShopping} /> Cart ({cartCount})
        </button>
      </nav>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className={productsStyle.category_section}>
          <h2 className={productsStyle.category_heading}>{category}</h2>
          <div className={productsStyle.products_grid}>
            {productsByCategory[category].map((item) => (
              <div key={item.id} className={productsStyle.product_card}>
                <img src={item.imageUrl} alt={item.name} />
                <h3>{item.name}</h3>
                <p>₹{item.price} | Stock: {item.inStock}</p>
                <div>
                  <button onClick={() =>
                    setQuantities((q) => ({
                      ...q,
                      [item.id]: Math.max(1, q[item.id] - 1),
                    }))
                  }>
                    -
                  </button>
                  <span>{quantities[item.id]}</span>
                  <button onClick={() =>
                    setQuantities((q) => ({
                      ...q,
                      [item.id]: q[item.id] + 1,
                    }))
                  }>
                    +
                  </button>
                </div>
                <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
