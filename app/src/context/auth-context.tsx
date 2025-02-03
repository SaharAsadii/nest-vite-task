import { UserType } from "@/types";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  setUserInfo: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: UserType;
  }) => void;
  logout: () => void;
  user: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    console.log(savedUser, "---savedUser---", { token });
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const setUserInfo = ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: UserType;
  }) => {
    // Implement your login logic here
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setUserInfo, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
