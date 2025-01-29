"use client";
import React from "react";
import styles from "./MovieGrid.module.scss";
import { useMovies } from "@/context/MoviesContext";
import MovieCard from "../movieCard/MovieCard";

const MovieGrid = ({ sectionType }: { sectionType: string }) => {
  const { popularMovies, topRatedMovies, topRatedSeries, popularSeries } =
    useMovies();

  const movieMap = {
    "popular movies": popularMovies,
    "top rated movies": topRatedMovies,
    "popular series": popularSeries,
    "top rated series": topRatedSeries,
  };

  const movies = (movieMap[sectionType as keyof typeof movieMap] || []).slice(
    0,
    6
  );
  return (
    <>
      <div className={styles.grid}>
        {movies.map((movie) => {
          return (
            <div
              key={movie.original_title || movie.name}
              className={styles.grid__item}
            >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
