import React, { useState } from "react";
import styles from "./InventoryManagement.module.css";

const initialInventoryData = [
  {
    id: 1,
    image: "https://hips.hearstapps.com/hmg-prod/images/how-to-grill-salmon-recipe1-1655870645.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
    item: "Grilled Salmon",
    category: "Main Course",
    quantity: 15,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    image: "https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
    item: "Caesar Salad",
    category: "Starter",
    quantity: 25,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 3,
    image: "https://yeyfood.com/wp-content/uploads/2024/06/WEB1magine_chocolate_with_chocolate_frosting._slice_o_05cfb1f8-09ed-4851-aabe-7a4cf1518c99_0-720x720.jpg",
    item: "Chocolate Cake",
    category: "Dessert",
    quantity: 8,
    status: "Low Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 4,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUVMUpjh6NqRaaipc-W69AB-IpkeVGlqRE4irir8BXb3Y31jeBqLL3kZ9N412-5tfAYj7fLp_Ki8jkjO0Myn_MPvXSuYvf38Ll2f1TJB8qSOtRW6xfMOUEWHTXM3LM_ohn2dplVtQy26w/s1600/Beef+Steak+Recipes.jpg",
    item: "Beef Steak",
    category: "Main Course",
    quantity: 12,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 5,
    image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01-750x750.jpg",
    item: "Chicken Biryani",
    category: "Main Course",
    quantity: 0,
    status: "Out Of Stock",
    lastUpdated: "2 hours ago",
  },
];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(initialInventoryData);
  const [filterStatus, setFilterStatus] = useState("All Items");

  const handleQuantityChange = (id, change) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          let newStatus = "";

          if (newQuantity === 0) {
            newStatus = "Out Of Stock";
          } else if (newQuantity < 10) {
            newStatus = "Low Stock";
          } else {
            newStatus = "In Stock";
          }

          return {
            ...item,
            quantity: newQuantity,
            status: newStatus,
          };
        }
        return item;
      })
    );
  };


  const filteredInventory = inventory.filter((item) => {
    if (filterStatus === "All Items") return true;
    return item.status === filterStatus;
  });

  return (
    <div className={styles.inventorycontainer}>
      <div className={styles.inventoryheader}>
        <h2>Inventory Management</h2>
        { <button className={styles.exportBtn}>
          <span>
            <i className="fa-solid fa-download"></i>
          </span>{" "}
          Add Items
        </button> }
      </div>

      <div className={styles.searchNavBar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍 Search inventory..."
          />
          <select
            className={styles.allItemsdropdown}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Items</option>
            <option>Low Stock</option>
            <option>In Stock</option>
            <option>Out Of Stock</option>
          </select>
        </div>

        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>CATEGORY</th>
              <th>AVAILABLE QUANTITY</th>
              <th>STATUS</th>
              <th>LAST UPDATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.itemCell}>
                    <img src={item.image} alt={item.item} />
                    <span>{item.item}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>
                  {item.quantity}{" "}
                  
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${item.status === "Low Stock"
                      ? styles.lowstock
                      : item.status === "Out Of Stock"
                        ? styles.outofstock
                        : styles.instock
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.lastUpdated}</td>
                <td>
                  <button
                    className={styles.plus}
                    onClick={() => handleQuantityChange(item.id, +1)}
                  >
                    +
                  </button>
                  <button
                    className={styles.minus}
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
