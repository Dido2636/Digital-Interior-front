import React, { createContext, useContext, useState } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
  };
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <Authcontext.Provider
      value={{ currentUser, login, logout }}
    >{children}</Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useAuth doit être gérer avec un AuthProvider");
  }
  return context;
};
