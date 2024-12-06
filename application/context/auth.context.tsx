import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/domain/models";
import { useAuthService } from "@/application/services";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { login, logout } = useAuthService();

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("authorization-token");
      if (storedToken) {
        setToken(storedToken);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const setToken = async () => {
      if (token) {
        await AsyncStorage.setItem("authorization-token", token);
      } else {
        await AsyncStorage.removeItem("authorization-token");
      }
    };

    setToken();
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      setToken(loggedInUser.token);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
};
