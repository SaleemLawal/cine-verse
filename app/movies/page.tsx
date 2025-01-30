"use client";
import React, { useEffect } from "react";
import styles from "./movies.module.scss";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";
import { useSearchParams } from "next/navigation";

const MoviesPage = () => {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const { fetchPopularMoviesPage, fetchTopRatedMoviesPage } = useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    if (!typeParam || typeParam === "popular") {
      fetchPopularMoviesPage(newPage);
    } else {
      fetchTopRatedMoviesPage(newPage);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    if (!typeParam || typeParam === "popular") {
      fetchPopularMoviesPage(1);
    } else {
      fetchTopRatedMoviesPage(1);
    }
  }, [typeParam, fetchPopularMoviesPage, fetchTopRatedMoviesPage]);

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <MovieGrid
          sectionType={
            !typeParam || typeParam === "popular"
              ? "popular movies"
              : "top rated movies"
          }
          type="movies"
        />

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
