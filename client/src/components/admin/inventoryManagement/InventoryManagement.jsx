import React, { useState, useEffect } from "react";
import styles from "./InventoryManagement.module.css";
import SideBar from "../adminSidebar/SideBar";
import axios from "axios";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuantities, setInputQuantities] = useState({});
  const [editModeId, setEditModeId] = useState(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Fetching initial inventory data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        const inventoryData = response.data.items || [];
        setInventory(inventoryData);
        const initialQuantities = inventoryData.reduce((acc, item) => {
          acc[item.id] = item.inStock;
          return acc;
        }, {});
        setInputQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  const getStatus = (inStock) => {
    if (inStock === 0) return "Out Of Stock";
    if (inStock > 0 && inStock < 10) return "Low Stock";
    return "In Stock";
  };

  // Handle quantity change (when + or - is clicked)
  const handleQuantityChange = (id, change) => {
    // Optimistic update for inventory
    const updatedInventory = inventory.map((item) =>
      item.id === id
        ? {
            ...item,
            inStock: Math.max(0, item.inStock + change),
            lastUpdated: formatTime(), // Update time immediately
          }
        : item
    );

    setInventory(updatedInventory);
    setInputQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));

    const updatedItem = updatedInventory.find((item) => item.id === id);

    // Send PUT request to update the backend with new quantity and lastUpdated time
    axios
      .put(`http://localhost:5000/api/items/${id}`, {
        inStock: updatedItem.inStock,
        lastUpdated: updatedItem.lastUpdated,
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
  };

  // Filter inventory based on search query and status
  const filteredInventory = inventory.filter((item) => {
    const matchesStatus =
      filterStatus === "All Items" || getStatus(item.inStock) === filterStatus;

    const matchesSearch =
      item.name && typeof item.name === "string"
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

    return matchesStatus && matchesSearch;
  });
  const convertToIST = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    });
  };

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
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="6">No items match your search criteria.</td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.itemCell}>
                        <img src={item.imageUrl} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.Category?.name || "No Category"}</td>
                    <td>{item.inStock}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          getStatus(item.inStock) === "Low Stock"
                            ? styles.lowstock
                            : getStatus(item.inStock) === "Out Of Stock"
                            ? styles.outofstock
                            : styles.instock
                        }`}
                      >
                        {getStatus(item.inStock)}
                      </span>
                    </td>
                    <td>{convertToIST(item.updatedAt)}</td>
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
                              handleQuantityChange(item.id, value - item.inStock);
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
                          <span>
                            <i className="fa-solid fa-pencil"></i>
                          </span>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SideBar>
  );
};

export default InventoryManagement;
