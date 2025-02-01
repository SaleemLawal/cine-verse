"use client";
import React, { useEffect } from "react";
import { SeriesPageContentProps } from "@/types/Movie";
import { renderHelper } from "@/lib/utils";
import Form from "@/components/form/Form";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import styles from "./series.module.scss";
import { Button } from "@/components/ui/button";

export const PageContent = ({
  searchQuery,
  setSearchQuery,
  typeParam,
  currentPage,
  setCurrentPage,
  fetchPopularSeriesPage,
  fetchTopRatedSeriesPage,
  fetchSeriesByName,
}: SeriesPageContentProps) => {
  const renderType = renderHelper(searchQuery, typeParam, "series");

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
    searchQuery,
    fetchPopularSeriesPage,
    fetchTopRatedSeriesPage,
    fetchSeriesByName,
    setCurrentPage,
  ]);

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

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <Form
          placeholder="Search series..."
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
