import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useLocalStorage("authToken", null);
    const [userName, setUserName] = useLocalStorage("userName", null);
    const [userAvatar, setuserAvatar] = useLocalStorage("userAvatar", null);

    const login = (token, name, avatar) => {
        setAuthToken(token);
        setUserName(name);
        setuserAvatar(avatar)
    };

    const logout = () => {
        setAuthToken(null);
        setUserName(null);
        setuserAvatar(null)
    };

  const context = {
    authToken,
    login,
    logout
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}