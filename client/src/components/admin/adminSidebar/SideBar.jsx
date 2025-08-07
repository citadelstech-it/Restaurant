// import React, { useState } from "react";
// import styles from "../../admin/adminSidebar/SideBar.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faBell,
//   faClipboardList,
//   faGauge,
//   faGear,
//   faGripLines,
//   faRightFromBracket,
//   faUsers,
//   faUtensils,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const SideBar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//    <div className={styles.container}>
//   <header>
//     <nav className={styles.navBar}>
//       <div className={styles.nav_part1}>
//         <FontAwesomeIcon
//           icon={faBars}
//           onClick={toggleSidebar}
//           className={styles.menuIcon}
//         />
//         <h4>Restaurant Admin</h4>
//       </div>
//       <div className={styles.nav_part2}>
//         <FontAwesomeIcon icon={faBell} />
//         <span className={styles.sidebar_span}>A</span>
//         <div className={styles.nav_subPart}>
//           <h5>Admin User</h5>
//           <p>admin@gmail.com</p>
//         </div>
//         <FontAwesomeIcon icon={faRightFromBracket} />
//       </div>
//     </nav>
//   </header>

//   <div className={styles.mainContentArea}>
//     <aside
//   className={`${styles.sidebar} ${
//     !isSidebarOpen ? styles.sidebarCollapsed : ""
//   }`}
// >
//   <h6><FontAwesomeIcon icon={faGauge} /> <span onClick={()=>{navigate("/dashboard")}}>Dashboard</span></h6>
//   <h6><FontAwesomeIcon icon={faUtensils} /> <span onClick={()=>{navigate("/menu")}}>Menu Management</span></h6>
//   <h6><FontAwesomeIcon icon={faUsers} /> <span onClick={()=>{navigate("/inventory-management")}}>Inventory</span></h6>
//   <h6><FontAwesomeIcon icon={faClipboardList} /> <span onClick={()=>{navigate("/order")}}>Orders</span></h6>
// </aside>
//   </div>
// </div>

//   );
// };

// export default SideBar;


// src/components/adminSidebar/SideBar.jsx
import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faClipboardList,
  faGauge,
  faGear,
  faRightFromBracket,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SideBar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

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
        <span className={styles.sidebar_span}>A</span>
        <div className={styles.nav_subPart}>
          <h5>Admin User</h5>
          <p>admin@gmail.com</p>
        </div>
        <div className={styles.nav_part2}>
          {/* <FontAwesomeIcon icon={faBell} /> */}
          <span className={styles.sidebar_span}>A</span>
          <div className={styles.nav_subPart}>
            <h5>Admin User</h5>
            <p>admin@gmail.com</p>
          </div>
          <FontAwesomeIcon icon={faRightFromBracket} className={styles.icons} onClick={()=>{navigate("/login")}}/>
        </div>
      </nav>

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
