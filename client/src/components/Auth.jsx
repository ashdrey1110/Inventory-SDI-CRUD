import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("error parsing: ", error);
        Cookies.remove("user");
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => {
    Cookies.set("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <Auth.Provider value={{ user, login, logout }}>{children}</Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
