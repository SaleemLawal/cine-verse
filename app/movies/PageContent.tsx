"use client";
import React, { useEffect } from "react";
import styles from "./movies.module.scss";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import { Button } from "@/components/ui/button";
import { MoviePageContentProps } from "@/types/Movie";
import { renderHelper } from "@/lib/utils";
import Form from "@/components/form/Form";

export const PageContent = ({
  searchQuery,
  setSearchQuery,
  typeParam,
  currentPage,
  setCurrentPage,
  fetchPopularMoviesPage,
  fetchTopRatedMoviesPage,
  fetchMovieByName,
}: MoviePageContentProps) => {
  const renderType = renderHelper(searchQuery, typeParam, "movies");

  useEffect(() => {
    setCurrentPage(1);
    if (searchQuery) {
      fetchMovieByName(searchQuery, 1);
    } else if (!typeParam || typeParam === "popular") {
      fetchPopularMoviesPage(1);
    } else if (typeParam === "top_rated") {
      fetchTopRatedMoviesPage(1);
    }
  }, [
    typeParam,
    searchQuery,
    fetchPopularMoviesPage,
    fetchTopRatedMoviesPage,
    fetchMovieByName,
    setCurrentPage,
  ]);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
    if (searchQuery) {
      fetchMovieByName(searchQuery, newPage);
    } else if (!typeParam || typeParam === "popular") {
      fetchPopularMoviesPage(newPage);
    } else if (typeParam === "top_rated") {
      fetchTopRatedMoviesPage(newPage);
    }
  }

  const handleChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleMovieSearch = () => {
    fetchMovieByName(searchQuery, 1);
  };

  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <Form
          placeholder="Search movies..."
          handleChange={handleChange}
          inputValue={searchQuery}
          handleMovieSearch={handleMovieSearch}
        />
        <MovieGrid sectionType={renderType} type="movies" />

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
