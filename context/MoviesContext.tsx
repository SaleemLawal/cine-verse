"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchMovies,
  fetchMoviesDetails,
  fetchSimilarMoviesApi,
} from "@/api/movies/fetchMovies";
import {
  fetchTopRatedSeries,
  fetchPopularSeries,
  fetchSeries,
  fetchSeriesDetails,
  fetchSimilarSeriesApi,
  fetchSeasonDetails,
} from "@/api/series/fetchSeries";
import { MoviesContextValue } from "@/types/Movie";
import useContextReducer from "@/hooks/useContextReducer";

const MoviesContext = createContext<MoviesContextValue>({
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  movies: [],
  series: [],
  moviesDetail: null,
  similarMovies: [],
  seriesDetail: null,
  similarSeries: [],
  seasonDetail: null,
  fetchPopularMoviesPage: async () => {},
  fetchTopRatedMoviesPage: async () => {},
  fetchTopRatedSeriesPage: async () => {},
  fetchPopularSeriesPage: async () => {},
  fetchMovieByName: async () => {},
  fetchSeriesByName: async () => {},
  fetchMoviesById: async () => {},
  fetchSimilarMovies: async () => {},
  fetchSeriesById: async () => {},
  fetchSimilarSeries: async () => {},
  fetchSeasonDetails: async () => {},
});

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useContextReducer();

  const fetchPopularMoviesPage = useCallback(
    async (page: number) => {
      try {
        const data = await fetchPopularMovies(page);
        dispatch({
          type: page === 1 ? "SET_POPULAR_MOVIES" : "APPEND_POPULAR_MOVIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    },
    [dispatch]
  );

  const fetchTopRatedMoviesPage = useCallback(
    async (page: number) => {
      try {
        const data = await fetchTopRatedMovies(page);
        dispatch({
          type: page === 1 ? "SET_TOP_RATED_MOVIES" : "APPEND_TOP_RATED_MOVIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    },
    [dispatch]
  );

  const fetchTopRatedSeriesPage = useCallback(
    async (page: number) => {
      try {
        const data = await fetchTopRatedSeries(page);
        dispatch({
          type: page === 1 ? "SET_TOP_RATED_SERIES" : "APPEND_TOP_RATED_SERIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching top rated series:", error);
      }
    },
    [dispatch]
  );

  const fetchPopularSeriesPage = useCallback(
    async (page: number) => {
      try {
        const data = await fetchPopularSeries(page);
        dispatch({
          type: page === 1 ? "SET_POPULAR_SERIES" : "APPEND_POPULAR_SERIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching popular series:", error);
      }
    },
    [dispatch]
  );

  const fetchMovieByName = useCallback(
    async (name: string, page: number) => {
      try {
        const data = await fetchMovies(name, page);
        dispatch({
          type: page === 1 ? "SET_MOVIES" : "APPEND_MOVIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching movies by name:", error);
      }
    },
    [dispatch]
  );

  const fetchSeriesByName = useCallback(
    async (name: string, page: number) => {
      try {
        const data = await fetchSeries(name, page);
        dispatch({
          type: page === 1 ? "SET_SERIES" : "APPEND_SERIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching movies by name:", error);
      }
    },
    [dispatch]
  );

  const fetchMoviesById = useCallback(
    async (id: number) => {
      try {
        const data = await fetchMoviesDetails(id);
        dispatch({
          type: "SET_MOVIES_DETAIL",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching movies detail:", error);
      }
    },
    [dispatch]
  );

  const fetchSimilarMovies = useCallback(
    async (id: number) => {
      try {
        const data = await fetchSimilarMoviesApi(id);
        dispatch({
          type: "SET_SIMILAR_MOVIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    },
    [dispatch]
  );

  // series

  const fetchSeriesById = useCallback(
    async (id: number) => {
      try {
        const data = await fetchSeriesDetails(id);
        dispatch({
          type: "SET_SERIES_DETAIL",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching movies detail:", error);
      }
    },
    [dispatch]
  );

  const fetchSimilarSeries = useCallback(
    async (id: number) => {
      try {
        const data = await fetchSimilarSeriesApi(id);
        dispatch({
          type: "SET_SIMILAR_SERIES",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    },
    [dispatch]
  );

  const fetchSeasonDetailsById = useCallback(
    async (series_id: number, season_number: number) => {
      try {
        const data = await fetchSeasonDetails(series_id, season_number);
        dispatch({
          type: "SET_SEASON_DETAIL",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching season details:", error);
      }
    },
    [dispatch]
  );

  const values = useMemo(
    () => ({
      ...state,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
      fetchMovieByName,
      fetchSeriesByName,
      fetchMoviesById,
      fetchSimilarMovies,
      fetchSeriesById,
      fetchSimilarSeries,
      fetchSeasonDetails: fetchSeasonDetailsById,
    }),
    [
      state,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
      fetchMovieByName,
      fetchSeriesByName,
      fetchMoviesById,
      fetchSimilarMovies,
      fetchSeriesById,
      fetchSimilarSeries,
      fetchSeasonDetailsById,
    ]
  );

  useEffect(() => {
    fetchPopularMoviesPage(1);
  }, [fetchPopularMoviesPage]);

  useEffect(() => {
    fetchTopRatedMoviesPage(1);
  }, [fetchTopRatedMoviesPage]);

  useEffect(() => {
    fetchTopRatedSeriesPage(1);
  }, [fetchTopRatedSeriesPage]);

  useEffect(() => {
    fetchPopularSeriesPage(1);
  }, [fetchPopularSeriesPage]);

  return (
    <MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
