"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
}

const MoviesContext = createContext<MoviesContextValue>({
  popularMovies: [],
  topRatedMovies: [],
  topRatedSeries: [],
  popularSeries: [],
});

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [popularMovies, setPopularMovies] = useState<MovieItem[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieItem[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<MovieItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<MovieItem[]>([]);

  const contextValue = {
    popularMovies,
    topRatedMovies,
    topRatedSeries,
    popularSeries,
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [popularData, topRatedData, topRatedSeriesData, popularSeriesData] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchTopRatedSeries(),
          fetchPopularSeries()
        ]);

        setPopularMovies(popularData);
        setTopRatedMovies(topRatedData);
        setTopRatedSeries(topRatedSeriesData);
        setPopularSeries(popularSeriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
