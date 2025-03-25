import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const getToken = () => localStorage.getItem("token") || "";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken);
  
    // Save token in localStorage when user logs in
    useEffect(() => {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }, [token]);
  
    // Login function
    const login = (userData, authToken) => {
      setUser(userData);
      setToken(authToken);
    };
  
    // Logout function
    const logout = () => {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}