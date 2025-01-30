"use client";
import React from "react";
import styles from "./movies.module.scss";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";

const MoviesPage = () => {
  const { fetchPopularMoviesPage } = useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    fetchPopularMoviesPage(newPage);
  }

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <MovieGrid sectionType="popular movies" />

        <div className={styles["button-wrapper"]}>
          <Button
            size="lg"
            className={`text-[1.5rem] p-8 rounded-full border border-transparent ${styles.button} ${styles.button__watchNow}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Load More
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MoviesPage;
