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
} from "@/api/movies/fetchMovies";
import { MovieItem } from "@/types/Movie";

interface MoviesContextValue {
  popularMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  topRatedSeries: MovieItem[];
  popularSeries: MovieItem[];
  fetchPopularMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedMoviesPage: (page: number) => Promise<void>;
  fetchTopRatedSeriesPage: (page: number) => Promise<void>;
  fetchPopularSeriesPage: (page: number) => Promise<void>;
}

const MoviesContext = createContext<MoviesContextValue>({
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
  fetchPopularMoviesPage: async () => {},
  fetchTopRatedMoviesPage: async () => {},
  fetchTopRatedSeriesPage: async () => {},
  fetchPopularSeriesPage: async () => {},
});

const helperFilter = (data: MovieItem[], prev: MovieItem[]) => {
  const newMovies = data.filter(
    (movie: MovieItem) => !prev.some((prevMovie) => prevMovie.id === movie.id)
  );
  return newMovies;
};

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [popularMovies, setPopularMovies] = useState<MovieItem[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieItem[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<MovieItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<MovieItem[]>([]);

  const fetchPopularMoviesPage = useCallback(async (page: number) => {
    try {
      const data = await fetchPopularMovies(page);
      if (page === 1) {
        setPopularMovies(data);
        return;
      }
      setPopularMovies((prev) => {
        const newMovies = helperFilter(data, prev);
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
        const newMovies = helperFilter(data, prev);
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
        const newMovies = helperFilter(data, prev);
        return [...prev, ...newMovies];
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
        const newMovies = helperFilter(data, prev);
        return [...prev, ...newMovies];
      });
    } catch (error) {
      console.error("Error fetching popular series:", error);
    }
  }, []);

  const memoValue = useMemo(
    () => ({
      popularMovies,
      topRatedMovies,
      topRatedSeries,
      popularSeries,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
    }),
    [
      popularMovies,
      topRatedMovies,
      topRatedSeries,
      popularSeries,
      fetchPopularMoviesPage,
      fetchTopRatedMoviesPage,
      fetchTopRatedSeriesPage,
      fetchPopularSeriesPage,
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
