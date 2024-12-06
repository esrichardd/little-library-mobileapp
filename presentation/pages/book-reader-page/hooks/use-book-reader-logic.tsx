import { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { DetailedBook } from "@/domain/models";
import { useGetBookByIdQuery } from "@/infraestructure/repositories";

export const useBookReaderLogic = (id: string | string[]) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookData, setBookData] = useState<DetailedBook | undefined>(undefined);
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

  return {
    currentPage,
    bookData,
    isLoading,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    handleBackButtonPress,
  };
};
