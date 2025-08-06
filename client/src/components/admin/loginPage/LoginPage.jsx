import React, { useState } from 'react';
import styles from '../loginPage/loginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock login functionality
    console.log('Email:', email);
    console.log('Password:', password);
    setError('');
    alert('Login Successful (Mock)');
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.loginCard}>
        <div className={styles.leftSection}>
          <img src="/food-banner.png" alt="Food Items" className={styles.foodImage} />
          <h1 className={styles.logo}>food</h1>
        </div>
        <div className={styles.rightSection}>
          <h2>Welcome Back</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.errorMsg}>{error}</p>}
            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className={styles.signInButton}>Sign in</button>
          </form>
          <div className={styles.registerText}>
            Don’t have an account? <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
