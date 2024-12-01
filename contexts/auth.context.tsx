// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    if (email !== "admin@gmail.com" || password !== "admin") {
      throw new Error("Invalid credentials");
    }

    try {
      const response = {
        data: {
          token: "1234567890",
          user: { id: 1, name: "John Doe" },
        },
      };

      // Store user token and data
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.user)
      );

      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear stored data
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Check authentication on app start
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (token && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Authentication check failed", error);
    }
  };

  // Run check on provider mount
  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
