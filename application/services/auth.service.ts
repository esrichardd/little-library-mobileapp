import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/domain/models";
import { useLoginMutation } from "@/infraestructure/repositories";

export const useAuthService = () => {
  const [loginMutation] = useLoginMutation();

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await loginMutation({ email, password }).unwrap();
      await AsyncStorage.setItem("authorization-token", loggedInUser.token);

      return loggedInUser;
    } catch (error) {
      console.error("Login failed", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      throw error;
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("authorization-token");
  };

  return { login, logout };
};
