import React, { useEffect, useState } from "react";
import axios from "axios";
import productsStyle from "./Products.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || "All";

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => {
        let filteredItems = res.data;
        if (category !== "All") {
          filteredItems = res.data.filter((item) => item.category === category);
        }
        setProducts(filteredItems);

        const initialQuantities = {};
        filteredItems.forEach((item) => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Error fetching products", err));
  }, [category]);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });

    setCartItems((prev) => {
      if (prev[id]) {
        const updatedQty = Math.max(1, (prev[id] || 1) + delta);
        return { ...prev, [id]: updatedQty };
      }
      return prev;
    });
  };

  const handleAddToCart = (item) => {
    const selectedQty = quantities[item.id] || 1;

    if (selectedQty > item.inStock) {
      alert("Cannot add more than available stock.");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [item.id]: selectedQty,
    }));
  };

  const cartCount = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  return (
    <>
      <nav className={productsStyle.navbar}>
        <h2 className={productsStyle.logo}>Restaurant</h2>
        <div className={productsStyle.navButtons}>
          <button onClick={() => navigate("/")} className={productsStyle.navBtn}>
            Home
          </button>
          <button onClick={() => navigate("/cart")} className={productsStyle.navBtn}>
            <FaCartShopping /> View Cart ({cartCount})
          </button>
        </div>
      </nav>

      <div className={productsStyle.productsContainer}>
        {products.map((item) => (
          <div key={item.id} className={productsStyle.card}>
            <div className={productsStyle.imageWrapper}>
              <img src={item.imageUrl} alt={item.name} className={productsStyle.image} />
              <span className={productsStyle.stockBadge}>
                {item.inStock > 0 ? `${item.inStock} left` : "Out of Stock"}
              </span>
            </div>
            <h3 className={productsStyle.title}>{item.name}</h3>
            <p className={productsStyle.description}>{item.description}</p>
            <p className={productsStyle.price}>₹{item.price}</p>

            <div className={productsStyle.controls}>
              <div className={productsStyle.qtyControl}>
                <button onClick={() => handleQtyChange(item.id, -1)}>-</button>
                <span>{quantities[item.id] || 1}</span>
                <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
              </div>
              <button
                className={productsStyle.addToCartBtn}
                onClick={() => handleAddToCart(item)}
                disabled={item.inStock === 0}
              >
                <FaCartShopping /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import productsStyle from "../products/Products.module.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

// const Products = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const category = location.state?.category || "All";

//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/items")
//       .then((res) => {
//         console.log("Fetched items:", res.data);
//         console.log("Selected category:", category);

//         let filteredItems = res.data;

//         if (category !== "All") {
//           filteredItems = res.data.filter(
//             (item) => item.Category?.name === category
//           );
//         }

//         setProducts(filteredItems);

//         const initialQuantities = {};
//         filteredItems.forEach((item) => {
//           initialQuantities[item.id] = 1;
//         });
//         setQuantities(initialQuantities);
//       })
//       .catch((err) => console.error("Error fetching items:", err));
//   }, [category]);

//   const handleIncrement = (itemId) => {
//     setQuantities((prev) => {
//       const newQty = { ...prev, [itemId]: prev[itemId] + 1 };
//       return newQty;
//     });
//   };

//   const handleDecrement = (itemId) => {
//     setQuantities((prev) => {
//       const newQty = {
//         ...prev,
//         [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1,
//       };
//       return newQty;
//     });
//   };

//   const handleAddToCart = async (itemId) => {
//     try {
//       const quantity = quantities[itemId];
//       const payload = {
//         user_id: 1, // Replace with dynamic user ID if available
//         item_id: itemId,
//         quantity,
//       };

//       const res = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         payload
//       );

//       if (res.status === 200) {
//         alert("Item added to cart!");
//         setCartCount((prev) => prev + quantity);
//       }
//     } catch (err) {
//       console.error("Failed to add to cart:", err);
//     }
//   };

//   const goToCart = () => {
//     navigate("/cart");
//   };

//   const goHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className={productsStyle.products_page}>
//       <nav className={productsStyle.nav}>
//         <button className={productsStyle.nav_button} onClick={goHome}>
//           Home
//         </button>
//         <button className={productsStyle.nav_button} onClick={goToCart}>
//           <FontAwesomeIcon icon={faCartShopping} /> View Cart ({cartCount})
//         </button>
//       </nav>

//       <div className={productsStyle.products_grid}>
//         {products.map((item) => (
//           <div key={item.id} className={productsStyle.product_card}>
//             <img
//               src={`http://localhost:5000/${item.image}`}
//               alt={item.name}
//               className={productsStyle.image}
//             />
//             <h3>{item.name}</h3>
//             <p>Price: ₹{item.price}</p>
//             <p>Stock: {item.inStock}</p>

//             <div className={productsStyle.quantity_controls}>
//               <button onClick={() => handleDecrement(item.id)}>-</button>
//               <span>{quantities[item.id]}</span>
//               <button onClick={() => handleIncrement(item.id)}>+</button>
//             </div>

//             <button
//               className={productsStyle.add_to_cart}
//               onClick={() => handleAddToCart(item.id)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
