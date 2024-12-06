import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/presentation/components/ThemedView";
import { useLoginLogic } from "./hooks";
import { LoginView } from "./components";

export const LoginPage = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    loading,
    error,
  } = useLoginLogic();

  return (
    <ThemedView style={styles.container}>
      <LoginView
        email={email}
        setEmail={handleEmailChange}
        password={password}
        setPassword={handlePasswordChange}
        onLogin={handleSubmit}
        error={error}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
