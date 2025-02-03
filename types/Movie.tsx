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

export interface Video {
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

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: [string];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: false;
  videos: {
    results: Video[];
  };
  vote_average: number;
  vote_count: number;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface SeriesDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      original_name: string;
      gender: number;
      profile_path: string;
    }
  ];
  episode_run_time: [];
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode;

  networks: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: null;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons: Season[];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface MoviesContextValue {
  popularMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: MovieItem[];
  popularSeries: MovieItem[];
  movies: MovieItem[];
  series: MovieItem[];
  moviesDetail: MovieDetail | null;
  similarMovies: MovieItem[];
  seriesDetail: SeriesDetail | null;
  similarSeries: MovieItem[];
  fetchPopularMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedSeriesPage: (page: number) => Promise<void>;
  fetchPopularSeriesPage: (page: number) => Promise<void>;
  fetchMovieByName: (name: string, page: number) => Promise<void>;
  fetchSeriesByName: (name: string, page: number) => Promise<void>;
  fetchMoviesById: (id: number) => Promise<void>;
  fetchSimilarMovies: (id: number) => Promise<void>;
  fetchSeriesById: (id: number) => Promise<void>;
  fetchSimilarSeries: (id: number) => Promise<void>;
}

export interface MoviesState {
  popularMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: MovieItem[];
  popularSeries: MovieItem[];
  movies: MovieItem[];
  series: MovieItem[];
  moviesDetail: MovieDetail | null;
  similarMovies: MovieItem[];
  seriesDetail: SeriesDetail | null;
  similarSeries: MovieItem[];
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
  | { type: "APPEND_SERIES"; payload: MovieItem[] }
  | { type: "SET_MOVIES_DETAIL"; payload: MovieDetail }
  | { type: "SET_SIMILAR_MOVIES"; payload: MovieItem[] }
  | { type: "SET_SERIES_DETAIL"; payload: SeriesDetail }
  | { type: "SET_SIMILAR_SERIES"; payload: MovieItem[] };

export const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  movies: [],
  series: [],
  moviesDetail: null,
  similarMovies: [],
  similarSeries: [],
  seriesDetail: null,
};

export interface MoviePageContentProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  typeParam: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchPopularMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedMoviesPage: (page: number) => Promise<void>;
  fetchMovieByName: (query: string, page: number) => Promise<void>;
}
export interface SeriesPageContentProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  typeParam: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchPopularSeriesPage: (page: number) => Promise<void>;
  fetchTopRatedSeriesPage: (page: number) => Promise<void>;
  fetchSeriesByName: (query: string, page: number) => Promise<void>;
}
