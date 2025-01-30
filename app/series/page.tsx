"use client";
import React from "react";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import styles from "./series.module.scss";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";

const SeriesPage = () => {
  const { fetchPopularSeriesPage } = useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    fetchPopularSeriesPage(newPage);
  }

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <MovieGrid sectionType="popular series" />

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

export default SeriesPage;
