import {IGenre, IMovie, IResult, ITvShow, IVideoData} from '../../shared/models';

export type ContentType = 'movie' | 'tv';

export type DetailsData =
  | {
      type: 'movie';
      movie: IMovie;
      recommended: IResult[];
      videos: IVideoData[];
    }
  | {
      type: 'tv';
      tv: ITvShow;
      recommended: IResult[];
    };

export type DetailsState =
  | {status: 'loading'}
  | {status: 'error'}
  | {status: 'success'; data: DetailsData};

/** Normalized hero information shared by movies and TV shows. */
export interface DetailsHero {
  title: string;
  backdrop: string | null;
  poster: string | null;
  genres: IGenre[];
  tagline: string;
  overview: string;
  meta: string[];
  rating: string | null;
}
