<p align="center">
  <a href="https://ewacuna.github.io/cinemaze/">
    <img src="https://github.com/ewacuna/cinemaze/blob/main/src/assets/images/logo.svg?raw=true" alt="Cinemaze logo" width="96" height="96">
  </a>
</p>

<h3 align="center">Cinemaze</h3>

## Overview

Cinemaze (Movies | TV Shows) is a simple web app that consumes The Movie DB API, it can show you interesting data about popular movies and series.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

#### :sparkles: [See Demo](https://ewacuna.github.io/cinemaze/)

## Technologies Used
- [Angular](https://angular.dev/) web application framework
- [Tailwind CSS](https://tailwindcss.com/) a utility-first CSS framework
- [Flowbite](https://flowbite.com/) UI component library
- [Swiper](https://swiperjs.com) mobile touch slider

## Development Server

Head over to [https://developer.themoviedb.org](https://developer.themoviedb.org/) and create a new API key. Edit the [environment.ts](/src/environments/environment.development.ts) file with your Movie DB API as follows:
```typescript
theMovieDBAPIKey: 'your-movie-db-api-key'
```

Run `npm install` and then `npm run dev` for a dev server. Navigate to `http://localhost:5100/`. The application will automatically reload if you change any of the source files.
