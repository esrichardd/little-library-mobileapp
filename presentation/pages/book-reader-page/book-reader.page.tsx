import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BookReaderView } from "./components";
import { useBookReaderLogic } from "./hooks";

export const BookReaderPage = () => {
  const { id } = useLocalSearchParams();
  const {
    currentPage,
    bookData,
    isLoading,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    handleBackButtonPress,
  } = useBookReaderLogic(id);

  return (
    <BookReaderView
      currentPage={currentPage}
      bookData={bookData}
      totalPages={totalPages}
      isLoading={isLoading}
      onNextPage={goToNextPage}
      onPreviousPage={goToPreviousPage}
      onBackButtonPress={handleBackButtonPress}
    />
  );
};
