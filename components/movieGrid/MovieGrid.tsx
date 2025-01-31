"use client";
import React from "react";
import styles from "./MovieGrid.module.scss";
import { useMovies } from "@/context/MoviesContext";
import MovieCard from "../movieCard/MovieCard";
import { usePathname } from "next/navigation";

const MovieGrid = ({
  type,
  sectionType,
}: {
  type: string;
  sectionType?: string;
}) => {
  const {
    popularMovies,
    topRatedMovies,
    topRatedSeries,
    popularSeries,
    movies,
    series,
  } = useMovies();
  const pathname = usePathname();

  const movieMap = {
    "popular movies": popularMovies,
    "top rated movies": topRatedMovies,
    "popular series": popularSeries,
    "top rated series": topRatedSeries,
    "search movies": movies,
    "search series": series,
  };

  const matchedMovies = movieMap[sectionType as keyof typeof movieMap] || [];
  const displayMovies =
    pathname === "/" ? matchedMovies.slice(0, 6) : matchedMovies;

  return (
    <>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns:
            pathname === "/" ? "repeat(6, 1fr)" : "repeat(5, 1fr)",
        }}
      >
        {displayMovies.map((movie) => {
          return (
            <div
              key={`${movie.original_title || movie.name}-${movie.id}`}
              className={styles.grid__item}
            >
              <MovieCard movie={movie} type={type} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieGrid;
