import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = Cookies.get("your_jwt_secret_key");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return { token, user: decoded }; 
      } catch {
        return { token: null, user: null };
      }
    }
    return { token: null, user: null };
  });

  const login = (token) => {
    Cookies.set("your_jwt_secret_key", token);
    const decoded = jwtDecode(token);
    setAuth({ token, user: decoded });
  };

  const logout = () => {
    Cookies.remove("your_jwt_secret_key");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
