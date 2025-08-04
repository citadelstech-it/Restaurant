import React, { useState } from "react";
import styles from "../menuManagement/MenuManagement.module.css";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Chicken Biryani",
      price: 120.99,
      category: "Main Course",
      calories: 550,
      stock: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRztWXXObqjWb0qyL6XBSkTVvb12mhc2jpj0w&s",
    },
    {
      id: 2,
      title: "Ice Creams",
      price: 80.99,
      category: "Dessert",
      calories: 300,
      stock: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQreY2UUgmbDiJ9X_qi1aXVyxPTSvGMdG96-A&s",
    },
    {
      id: 3,
      title: "Kabab",
      price: 150.99,
      category: "Starters",
      calories: 400,
      stock: 15,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKNb3u6rc3q4eCMPSsO1TXvrzOEHQ5-uEglQ&s",
    },
    {
      id: 4,
      title: "Paneer Tikka",
      price: 140.99,
      category: "Starters",
      calories: 450,
      stock: 12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn-stvhbpCIHk4_aVCxb0aekKPAJPLWM2FeA&s",
    },
    {
      id: 5,
      title: "Veg Biryani",
      price: 110.49,
      category: "Main Course",
      calories: 500,
      stock: 50,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIvMid3LkGsS_HbMOulY1xL-t4Usg1-FuLQ&s",
    },
    {
      id: 6,
      title: "Gulab Jamun",
      price: 80.49,
      category: "Dessert",
      calories: 250,
      stock: 25,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6EBUY5C0y1nphrkMYyqfTTv3y1EwqH1yBwA&s",
    },
    {
      id: 7,
      title: "Naan Bread",
      price: 100.49,
      category: "Sides",
      calories: 200,
      stock: 30,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0WuY-MmfoqjuY-BbUFXjE-5n0u61JUpSKbg&s",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    calories: "",
  });

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateItem = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === currentItem.id
            ? {
                ...newItem,
                id: currentItem.id,
                price: parseFloat(newItem.price),
                stock: parseInt(newItem.stock),
                calories: parseInt(newItem.calories),
              }
            : item
        )
      );
    } else {
      const item = {
        id: menuItems.length + 1,
        ...newItem,
        price: parseFloat(newItem.price),
        stock: parseInt(newItem.stock),
        calories: parseInt(newItem.calories),
      };
      setMenuItems([...menuItems, item]);
    }
    setNewItem({
      title: "",
      price: "",
      category: "",
      image: "",
      stock: "",
      calories: "",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setCurrentItem(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterStatus === "All Categories" || item.category === filterStatus;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainNavBar}>
        <h1 className={styles.h1}>Menu Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          + Add New Items
        </button>
      </div>
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="🔍 Search menu Items.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBox}
        />
        <select
          className={styles.allItemsdropdown}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All Categories</option>
          <option>Starters</option>
          <option>Main Course</option>
          <option>Dessert</option>
          <option>Sides</option>
        </select>
      </div>

      <div className={styles.gridContainer}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.stockBadge}>{item.stock} in stock</div>
            <img src={item.image} alt={item.title} />
            <div className={styles.cardContent}>
              <div className={styles.cardTitlePrice}>
                <h3>{item.title}</h3>
                <span>₹ {item.price.toFixed(2)}</span>
              </div>
              <p>{item.category}</p>
              <div className={styles.grams}>
                <p>100 Grams</p>
                <p className={styles.calories}>{item.calories} kcal</p>
              </div>
              <div className={styles.cardButtons}>
                <button
                  onClick={() => handleEditItem(item)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEditMode ? "Edit Item" : "Add New Menu Item"}</h2>
            <form onSubmit={handleAddOrUpdateItem}>
              <input
                name="title"
                placeholder="Title"
                value={newItem.title}
                onChange={handleInputChange}
                required
              />
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price"
                value={newItem.price}
                onChange={handleInputChange}
                required
              />
              <input
                name="category"
                placeholder="Category"
                value={newItem.category}
                onChange={handleInputChange}
                required
              />
              <input
                name="image"
                placeholder="Image URL"
                value={newItem.image}
                onChange={handleInputChange}
                required
              />
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={newItem.stock}
                onChange={handleInputChange}
                required
              />
              <input
                name="calories"
                type="number"
                placeholder="Calories"
                value={newItem.calories}
                onChange={handleInputChange}
                required
              />
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.addItemButto}>
                  {isEditMode ? "Update" : "Add Item"}
                </button>
                <button
                  type="button"
                  className={styles.cancelItemButto}
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
