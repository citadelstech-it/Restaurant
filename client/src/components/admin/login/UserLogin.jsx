import React, { useState } from "react";
import axios from "axios";
import loginStyles from "../login/UserLogin.module.css";
import backgroundImage from "../../../assets/homeImages/homeBackground.avif"; 

const UserLogin = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setSuccess("Login Successful");
      console.log("Login success", response.data);
      // navigate("/");
    } catch (err) {
      console.error("Login error", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className={loginStyles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={loginStyles.glassCard}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className={loginStyles.error}>{error}</p>}
        {success && <p className={loginStyles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
