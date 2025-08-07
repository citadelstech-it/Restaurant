import React, { useEffect, useState } from "react";
import styles from "../loginPage/loginPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("your_jwt_secret_key");
    if (token) {
      try {
        const decoded = jwtDecode(token);
    console.log(decoded)

        if (decoded.role === "admin") {
          navigate("/dashboard")
        }
        // } else { navigate("/home"); }
          
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) return setError("Enter all fields");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { userName, password });
      const { token } = res.data;
      Cookies.set("your_jwt_secret_key", token);
      localStorage.setItem("your_jwt_secret_key", token);

      const decoded = jwtDecode(token);
      console.log(decoded)
      decoded.role === "admin" ? navigate("/dashboard") : navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.loginCard}>
        <div className={styles.leftSection}>
          <img src="/food-banner.png" alt="Food" className={styles.foodImage} />
          <h1 className={styles.logo}>food</h1>
        </div>
        <div className={styles.rightSection}>
          <h2>Welcome Back</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className={styles.errorMsg}>{error}</p>}
            <button className={styles.signInButton} type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
