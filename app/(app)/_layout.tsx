import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/application/context";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
