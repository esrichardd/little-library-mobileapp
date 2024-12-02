import { DetailedBook, useGetBookByIdQuery } from "@/services/books.service";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const BookReader = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookData, setBookData] = useState<DetailedBook | undefined>(undefined);
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetBookByIdQuery(Number(id));

  useEffect(() => {
    const fetchBookData = async () => {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        setBookData(data);
        if (data) {
          await AsyncStorage.setItem(`book_${id}`, JSON.stringify(data));
        }
      } else {
        const storedBooks = await AsyncStorage.getItem("books");
        if (storedBooks) {
          const booksArray = JSON.parse(storedBooks);
          const foundBook = booksArray.find(
            (book: DetailedBook) => book.id === Number(id)
          );
          if (foundBook) {
            setBookData(foundBook);
          }
        }
      }
    };

    fetchBookData();
  }, [data, id]);

  const totalPages = bookData?.pages.length || 0;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBackButtonPress = () => {
    router.replace("/(app)");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackButtonPress}
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
            onPress={goToPreviousPage}
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
            onPress={goToNextPage}
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

export default BookReader;
