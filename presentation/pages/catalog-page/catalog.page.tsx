import React from "react";
import { BookCatalogView } from "./components";
import { useCatalogLogic } from "./hooks";

export const CatalogPage = () => {
  const { books, handleBookPress, handleLogout } = useCatalogLogic();

  return (
    <BookCatalogView
      books={books}
      onBookPress={handleBookPress}
      onLogout={handleLogout}
    />
  );
};
