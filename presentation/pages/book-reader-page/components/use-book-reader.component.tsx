import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { DetailedBook } from "@/domain/models";

interface BookReaderViewProps {
  currentPage: number;
  bookData?: DetailedBook;
  totalPages: number;
  isLoading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onBackButtonPress: () => void;
}

export const BookReaderView: React.FC<BookReaderViewProps> = ({
  currentPage,
  bookData,
  totalPages,
  isLoading,
  onNextPage,
  onPreviousPage,
  onBackButtonPress,
}) => {
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackButtonPress}
        accessibilityLabel="Volver al catálogo"
      >
        <Text style={styles.backButtonText}>{"<- Volver al inicio"}</Text>
      </TouchableOpacity>
      <View style={styles.readerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{bookData?.title}</Text>
          <Text style={styles.author}>{bookData?.author}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.pageContent}>{bookData?.pages[currentPage]}</Text>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={onPreviousPage}
            style={[
              styles.navButton,
              currentPage === 0 && styles.navButtonDisabled,
            ]}
            disabled={currentPage === 0}
          >
            <Text
              style={[
                styles.navText,
                currentPage === 0 && styles.navTextDisabled,
              ]}
            >
              Anterior
            </Text>
          </TouchableOpacity>

          <Text style={styles.pageNumber}>
            Página {currentPage + 1} de {totalPages}
          </Text>

          <TouchableOpacity
            onPress={onNextPage}
            style={[
              styles.navButton,
              currentPage === totalPages - 1 && styles.navButtonDisabled,
            ]}
            disabled={currentPage === totalPages - 1}
          >
            <Text
              style={[
                styles.navText,
                currentPage === totalPages - 1 && styles.navTextDisabled,
              ]}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilos idénticos a los del archivo original
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  readerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "#666",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pageContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  navTextDisabled: {
    color: "#ccc",
  },
  pageNumber: {
    fontSize: 14,
    color: "#666",
  },
  backButton: {
    position: "absolute",
    top: 35,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
});
