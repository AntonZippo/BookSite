/** Theme toggle: light/dark with system preference as default. */

const STORAGE_KEY = "theme-preference";

/**
 * Returns current effective theme: "light" or "dark".
 * Uses system preference when no user choice is stored.
 */
function getEffectiveTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Applies theme to document (sets data-theme on html).
 * Empty string = use system preference only.
 */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light" || theme === "dark") {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
}

/**
 * Saves user preference and applies it.
 */
function setTheme(theme) {
  if (theme === "light" || theme === "dark") {
    localStorage.setItem(STORAGE_KEY, theme);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  applyTheme(theme);
}

/**
 * Toggles between light and dark. Follows system if no stored preference.
 */
function toggleTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const effective = getEffectiveTheme();

  if (stored === "light") {
    setTheme("dark");
  } else if (stored === "dark") {
    setTheme("light");
  } else {
    setTheme(effective === "dark" ? "light" : "dark");
  }
}

/**
 * Initializes theme: apply stored or system preference, set up toggle button.
 */
export function initThemeToggle() {
  const stored = localStorage.getItem(STORAGE_KEY);
  applyTheme(stored || "");

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme("");
    }
  });
}
