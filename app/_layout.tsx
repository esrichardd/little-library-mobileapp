import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/application/store";
import { AuthProvider } from "@/application/context";

export default function Root() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </Provider>
  );
}
