export interface IMovieTv {
  id: number | string;
  dates: IDates;
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}

export interface IResult {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  isMovie?: boolean;
  media_type?: string;
  name?: string;
  origin_country?: string[];
  original_language: IOriginalLanguage;
  original_name?: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDates {
  maximum: Date;
  minimum: Date;
}

export enum IOriginalLanguage {
  En = 'en',
  Hi = 'hi',
  Ja = 'ja',
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IResultsGenre {
  id: number;
  name: string;
  results: IResult[];
}
