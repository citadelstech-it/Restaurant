import React, { useState } from "react";
import styles from "../../admin/adminSidebar/SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faClipboardList,
  faGauge,
  faGear,
  faGripLines,
  faRightFromBracket,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <FontAwesomeIcon icon={faBell} />
        <span>A</span>
        <div className={styles.nav_subPart}>
          <h5>Admin User</h5>
          <p>admin@gmail.com</p>
        </div>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </nav>
  </header>

  <div className={styles.mainContentArea}>
    <aside
      className={`${styles.sidebar} ${
        !isSidebarOpen ? styles.sidebarCollapsed : ""
      }`}
    >
      <h6><FontAwesomeIcon icon={faGauge} /> Dashboard</h6>
      <h6><FontAwesomeIcon icon={faUtensils} /> Menu Management</h6>
      <h6><FontAwesomeIcon icon={faUsers} /> Inventory</h6>
      <h6><FontAwesomeIcon icon={faClipboardList} /> Orders</h6>
      <h6><FontAwesomeIcon icon={faGear} /> Admin Settings</h6>
    </aside>
  </div>
</div>

  );
};

export default SideBar;
