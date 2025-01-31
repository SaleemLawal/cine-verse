export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
}

export interface VideoItem {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: number;
}

export interface MoviesContextValue {
  popularMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: MovieItem[];
  popularSeries: MovieItem[];
  movies: MovieItem[];
  series: MovieItem[];
  fetchPopularMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedSeriesPage: (page: number) => Promise<void>;
  fetchPopularSeriesPage: (page: number) => Promise<void>;
  fetchMovieByName: (name: string, page: number) => Promise<void>;
  fetchSeriesByName: (name: string, page: number) => Promise<void>;
}

export interface MoviesState {
  popularMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: MovieItem[];
  popularSeries: MovieItem[];
  movies: MovieItem[];
  series: MovieItem[];
}

export type MoviesAction =
  | { type: "SET_POPULAR_MOVIES"; payload: MovieItem[] }
  | { type: "APPEND_POPULAR_MOVIES"; payload: MovieItem[] }
  | { type: "SET_TOP_RATED_MOVIES"; payload: MovieItem[] }
  | { type: "APPEND_TOP_RATED_MOVIES"; payload: MovieItem[] }
  | { type: "SET_TOP_RATED_SERIES"; payload: MovieItem[] }
  | { type: "APPEND_TOP_RATED_SERIES"; payload: MovieItem[] }
  | { type: "SET_POPULAR_SERIES"; payload: MovieItem[] }
  | { type: "APPEND_POPULAR_SERIES"; payload: MovieItem[] }
  | { type: "SET_MOVIES"; payload: MovieItem[] }
  | { type: "APPEND_MOVIES"; payload: MovieItem[] }
  | { type: "SET_SERIES"; payload: MovieItem[] }
  | { type: "APPEND_SERIES"; payload: MovieItem[] };

export const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  movies: [],
  series: [],
};
