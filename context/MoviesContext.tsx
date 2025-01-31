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
  fetchTopRatedSeries,
  fetchPopularSeries,
  fetchMovies,
  fetchSeries,
} from "@/api/movies/fetchMovies";
import { MoviesContextValue } from "@/types/Movie";
import useContextReducer from "@/hooks/useContextReducer";

const MoviesContext = createContext<MoviesContextValue>({
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  movies: [],
  series: [],
  fetchPopularMoviesPage: async () => {},
  fetchTopRatedMoviesPage: async () => {},
  fetchTopRatedSeriesPage: async () => {},
  fetchPopularSeriesPage: async () => {},
  fetchMovieByName: async () => {},
  fetchSeriesByName: async () => {},
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

  const memoValue = useMemo(
    () => ({
      ...state,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
      fetchMovieByName,
      fetchSeriesByName,
    }),
    [
      state,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
      fetchMovieByName,
      fetchSeriesByName,
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
    <MoviesContext.Provider value={memoValue}>
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
