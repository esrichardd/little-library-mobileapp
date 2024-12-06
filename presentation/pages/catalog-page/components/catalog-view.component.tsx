import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { DetailedBook } from "@/domain/models";

interface BookCatalogViewProps {
  books: DetailedBook[];
  onBookPress: (id: string) => void;
  onLogout: () => void;
}

export const BookCatalogView: React.FC<BookCatalogViewProps> = ({
  books,
  onBookPress,
  onLogout,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const renderBookItem = ({ item }: { item: DetailedBook }) => (
    <TouchableOpacity
      onPress={() => onBookPress(item.id.toString())}
      style={styles.bookItem}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.bookDescription}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
        <Text style={styles.bookPages}>{item.pages.length} páginas</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <View
        style={[
          styles.headerBar,
          { backgroundColor: isDarkMode ? "#121212" : "#f5f5f5" },
        ]}
      >
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, isDarkMode && styles.headerDark]}>
        Catálogo de Libros
      </Text>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.bookList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilos idénticos a los del archivo original
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  headerDark: {
    color: "#ffffff",
  },
  bookList: {
    paddingHorizontal: 20,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  bookInfo: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  descriptionContainer: {
    width: "100%",
  },
  bookDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
    flexShrink: 1,
  },
  bookPages: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
