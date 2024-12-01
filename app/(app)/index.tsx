import { useAuth } from "@/contexts/auth.context";
import { useGetBooksQuery } from "@/services/books.service";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const booksData = [
  {
    id: "1",
    title: "El Quijote",
    author: "Miguel de Cervantes",
    imageUrl: "https://example.com/quijote.jpg",
  },
  {
    id: "2",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    imageUrl: "https://example.com/cien-anos.jpg",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    imageUrl: "https://example.com/1984.jpg",
  },
  {
    id: "4",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    imageUrl: "https://example.com/principito.jpg",
  },
  {
    id: "5",
    title: "Rayuela",
    author: "Julio Cortázar",
    imageUrl: "https://example.com/rayuela.jpg",
  },
];

const BookCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(booksData);
  const colorScheme = useColorScheme();
  const { logout } = useAuth();
  const isDarkMode = colorScheme === "dark";
  const { data } = useGetBooksQuery();
  console.log(data);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredBooks = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(text.toLowerCase()) ||
        book.author.toLowerCase().includes(text.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleBookPress = (id: string) => {
    router.replace(`/book`);
  };

  const handleLogout = () => {
    logout();
    console.log("Cerrar sesión");
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleBookPress(item.id)}
      style={styles.bookItem}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
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
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, isDarkMode && styles.headerDark]}>
        Catálogo de Libros
      </Text>
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
        placeholder="Buscar libros..."
        placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInputDark: {
    borderColor: "#444",
    backgroundColor: "#333",
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
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "gray",
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

export default BookCatalog;
