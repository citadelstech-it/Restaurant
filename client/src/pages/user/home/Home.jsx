// import React from "react";
// import homeStyle from "../home/Home.module.css";
// import homebg from "../../../assets/homeImages/homeBackground.avif";
// import starters from "../../../assets/homeImages/starters.jpeg";
// import mainCourse from "../../../assets/homeImages/mainCourse.avif";
// import beverages from "../../../assets/homeImages/beverages.jpg";
// import desserts from "../../../assets/homeImages/desserts.jpg";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Home = () => {
//   return (
//     <div>
//       <header>
//         <nav className={homeStyle.navbar}>
//           <h2 className={homeStyle.restoName}>Restaurant</h2>
//           {/* <button className={homeStyle.navButton}>Cart</button> */}
//         </nav>
//       </header>
//       <main>
//         <section className={homeStyle.section1}>
//           <div className={homeStyle.section1_div}>
//             <img src={homebg} alt="" />
//           </div>
//           <h1 className={homeStyle.heading}>Welcome</h1>
//         </section>

//         <section className={homeStyle.section2}>
//           <div className={homeStyle.menuBar}>
//             <div className={homeStyle.searchBar}>
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className={homeStyle.searchIcon}
//               />
//               <input
//                 type="text"
//                 placeholder="Search menu items"
//                 className={homeStyle.searchInput}
//               />
//             </div>
//             <button
//               className={`${homeStyle.menuButton1} ${homeStyle.menuButtons}`}
//             >
//               All
//             </button>
//             <button
//               className={`${homeStyle.menuButton2} ${homeStyle.menuButtons}`}
//             >
//               Starters
//             </button>
//             <button
//               className={`${homeStyle.menuButton3} ${homeStyle.menuButtons}`}
//             >
//               Main course
//             </button>
//             <button
//               className={`${homeStyle.menuButton4} ${homeStyle.menuButtons}`}
//             >
//               Desserts
//             </button>
//             <button
//               className={`${homeStyle.menuButton5} ${homeStyle.menuButtons}`}
//             >
//               Beverages
//             </button>
//             <button
//               className={`${homeStyle.menuButton6} ${homeStyle.menuButtons}`}
//             >
//               Specials
//             </button>
//           </div>
//         </section>
//         <section className={homeStyle.section3}>
//           <div className={homeStyle.cards}>
//             <img src={starters} alt="Starters" />
//             <h2>Starters</h2>
//           </div>
//           <div className={homeStyle.cards}>
//             <img src={beverages} alt="Beverages" />
//             <h2>Beverages</h2>
//           </div>
//           <div className={homeStyle.cards}>
//             <img src={mainCourse} alt="Main Course" />
//             <h2>Main Course</h2>
//           </div>
//           <div className={homeStyle.cards}>
//             <img src={desserts} alt="Desserts" />
//             <h2>Desserts</h2>
//           </div>
//         </section>
//         <div className={homeStyle.rotatingBackground1}></div>
//         <div className={homeStyle.rotatingBackground2}></div>
//         <div className={homeStyle.rotatingBackground3}></div>
//         <div className={homeStyle.rotatingBackground4}></div>
//         <div className={homeStyle.rotatingBackground5}></div>
//         <div className={homeStyle.rotatingBackground6}></div>
//         <div className={homeStyle.rotatingBackground7}></div>
//         <div className={homeStyle.rotatingBackground8}></div>
//         <div className={homeStyle.rotatingBackground9}></div>
//         <div className={homeStyle.rotatingBackground10}></div>
//       </main>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import homeStyle from "../home/Home.module.css";
import homebg from "../../../assets/homeImages/homeBackground.avif";
import starters from "../../../assets/homeImages/starters.jpeg";
import mainCourse from "../../../assets/homeImages/mainCourse.avif";
import beverages from "../../../assets/homeImages/beverages.jpg";
import desserts from "../../../assets/homeImages/desserts.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate("/pro", { state: { category } });
  };

  return (
    <div>
      <header>
        <nav className={homeStyle.navbar}>
          <h2 className={homeStyle.restoName}>Restaurant</h2>
        </nav>
      </header>
      <main>
        <section className={homeStyle.section1}>
          <div className={homeStyle.section1_div}>
            <img src={homebg} alt="" />
          </div>
          <h1 className={homeStyle.heading}>Welcome</h1>
        </section>

        <section className={homeStyle.section2}>
          <div className={homeStyle.menuBar}>
            <div className={homeStyle.searchBar}>
              <FontAwesomeIcon
                icon={faSearch}
                className={homeStyle.searchIcon}
              />
              <input
                type="text"
                placeholder="Search menu items"
                className={homeStyle.searchInput}
              />
            </div>
            <button
              className={`${homeStyle.menuButton1} ${homeStyle.menuButtons}`} onClick={()=>{navigate("/pro")}}> All</button>
            <button className={`${homeStyle.menuButton2} ${homeStyle.menuButtons}`} onClick={() => handleCardClick("Starters")}> Starters </button>
            <button className={`${homeStyle.menuButton3} ${homeStyle.menuButtons}`} onClick={() => handleCardClick("Main Course")}> Main course </button>
            <button className={`${homeStyle.menuButton4} ${homeStyle.menuButtons}`} onClick={() => handleCardClick("Desserts")}> Desserts </button>
            <button className={`${homeStyle.menuButton5} ${homeStyle.menuButtons}`} onClick={() => handleCardClick("Beverages")}>  Beverages </button>
            <button className={`${homeStyle.menuButton6} ${homeStyle.menuButtons}`} > Specials </button>
          </div>
        </section>
        <section className={homeStyle.section3}>
          <div
            className={homeStyle.cards}
            onClick={() => handleCardClick("Starters")}
          >
            <img src={starters} alt="Starters" />
            <h2>Starters</h2>
          </div>
          <div
            className={homeStyle.cards}
            onClick={() => handleCardClick("Beverages")}
          >
            <img src={beverages} alt="Beverages" />
            <h2>Beverages</h2>
          </div>
          <div
            className={homeStyle.cards}
            onClick={() => handleCardClick("Main Course")}
          >
            <img src={mainCourse} alt="Main Course" />
            <h2>Main Course</h2>
          </div>
          <div
            className={homeStyle.cards}
            onClick={() => handleCardClick("Desserts")}
          >
            <img src={desserts} alt="Desserts" />
            <h2>Desserts</h2>
          </div>
        </section>
        <div className={homeStyle.rotatingBackground1}></div>
        <div className={homeStyle.rotatingBackground2}></div>
        <div className={homeStyle.rotatingBackground3}></div>
        <div className={homeStyle.rotatingBackground4}></div>
        <div className={homeStyle.rotatingBackground5}></div>
        <div className={homeStyle.rotatingBackground6}></div>
        <div className={homeStyle.rotatingBackground7}></div>
        <div className={homeStyle.rotatingBackground8}></div>
        <div className={homeStyle.rotatingBackground9}></div>
        <div className={homeStyle.rotatingBackground10}></div>
      </main>
    </div>
  );
};

export default Home;
