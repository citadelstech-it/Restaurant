import React, { useState, useEffect } from "react";
import styles from "../menuManagement/MenuManagement.module.css";
import Sidebar from "../adminSidebar/SideBar";
import axios from "axios";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    image: "",
    inStock: "",
    calories: "",
    grams: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const fetchMenuItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setMenuItems(res.data);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleCategoryInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description);
    formData.append("inStock", newItem.inStock);
    formData.append("categoryId", newItem.categoryId);
    formData.append("calories", newItem.calories);
    formData.append("grams", newItem.grams);
    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/items/${currentItem.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/items", formData);
      }
      fetchMenuItems();
      resetModal();
    } catch (error) {
      console.error("Error saving item", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleEditItem = (item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      description: item.description,
      categoryId: item.categoryId,
      image: item.image,
      inStock: item.inStock,
      calories: item.calories,
      grams: item.grams,
    });
    setCurrentItem(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/categories", newCategory);
      fetchCategories();
      resetCategoryModal();
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const resetModal = () => {
    setNewItem({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      image: "",
      inStock: "",
      calories: "",
      grams: "",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const resetCategoryModal = () => {
    setNewCategory({
      name: "",
      description: "",
    });
    setIsCategoryModalOpen(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterStatus === "All Categories" || item.categoryName === filterStatus;
    return matchesSearch && matchesCategory;
  });

  return (
    <Sidebar>
      <div className={styles.container}>
        <div className={styles.mainNavBar}>
          <h1>Menu Management</h1>
          <button
            className={styles.addCategoryButton}
            onClick={() => setIsCategoryModalOpen(true)}
          >
            + Add New Category
          </button>
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
            placeholder="🔍 Search menu items..."
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
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.gridContainer}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.stockBadge}>{item.inStock} in stock</div>
              <img src={item.image || item.imageUrl} alt={item.name} />
              <div className={styles.cardContent}>
                <div className={styles.cardTitlePrice}>
                  <h3>{item.name}</h3>
                  <span>₹ {item.price}</span>
                </div>
                <p>{item.categoryName}</p>
                <div className={styles.grams}>
                  <p>{item.grams || "100"} Grams</p>
                  <p className={styles.calories}>{item.calories || "0"} kcal</p>
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
                  name="name"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={handleInputChange}
                />
                <select
                  name="categoryId"
                  value={newItem.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  name="grams"
                  type="number"
                  placeholder="Grams"
                  value={newItem.grams}
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
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newItem.image && (
                  <div className={styles.imagePreview}>
                    <img src={newItem.image} alt="Preview" />
                  </div>
                )}
                <input
                  name="inStock"
                  type="number"
                  placeholder="Stock"
                  value={newItem.inStock}
                  onChange={handleInputChange}
                  required
                />
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.addItemButto}>
                    {isEditMode ? "Update Item" : "Add Item"}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelItemButto}
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isCategoryModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Add New Category</h2>
              <form onSubmit={handleAddCategory}>
                <input
                  name="name"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={handleCategoryInputChange}
                  required
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={newCategory.description}
                  onChange={handleCategoryInputChange}
                />
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.addItemButto}>
                    Add Category
                  </button>
                  <button
                    type="button"
                    className={styles.cancelItemButto}
                    onClick={resetCategoryModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default MenuManagement;
