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
    results: VideoItem[];
  };
  vote_average: number;
  vote_count: number;
  credits?: {
    cast: [
      {
        adult: false;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
      }
    ];
    crew: [
      {
        adult: false;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        credit_id: string;
        department: string;
        job: string;
      }
    ];
  };
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
  moviesDetail: MovieDetail | null;
  similarMovies: MovieItem[];
  fetchPopularMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedSeriesPage: (page: number) => Promise<void>;
  fetchPopularSeriesPage: (page: number) => Promise<void>;
  fetchMovieByName: (name: string, page: number) => Promise<void>;
  fetchSeriesByName: (name: string, page: number) => Promise<void>;
  fetchMoviesById: (id: number) => Promise<void>;
  fetchSimilarMovies: (id: number) => Promise<void>;
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
  | { type: "SET_SIMILAR_MOVIES"; payload: MovieItem[] };

export const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  movies: [],
  series: [],
  moviesDetail: null,
  similarMovies: [],
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
