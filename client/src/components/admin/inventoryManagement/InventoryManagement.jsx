import React, { useState } from "react";
import styles from "./InventoryManagement.module.css";
import SideBar from "../adminSidebar/SideBar";

const initialInventoryData = [
  {
    id: 1,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/how-to-grill-salmon-recipe1-1655870645.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
    item: "Grilled Salmon",
    category: "Main Course",
    quantity: 15,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    image:
      "https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
    item: "Caesar Salad",
    category: "Starter",
    quantity: 25,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 3,
    image:
      "https://yeyfood.com/wp-content/uploads/2024/06/WEB1magine_chocolate_with_chocolate_frosting._slice_o_05cfb1f8-09ed-4851-aabe-7a4cf1518c99_0-720x720.jpg",
    item: "Chocolate Cake",
    category: "Dessert",
    quantity: 8,
    status: "Low Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 4,
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUVMUpjh6NqRaaipc-W69AB-IpkeVGlqRE4irir8BXb3Y31jeBqLL3kZ9N412-5tfAYj7fLp_Ki8jkjO0Myn_MPvXSuYvf38Ll2f1TJB8qSOtRW6xfMOUEWHTXM3LM_ohn2dplVtQy26w/s1600/Beef+Steak+Recipes.jpg",
    item: "Beef Steak",
    category: "Main Course",
    quantity: 12,
    status: "In Stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: 5,
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01-750x750.jpg",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuantities, setInputQuantities] = useState(() =>
    Object.fromEntries(initialInventoryData.map((item) => [item.id, item.quantity]))
  );
  const [editModeId, setEditModeId] = useState(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleQuantityChange = (id, change) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + change),
              status:
                item.quantity + change === 0
                  ? "Out Of Stock"
                  : item.quantity + change < 10
                  ? "Low Stock"
                  : "In Stock",
              lastUpdated: formatTime(),
            }
          : item
      )
    );

    setInputQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesStatus =
      filterStatus === "All Items" || item.status === filterStatus;
    const matchesSearch = item.item
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <SideBar>
      <div className={styles.inventorycontainer}>
        <div className={styles.inventoryheader}>
          <h2>Inventory Management</h2>
        </div>

        <div className={styles.searchNavBar}>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="🔍 Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <td>{item.quantity}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        item.status === "Low Stock"
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
                      className={styles.minus}
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      −
                    </button>

                    {editModeId === item.id ? (
                      <input
                        type="number"
                        autoFocus
                        min="0"
                        value={inputQuantities[item.id] ?? ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          setInputQuantities((prev) => ({
                            ...prev,
                            [item.id]: isNaN(value) ? "" : value,
                          }));
                        }}
                        onBlur={() => {
                          const value = inputQuantities[item.id];
                          if (!isNaN(value) && value !== "") {
                            setInventory((prev) =>
                              prev.map((inv) =>
                                inv.id === item.id
                                  ? {
                                      ...inv,
                                      quantity: value,
                                      status:
                                        value === 0
                                          ? "Out Of Stock"
                                          : value < 10
                                          ? "Low Stock"
                                          : "In Stock",
                                      lastUpdated: formatTime(),
                                    }
                                  : inv
                              )
                            );
                          }
                          setEditModeId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.target.blur();
                        }}
                        className={styles.quantityInput}
                      />
                    ) : (
                      <button
                        className={styles.editIcon}
                        onClick={() => setEditModeId(item.id)}
                        title="Edit Quantity"
                      >
                        <span><i class="fa-solid fa-pencil"></i></span>
                      </button>
                    )}

                    <button
                      className={styles.plus}
                      onClick={() => handleQuantityChange(item.id, +1)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SideBar>
  );
};

export default InventoryManagement;
