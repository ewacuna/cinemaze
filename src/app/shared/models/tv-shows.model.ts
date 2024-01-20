import {IGenre, IProductionCountry, ISpokenLanguage} from './general.model';

export interface ITvShow {
  adult: boolean;
  backdrop_path: string;
  created_by: ICreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: IGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: ITEpisodeToAir;
  name: string;
  next_episode_to_air: ITEpisodeToAir;
  networks: INetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: INetwork[];
  production_countries: IProductionCountry[];
  seasons: ISeason[];
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface ICreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface ITEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: null;
}

export interface INetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ISeason {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
