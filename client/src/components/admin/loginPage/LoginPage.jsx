
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

  // Check for existing token on component mount
  useEffect(() => {
    const token = Cookies.get("your_jwt_secret_key");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        if (decoded.role === "admin") {
          navigate("/dashboard");
        } 
      // else if (decoded.role === "user") {
      //     navigate("/home");
      //   }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        userName,
        password,
      });

      const { token } = response.data;

      // Store token in both cookies and localStorage
      Cookies.set("your_jwt_secret_key", token);
      localStorage.setItem("token", token);

      // Decode the token to get role
      const decoded = jwtDecode(token);
      console.log("Decoded Token after login:", decoded);

      // Navigate based on role from token
      if (decoded.role === "admin") {
        navigate("/");
      }
       else if (decoded.role === "user") {
          navigate("/home");
      }
      else {
        setError("Invalid role in token");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.loginCard}>
        <div className={styles.leftSection}>
          <img
            src="/food-banner.png"
            alt="Food Items"
            className={styles.foodImage}
          />
          <h1 className={styles.logo}>food</h1>
        </div>
        <div className={styles.rightSection}>
          <h2>Welcome Back</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.errorMsg}>{error}</p>}
            <button type="submit" className={styles.signInButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};  

export default LoginPage;  