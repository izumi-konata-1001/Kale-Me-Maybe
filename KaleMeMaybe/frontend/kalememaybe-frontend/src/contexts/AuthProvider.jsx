import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useLocalStorage("authToken", null);
    const [userName, setUserName] = useLocalStorage("userName", null);
    const [userAvatar, setuserAvatar] = useLocalStorage("userAvatar", null);
    const [userId, setUserId] = useLocalStorage("userId", null);

    const updateUser = (name, avatar) => {
        setUserName(name);
        setuserAvatar(avatar);
    }

    const login = (token, name, avatar,id) => {
        setAuthToken(token);
        setUserName(name);
        setuserAvatar(avatar);
        setUserId(id);
    };

    const logout = () => {
        setAuthToken(null);
        setUserName(null);
        setuserAvatar(null)
        setUserId(null);
    };

  const context = {
    authToken,
    userName,
    userAvatar,
    userId,
    updateUser,
    login,
    logout
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}