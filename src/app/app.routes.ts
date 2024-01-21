import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./modules/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./modules/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
  },
  {
    path: 'tv-shows',
    loadComponent: () =>
      import('./modules/tv-shows/tv-shows.component').then(
        (m) => m.TvShowsComponent
      ),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./modules/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
  {
    path: 'tv-shows/:id',
    loadComponent: () =>
      import('./modules/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./modules/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
