/* Favorite list component
   render sidebar cards */

import { getFavorites, removeFavorite } from "../services/favoriteStorage";
import { icon } from "../utils/icons.js";

const COVER_BASE = "https://covers.openlibrary.org/b/id/";

const FAVORITES_LIST = document.getElementById("favorites-list");
const FAVORITES_COUNT = document.getElementById("favorites-count");

function createFavoriteCard(book) {
  const card = document.createElement("div");
  card.className = "favorite-card";
  card.dataset.bookKey = book.key;

  const coverUrl = book.cover_i ? `${COVER_BASE}${book.cover_i}.jpg` : null;

  const coverEl = document.createElement("div");
  coverEl.className = "favorite-card__cover";
  if (coverUrl) {
    const img = document.createElement("img");
    img.src = coverUrl;
    img.alt = book.title;
    coverEl.appendChild(img);
  } else {
    coverEl.innerHTML = '<span class="favorite-card__no-cover">—</span>';
  }

  const info = document.createElement("div");
  info.className = "favorite-card__info";

  const title = document.createElement("p");
  title.className = "favorite-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "favorite-card__author";
  author.textContent = book.author_name?.length
    ? book.author_name.join(", ")
    : "Unknown author";

  info.append(title, author);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "favorite-card__remove";
  removeBtn.innerHTML = icon("icon-heart", "icon--18");
  removeBtn.title = "Удалить";
  removeBtn.addEventListener("click", () => {
    removeFavorite(book.key);
    renderFavorites();
    document.dispatchEvent(new CustomEvent("favoritesChanged"));
  });

  card.append(coverEl, info, removeBtn);
  return card;
}

/* Render the favorites list from localStorage */

export function renderFavorites() {
  const favorites = getFavorites();
  FAVORITES_LIST.innerHTML = "";

  const count = favorites.length;
  FAVORITES_COUNT.textContent =
    count === 1 ? "1 book saved" : `${count} books saved`;

  favorites.forEach((book) => {
    FAVORITES_LIST.appendChild(createFavoriteCard(book));
  });
}
