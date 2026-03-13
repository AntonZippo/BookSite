/* Book card component
   Render a  single book with required params */

import {
  isFavorite,
  addFavorite,
  removeFavorite,
} from "../services/favoriteStorage";
import { icon } from "../utils/icons.js";

const COVER_BASE = "https://covers.openlibrary.org/b/id/";

/* Creates a boor card DOM element */

export function createBookCard(book, options = {}) {
  const { InFavorites = false, onFavoriteChange } = options;

  const card = document.createElement("article");
  card.className = "book-card";
  card.dataset.bookKey = book.key;

  const coverUrl = book.cover_i ? `${COVER_BASE}${book.cover_i}.jpg` : null;

  const coverWrap = document.createElement("div");
  coverWrap.className = "book-card__cover-wrap";

  const coverEl = document.createElement("div");
  coverEl.className = "book-card__cover";

  if (coverUrl) {
    const img = document.createElement("img");
    img.src = coverUrl;
    img.alt = book.title;
    img.loading = "lazy";
    img.oneerror = () => {
      coverEl.innerHTML =
        '<span class="book-card__no-cover">Нет обложки</span>';
    };
    coverEl.appendChild(img);
  } else {
    coverEl.innerHTML = '<span class="book-card__no-cover">Нет обложки</span>';
  }

  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className = "book-card__fav-btn";
  favBtn.innerHTML = InFavorites ? icon("icon-heart") : icon("icon-heart-outline");
  favBtn.title = InFavorites ? "Удалить из изббранного" : "В избранное";
  favBtn.dataset.bookKey = book.key;
  if (InFavorites) favBtn.classList.add("is-favorite");

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isFavorite(book.key)) {
      removeFavorite(book.key);
      favBtn.innerHTML = icon("icon-heart-outline");
      favBtn.classList.remove("is-favorite");
    } else {
      addFavorite(book);
      favBtn.innerHTML = icon("icon-heart");
      favBtn.classList.add("is-favorite");
    }
    onFavoriteChange?.();
  });

  coverWrap.append(coverEl, favBtn);

  const body = document.createElement("div");
  body.className = "book-card__body";

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";
  author.textContent = book.author_name?.length
    ? book.author_name.join(", ")
    : "Unknown author";

  const year = document.createElement("p");
  year.className = "book-card__year";
  year.textContent = book.first_publish_year
    ? String(book.first_publish_year)
    : "—";

  body.append(title, author, year);
  card.append(coverWrap, body);

  return card;
}
