const API_BASE = "https://openlibrary.org/search.json";

/* Open Library API client , fetches books from https://openlibrary.org */

export async function searchBooks(query) {
  const encoded = encodeURIComponent(query.trim());
  const url = `${API_BASE}?q=${encoded}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const data = await response.json();
  const docs = data.docs || [];

  return docs.map((doc) => ({
    key: doc.key,
    title: doc.title || "Unknown",
    author_name: doc.author_name || [],
    first_publish_year: doc.first_publish_year || null,
    cover_i: doc.cover_i || null,
  }));
}
