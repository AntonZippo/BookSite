/* Search form  component 
   Handles user input,API calls, and result rendering*/

import { searchBooks } from "../api/openLibrary.js";
import { createBookCard } from "./bookCard.js";
import { isFavorite } from "../services/favoriteStorage.js";
import { renderFavorites } from "./favoritesList.js";

const STATUS_EL = document.getElementById("search-status");
const RESULTS_GRID = document.getElementById("results-grid");
const SEARCH_FORM = document.getElementById("search-form");
const SEARCH_INPUT = document.getElementById("search-input");

const STATUS = {
  EMPTY: "Введите запрос",
  LOADING: "Loading...",
  ERROR_NETWORK: "Ошибка сети",
  ERROR_NOT_FOUND: "Ничего не найдено",
};

let lastResults = [];

function setStatus(text) {
  STATUS_EL.textContent = text;
  STATUS_EL.className = "search-status";
  if (text === STATUS.LOADING)
    STATUS_EL.classList.add("search-status--loading");
  if (text === STATUS.ERROR_NETWORK || text === STATUS.ERROR_NOT_FOUND) {
    STATUS_EL.classList.add("search-status--error");
  }
}

// function renderResults(books) {
//   lastResults = books;
//   RESULTS_GRID.innerHTML = "";
//   books.forEach((book) => {
//     const card = createBookCard(book, {
//       inFavorites: isFavorite(book.key),
//       onFavoriteChange: renderFavorites,
//     });
//     RESULTS_GRID.appendChild(card);
//   });
// }

function renderResults(books) {
  console.log("🎨 renderResults вызван с книгами:", books);
  console.log("📊 Количество книг:", books.length);

  lastResults = books;
  RESULTS_GRID.innerHTML = "";

  books.forEach((book, index) => {
    console.log(`📖 Книга ${index}:`, book);

    try {
      const inFav = isFavorite(book.key);
      console.log(`⭐ Книга ${book.key} в избранном?`, inFav);

      const card = createBookCard(book, {
        inFavorites: inFav,
        onFavoriteChange: renderFavorites,
      });

      console.log(`✅ Карточка создана:`, card);
      RESULTS_GRID.appendChild(card);
    } catch (error) {
      console.error(
        `💥 Ошибка при создании карточки для книги ${index}:`,
        error,
      );
      console.error("📋 Данные книги:", book);
    }
  });

  console.log("🏁 renderResults завершен");
}

async function handleSearch(query) {
  const trimmed = query.trim();
  if (!trimmed) {
    setStatus(STATUS.EMPTY);
    RESULTS_GRID.innerHTML = "";
    return;
  }

  setStatus(STATUS.LOADING);
  RESULTS_GRID.innerHTML = "";

  try {
    const books = await searchBooks(trimmed);
    if (!books.length) {
      setStatus(STATUS.ERROR_NOT_FOUND);
    } else {
      setStatus("");
      renderResults(books);
    }
  } catch {
    setStatus(STATUS.ERROR_NETWORK);
  }
}

/* Initializes the search form and attaches event listeners.*/

export function initSearchForm() {
  SEARCH_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(SEARCH_INPUT.value);
  });

  document.addEventListener("favoritesChanged", () => {
    if (lastResults.length) renderResults(lastResults);
  });
}
