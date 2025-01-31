"use client";
import React, { useEffect, useState } from "react";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import styles from "./series.module.scss";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";
import { useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";
import { renderHelper } from "@/lib/utils";

const SeriesPage = () => {
  const { fetchPopularSeriesPage, fetchTopRatedSeriesPage, fetchSeriesByName } =
    useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const renderType = renderHelper(searchQuery, typeParam, "series");

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    if (searchQuery) {
      fetchSeriesByName(searchQuery, newPage);
    } else if (!typeParam || typeParam === "popular") {
      fetchPopularSeriesPage(newPage);
    } else if (typeParam === "top_rated") {
      fetchTopRatedSeriesPage(newPage);
    }
  }

  const handleChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSeriesSearch = () => {
    fetchSeriesByName(searchQuery, 1);
  };

  useEffect(() => {
    setCurrentPage(1);
    if (searchQuery) {
      fetchSeriesByName(searchQuery, 1);
    } else if (!typeParam || typeParam === "popular") {
      fetchPopularSeriesPage(1);
    } else {
      fetchTopRatedSeriesPage(1);
    }
  }, [
    typeParam,
    fetchPopularSeriesPage,
    fetchTopRatedSeriesPage,
    searchQuery,
    fetchSeriesByName,
  ]);

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <Form
          placeholder="Search movies..."
          handleChange={handleChange}
          inputValue={searchQuery}
          handleMovieSearch={handleSeriesSearch}
        />

        <MovieGrid sectionType={renderType} type="series" />
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
