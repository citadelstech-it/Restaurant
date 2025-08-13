// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../../context/AuthContext";

// // export default function LoginPage() {
// //   const [userName, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/users/login", {
// //         userName,
// //         password,
// //       });

// //       login(res.data.token);

// //       const userRole = res.data.role || JSON.parse(atob(res.data.token.split(".")[1])).role;

// //       if (userRole === "admin") {
// //         navigate("/dashboard");
// //       } else if (userRole === "user") {
// //         navigate("/home");
// //       } else {
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       setError("Invalid username or password");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         placeholder="Username"
// //         value={userName}
// //         onChange={(e) => setUsername(e.target.value)}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <button type="submit">Login</button>
// //       {error && <p>{error}</p>}
// //     </form>
// //   );
// // }


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import styles from "./LoginPage.module.css"; // Importing your CSS

// export default function LoginPage() {
//   const [userName, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         userName,
//         password,
//       });

//       login(res.data.token);

//       const userRole =
//         res.data.role ||
//         JSON.parse(atob(res.data.token.split(".")[1])).role;

//       if (userRole === "admin") {
//         navigate("/dashboard");
//       } else if (userRole === "user") {
//         navigate("/home");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.overlay}></div>

//       <div className={styles.loginCard}>
//         {/* Left Section */}
//         <div className={styles.leftSection}>
//           <div className={styles.logo}>MyApp</div>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
//             alt="Food"
//             className={styles.foodImage}
//           />
//         </div>

//         {/* Right Section */}
//         <div className={styles.rightSection}>
//           <h2>Sign In</h2>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Username"
//               value={userName}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {error && <p className={styles.errorMsg}>{error}</p>}

//             <div className={styles.forgotPassword}>
//               <a href="/forgot-password">Forgot Password?</a>
//             </div>

//             <button type="submit" className={styles.signInButton}>
//               Login
//             </button>
//           </form>

        
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        userName,
        password,
      });
   
      login(res.data.token);

      const userRole =
        res.data.role ||
        JSON.parse(atob(res.data.token.split(".")[1])).role;

      if (userRole === "admin") {
        navigate("/dashboard");
      } else if (userRole === "user") {
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  // Forgot password handler
  // const handlePasswordReset = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:5000/api/users/${userId}/resetPassword`,
  //       {
  //         newPassword,
  //       }
  //     );
  //     setResetMsg(res.data.message || "Password updated successfully!");
  //     setNewPassword("");
  //   } catch (err) {
  //     setResetMsg("Failed to reset password. Please try again.");
  //   }
  // };

  const handlePasswordReset = async (e) => {
  e.preventDefault();
  try {
    // // Step 1: Get user ID from username
    // const userRes = await axios.get(
    //   `http://localhost:5000/api/users/getByUsername/${userName}`
    // );

    // if (!userRes.data || !userRes.data.id) {
    //   setResetMsg("User not found.");
    //   return;
    // }

    // const userId = userRes.data.id;

    // Step 2: PUT request to reset password
    const res = await axios.put(
      `http://localhost:5000/api/users/${id}/resetPassword`,
      { newPassword }
    );

    setResetMsg(res.data.message || "Password updated successfully!");
    setNewPassword("");
  } catch (err) {
    setResetMsg("Failed to reset password. Please try again.");
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>

      <div className={styles.loginCard}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.logo}>MyApp</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Food"
            className={styles.foodImage}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <h2>{showForgot ? "Reset Password" : "Sign In"}</h2>

          {!showForgot ? (
            // Login Form
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className={styles.errorMsg}>{error}</p>}

              <div className={styles.forgotPassword}>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff7043",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className={styles.signInButton}>
                Login
              </button>
            </form>
          ) : (
            // Forgot Password Form
            <form className={styles.form} onSubmit={handlePasswordReset}>
              <input
                type="text"
                placeholder="Enter your Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              {resetMsg && (
                <p
                  style={{
                    color: resetMsg.includes("success") ? "lightgreen" : "red",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {resetMsg}
                </p>
              )}

              <button type="submit" className={styles.signInButton}>
                Reset Password
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setResetMsg("");
                }}
                style={{
                  marginTop: "10px",
                  background: "none",
                  border: "1px solid #ff7043",
                  color: "#ff7043",
                  borderRadius: "6px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
