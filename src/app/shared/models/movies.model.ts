import {SafeResourceUrl} from '@angular/platform-browser';
import {IGenre, IProductionCountry, ISpokenLanguage} from './general.model';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  time?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface IMovieVideos {
  id: number;
  results: IVideoData[];
}

export interface IVideoData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
  url?: SafeResourceUrl;
}

export interface IMovieGenres {
  genres: IGenre[];
}
