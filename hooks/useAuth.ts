"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  
  useEffect(() => {
    const storedUser = getCookie("enData");
    const isAuth = getCookie("isAuth");
    const authToken = getCookie("authToken");
    if (storedUser) setUser(storedUser);
    if (isAuth) setIsAuthenticated(isAuth);
    if (authToken) setToken(authToken);
  }, []);

  const setUserData = (data: any) => {
    setCookie("enData", data, 1);
    setUser(data);
  };

  const logout = () => {
    deleteCookie("enData");
    setUser(null);
  };

  return {
    user,
    token,
    isAuthenticated,
    setUserData,
    logout,
  };
};
