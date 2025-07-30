import React from "react";
import homeStyle from "../home/Home.module.css";
import homebg from "../../../assets/homeImages/homeBackground.avif";
import starters from "../../../assets/homeImages/starters.jpeg";
import mainCourse from "../../../assets/homeImages/mainCourse.avif";
import beverages from "../../../assets/homeImages/beverages.jpg";
import desserts from "../../../assets/homeImages/desserts.jpg";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
  return (
    <div>
      <header>
        <nav className={homeStyle.navbar}>
          <h2 className={homeStyle.restoName}>Restaurant</h2>
          <button className={homeStyle.navButton}>Cart</button>
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
            <div>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search menu items" />
            </div>
            <button
              className={`${homeStyle.menuButton1} ${homeStyle.menuButtons}`}
            >
              All
            </button>
            <button
              className={`${homeStyle.menuButton2} ${homeStyle.menuButtons}`}
            >
              Starters
            </button>
            <button
              className={`${homeStyle.menuButton3} ${homeStyle.menuButtons}`}
            >
              Main course
            </button>
            <button
              className={`${homeStyle.menuButton4} ${homeStyle.menuButtons}`}
            >
              Desserts
            </button>
            <button
              className={`${homeStyle.menuButton5} ${homeStyle.menuButtons}`}
            >
              Beverages
            </button>
            <button
              className={`${homeStyle.menuButton6} ${homeStyle.menuButtons}`}
            >
              Specials
            </button>
          </div>
        </section>
        <section className={homeStyle.section3}>
          <div className={homeStyle.cards}>
            <img src={starters} alt="" />
            <h2>Starters</h2>
          </div>
          <div className={homeStyle.cards}>
            <img src={mainCourse} alt="" />
            <h2>Main Course</h2>
          </div>
          <div className={homeStyle.cards}>
            <img src={beverages} alt="" />
            <h2>Beverages</h2>
          </div>
          <div className={homeStyle.cards}>
            <img src={desserts} alt="" />
            <h2>Desserts</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
