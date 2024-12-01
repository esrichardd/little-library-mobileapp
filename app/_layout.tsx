import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/auth.context";
import { Provider } from "react-redux";
import { store } from "@/services/store";

export default function Root() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </Provider>
  );
}
