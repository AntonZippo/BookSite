# Book Catalog

You can visit deployed version on [booksite.fly.dev](https:/booksite.fly.dev/) . Sometimes reqired vpn.

A web app for searching books via the Open Library API and managing favorites (localStorage).

## Running the app

### Development

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm install
npm run build
```

Output in the `dist/` folder:
- `index.html` — HTML with inline styles
- `index-[hash].js` — JS bundle (next to HTML)
- `assets/sprite.svg` — SVG icon sprite

### Preview build

```bash
npm run preview
```

### Docker

```bash
docker build -t library-front .
docker run -d -p 8080:80 library-front
```

The app is available at http://localhost:8080

## Features

- Search books by title and author
- Add to favorites (localStorage)
- Light/dark theme toggle (defaults to system preference)

## Project structure

| Folder | Description |
|--------|-------------|
| `src/` | Source code |
| `src/api/` | Open Library API client |
| `src/assets/` | SVG icon sprite |
| `src/components/` | UI components (search, book card, favorites, theme toggle) |
| `src/services/` | Business logic (favorites storage) |
| `src/styles/` | CSS styles |
| `src/utils/` | Utilities (icons) |
| `assets/` | Static files for dev (publicDir) |
| `dist/` | Build output (generated) |
