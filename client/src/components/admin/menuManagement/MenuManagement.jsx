import React, { useState } from "react";
import styles from "../menuManagement/MenuManagement.module.css";
import Sidebar from "../adminSidebar/SideBar";
import axios from "axios";


const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([
    "Starters",
    "Main Course",
    "Dessert",
    "Sides",
    "Special",
  ]);
  const [filterStatus, setFilterStatus] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
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
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
  });

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
    resetModal();
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

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.title) {
      setCategories([...categories, newCategory.title]);
      resetCategoryModal();
    }
  };

  const resetModal = () => {
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

  const resetCategoryModal = () => {
    setNewCategory({
      title: "",
      description: "",
    });
    setIsCategoryModalOpen(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterStatus === "All Categories" || item.category === filterStatus;
    return matchesSearch && matchesCategory;
  });
 const handleCategory = async (e) =>{
  e.preventDefault();
   try{
    const responce = await axios.post("http://localhost:5000/api/categories",{
      name:newCategory.title,
      description:newCategory.description  
  });
  console.log(responce,"from post category");
  if(responce.status === 201){
    setNewCategory({
      title:"",
      description:""
    })
  }
   }catch(error){
    console.log(error,"error posting category");
    
   }
 }
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
            {categories.map((cat, idx) => (
              <option key={idx}>{cat}</option>
            ))}
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

        {/* Item Modal */}
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
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  required
                >
                  <option>Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx}>{cat}</option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!isEditMode && !newItem.image}
                />
                {newItem.image && (
                  <div className={styles.imagePreview}>
                    <img src={newItem.image} alt="Preview" />
                  </div>
                )}
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
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {isCategoryModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Add New Category</h2>
              <form onSubmit={handleCategory}>
                <input
                  name="title"
                  placeholder="Category Title"
                  value={newCategory.title}
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