// // components/AdminRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const AdminRoute = ({ children }) => {
//   const token = Cookies.get("your_jwt_token_name");

//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   try {
//     const user = jwtDecode(token);
//     if (user.role === "admin") {
//       return <Navigate to="/dashboard" replace />;
//     }
//   } catch (error) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default AdminRoute;


// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = Cookies.get("your_jwt_token_name");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);
    if (user.role !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
