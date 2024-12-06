import { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { DetailedBook } from "@/domain/models";
import { useAuth } from "@/application/context";
import { useGetBooksQuery } from "@/infraestructure/repositories";

export const useCatalogLogic = () => {
  const { logout } = useAuth();
  const { data } = useGetBooksQuery();
  const [books, setBooks] = useState<DetailedBook[]>([]);

  const saveBooksToStorage = async (books: DetailedBook[]) => {
    try {
      await AsyncStorage.setItem("books", JSON.stringify(books));
    } catch (error) {
      console.error("Error saving books to storage", error);
    }
  };

  const loadBooksFromStorage = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("books");
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error("Error loading books from storage", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        if (data) {
          setBooks(data);
          saveBooksToStorage(data);
        }
      } else {
        loadBooksFromStorage();
      }
    };

    fetchData();
  }, [data]);

  const handleBookPress = (id: string) => {
    router.replace(`/book?id=${id}`);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    books,
    handleBookPress,
    handleLogout,
  };
};
