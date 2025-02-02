import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<any>(null);
  const client = useApolloClient();

  useEffect(() => {
    console.log(token, "---token---");
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    client.resetStore();
  };

  const handleSetToken = (token: string) => {
    console.log(token, "---token---", "oooo");
    localStorage.setItem("token", token);
    setToken(token);
  };

  return {
    token,
    setToken: handleSetToken,
    user,
    setUser,
    logout,
    isAuthenticated: !!token,
  };
};
