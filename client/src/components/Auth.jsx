import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        console.log("all the data is this", parsedUserData);
        console.log("the user data i want is this", parsedUserData.user);
        setCurrentUser(parsedUserData.user);
      } catch (error) {
        console.error("error parsing: ", error);
        Cookies.remove("user");
        setCurrentser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  console.log("line 28 says user is this", currentUser);

  const login = (userData) => {
    console.log(
      "im currently in the login and im setting user to this",
      userData
    );
    Cookies.set("user", JSON.stringify(userData));
    setCurrentUser(userData.user);
  };

  const logout = () => {
    Cookies.remove("user");
    setCurrentUser(null);
  };

  return (
    <Auth.Provider value={{ currentUser, login, logout }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
