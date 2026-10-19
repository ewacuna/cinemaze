<p align="center">
  <img src="src/assets/images/logo.svg" alt="Cinemaze logo" width="96" height="96">
</p>

<h3 align="center">Cinemaze</h3>

## Overview

Cinemaze is a web app for exploring movies and TV shows using The Movie Database (TMDB) API. It includes search, category listings, details, recommendations, and movie trailers.

Built with Angular 17. Demo coming soon.

## Technologies Used

- [Angular](https://angular.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [Swiper](https://swiperjs.com/)

## Development

Install dependencies:

```bash
npm ci
```

Get a v3 API key from [TMDB](https://developer.themoviedb.org/docs/faq) and set it in `src/environments/environment.development.ts`:

```typescript
theMovieDBAPIKey: 'your-tmdb-api-key';
```

Keep the API key empty when committing environment files.

```bash
npm run dev
```

Open <http://localhost:5100/>. The app reloads automatically when you change the source files.

## Build

Set your API key in `src/environments/environment.ts`, then run:

```bash
npm run build
```

The build output is saved to `dist/cinemaze/browser/`.

For hosting under a subpath, such as GitHub Pages:

```bash
npm run build-gh-page -- --base-href /cinemaze/
```

Replace `/cinemaze/` with your site's path. Configure your hosting to support Angular routes when opening or refreshing internal URLs.

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.
