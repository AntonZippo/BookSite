/* Favorite storrage service using local storage ,
 to save and change current favorit list */

const STORAGE_KEY = "bookCatalogFavorites";

/* Gets all books from local storage (favorites) */

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/* Add a book to storage*/

export function addFavorite(book) {
  const favorites = getFavorites();
  if (favorites.some((f) => f.key === book.key)) return;
  favorites.push(book);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/* Remove a book from storage by it;s key */

export function removeFavorite(bookKey) {
  const favorites = getFavorites().filter((f) => f.key !== bookKey);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/* Checks if a book in storage */

export function isFavorite(bookKey) {
  return getFavorites().some((f) => f.key === bookKey);
}
