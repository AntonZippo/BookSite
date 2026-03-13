/*Application initialization.
Connects search, results, and favorites components. */
import { initSearchForm } from "./components/searchForm";
import { renderFavorites } from "./components/favoritesList.js";
import { initThemeToggle } from "./components/themeToggle.js";

/*Initializes the application: search form, favorites list, theme toggle.*/
export function initApp() {
  initThemeToggle();
  initSearchForm();
  renderFavorites();
}
