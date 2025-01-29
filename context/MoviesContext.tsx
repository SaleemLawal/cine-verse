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
    const fetchData = async () => {
      try {
        const data = await fetchPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setTopRatedMovies(data);
      } catch (error) {
        console.error("Error fetching top ratedmovies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopRatedSeries();
        setTopRatedSeries(data);
      } catch (error) {
        console.error("Error fetching top ratedmovies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPopularSeries();
        setPopularSeries(data);
      } catch (error) {
        console.error("Error fetching top ratedmovies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
