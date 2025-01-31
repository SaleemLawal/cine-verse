"use client";
import React, {
  createContext,
  useContext,
  useState,
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
import { MovieItem } from "@/types/Movie";
import { MoviesContextValue } from "@/types/Movie";
import { filterHelper } from "@/lib/utils";

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
  const [popularMovies, setPopularMovies] = useState<MovieItem[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieItem[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<MovieItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<MovieItem[]>([]);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [series, setSeries] = useState<MovieItem[]>([]);

  const fetchPopularMoviesPage = useCallback(async (page: number) => {
    try {
      const data = await fetchPopularMovies(page);
      if (page === 1) {
        setPopularMovies(data);
        return;
      }
      setPopularMovies((prev) => {
        const newMovies = filterHelper(data, prev);
        return [...prev, ...newMovies];
      });
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  }, []);

  const fetchTopRatedMoviesPage = useCallback(async (page: number) => {
    try {
      const data = await fetchTopRatedMovies(page);
      if (page === 1) {
        setTopRatedMovies(data);
        return;
      }
      setTopRatedMovies((prev) => {
        const newMovies = filterHelper(data, prev);
        return [...prev, ...newMovies];
      });
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  }, []);

  const fetchTopRatedSeriesPage = useCallback(async (page: number) => {
    try {
      const data = await fetchTopRatedSeries(page);
      if (page === 1) {
        setTopRatedSeries(data);
        return;
      }
      setTopRatedSeries((prev) => {
        const newSeries = filterHelper(data, prev);
        return [...prev, ...newSeries];
      });
    } catch (error) {
      console.error("Error fetching top rated series:", error);
    }
  }, []);

  const fetchPopularSeriesPage = useCallback(async (page: number) => {
    try {
      const data = await fetchPopularSeries(page);
      if (page === 1) {
        setPopularSeries(data);
        return;
      }
      setPopularSeries((prev) => {
        const newSeries = filterHelper(data, prev);
        return [...prev, ...newSeries];
      });
    } catch (error) {
      console.error("Error fetching popular series:", error);
    }
  }, []);

  const fetchMovieByName = useCallback(async (name: string, page: number) => {
    try {
      const data = await fetchMovies(name, page);
      if (page === 1) {
        setMovies(data);
        return;
      }
      setMovies((prev) => {
        const newMovies = filterHelper(data, prev);
        return [...prev, ...newMovies];
      });
    } catch (error) {
      console.error("Error fetching movies by name:", error);
    }
  }, []);

  const fetchSeriesByName = useCallback(async (name: string, page: number) => {
    try {
      const data = await fetchSeries(name, page);
      if (page === 1) {
        setSeries(data);
        return;
      }
      setSeries((prev) => {
        const newSeries = filterHelper(data, prev);
        return [...prev, ...newSeries];
      });
    } catch (error) {
      console.error("Error fetching movies by name:", error);
    }
  }, []);

  const memoValue = useMemo(
    () => ({
      popularMovies,
      topRatedMovies,
      topRatedSeries,
      popularSeries,
      movies,
      series,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
      fetchMovieByName,
      fetchSeriesByName,
    }),
    [
      popularMovies,
      topRatedMovies,
      topRatedSeries,
      popularSeries,
      movies,
      series,
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
