import { filterHelper } from "@/lib/utils";
import { MoviesState, MoviesAction, initialState } from "@/types/Movie";
import { useReducer } from "react";

const moviesReducer = (state: MoviesState, action: MoviesAction) => {
  let filtered = [];

  switch (action.type) {
    // popular movies
    case "SET_POPULAR_MOVIES":
      return { ...state, popularMovies: action.payload };
    case "APPEND_POPULAR_MOVIES":
      filtered = filterHelper(action.payload, state.popularMovies);
      return {
        ...state,
        popularMovies: [...state.popularMovies, ...filtered],
      };

    // top rated movies
    case "SET_TOP_RATED_MOVIES":
      return { ...state, topRatedMovies: action.payload };
    case "APPEND_TOP_RATED_MOVIES":
      filtered = filterHelper(action.payload, state.topRatedMovies);
      return {
        ...state,
        topRatedMovies: [...state.topRatedMovies, ...filtered],
      };

    // top rated series
    case "SET_TOP_RATED_SERIES":
      return { ...state, topRatedSeries: action.payload };
    case "APPEND_TOP_RATED_SERIES":
      filtered = filterHelper(action.payload, state.topRatedSeries);

      return {
        ...state,
        topRatedSeries: [...state.topRatedSeries, ...filtered],
      };

    // popular series
    case "SET_POPULAR_SERIES":
      return { ...state, popularSeries: action.payload };
    case "APPEND_POPULAR_SERIES":
      filtered = filterHelper(action.payload, state.popularSeries);

      return {
        ...state,
        popularSeries: [...state.popularSeries, ...filtered],
      };

    // movies
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "APPEND_MOVIES":
      filtered = filterHelper(action.payload, state.movies);

      return {
        ...state,
        movies: [...state.movies, ...filtered],
      };

    // series
    case "SET_SERIES":
      return { ...state, series: action.payload };
    case "APPEND_SERIES":
      filtered = filterHelper(action.payload, state.series);

      return {
        ...state,
        series: [...state.series, ...filtered],
      };

    case "SET_MOVIES_DETAIL":
      return { ...state, moviesDetail: action.payload };

    case "SET_SIMILAR_MOVIES":
      return { ...state, similarMovies: action.payload };

    case "SET_SERIES_DETAIL":
      return { ...state, seriesDetail: action.payload };

    case "SET_SIMILAR_SERIES":
      return { ...state, similarSeries: action.payload };

    case "SET_SEASON_DETAIL":
      return { ...state, seasonDetail: action.payload };
  }
};

const useContextReducer = () => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  return { state, dispatch };
};

export default useContextReducer;
