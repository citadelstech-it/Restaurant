import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClipboardList,
  faGauge,
  faRightFromBracket,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SideBar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectChange = (e) => {
    const selected = e.target.value;

    if (selected === "create") {
      // Clear previous tokens
      Cookies.remove("your_jwt_secret_key");
      localStorage.removeItem("your_jwt_secret_key");
      sessionStorage.setItem("login_as_user", "true");
      navigate("/user-login");
    } else if (selected === "reset") {
      navigate("/user-login");
    }
  };


  const handleLoginAsUser = () => {
    Cookies.remove("your_jwt_secret_key");
    localStorage.removeItem("your_jwt_secret_key");
    sessionStorage.setItem("login_as_user", "true");
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.remove("your_jwt_secret_key");
    localStorage.removeItem("your_jwt_secret_key");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header>
        <nav className={styles.navBar}>
          <div className={styles.nav_part1}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleSidebar}
              className={styles.menuIcon}
            />
            <h4>Restaurant Admin</h4>
          </div>
          <div className={styles.nav_part2}>
            <button onClick={handleLoginAsUser} className={styles.loginButton}>
              Login As User
            </button>
            <select name="" className={styles.selectBox} onClick={handleSelectChange}>
              <option value="choose"> Choose below </option>
              <option value="create">Create New User</option>
              <option value="reset">Reset Password</option>
            </select>
            <span className={styles.sidebar_span}>A</span>
            <div className={styles.nav_subPart}>
              <h5>Admin User</h5>
              <p>admin@gmail.com</p>
            </div>
            <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className={ styles.logout} />
          </div>
        </nav>
      </header>

      <div className={styles.main}>
        <aside
          className={`${styles.sidebar} ${
            !isSidebarOpen ? styles.sidebarCollapsed : ""
          }`}
        >
          <h6>
            <FontAwesomeIcon icon={faGauge} />{" "}
            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
          </h6>
          <h6>
            <FontAwesomeIcon icon={faUtensils} />{" "}
            <span onClick={() => navigate("/menu")}>Menu Management</span>
          </h6>
          <h6>
            <FontAwesomeIcon icon={faUsers} />{" "}
            <span onClick={() => navigate("/inventory-management")}>
              Inventory
            </span>
          </h6>
          <h6>
            <FontAwesomeIcon icon={faClipboardList} />{" "}
            <span onClick={() => navigate("/order")}>Orders</span>
          </h6>
        </aside>

        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default SideBar;
