"use client";
import React, { useEffect } from "react";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import styles from "./series.module.scss";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";
import { useSearchParams } from "next/navigation";

const SeriesPage = () => {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const { fetchPopularSeriesPage, fetchTopRatedSeriesPage } = useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    if (!typeParam || typeParam === "popular") {
      fetchPopularSeriesPage(newPage);
    } else {
      fetchTopRatedSeriesPage(newPage);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    if (!typeParam || typeParam === "popular") {
      fetchPopularSeriesPage(1);
    } else {
      fetchTopRatedSeriesPage(1);
    }
  }, [typeParam, fetchPopularSeriesPage, fetchTopRatedSeriesPage]);

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <MovieGrid
          sectionType={
            !typeParam || typeParam === "popular"
              ? "popular series"
              : "top rated series"
          }
          type="series"
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

export default SeriesPage;
