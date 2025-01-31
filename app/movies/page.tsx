"use client";
import React, { useEffect, useState } from "react";
import styles from "./movies.module.scss";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/context/MoviesContext";
import { useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";
import { renderHelper } from "@/lib/utils";

const MoviesPage = () => {
  const { fetchPopularMoviesPage, fetchTopRatedMoviesPage, fetchMovieByName } =
    useMovies();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  // check if search input is not empty, if it isnt, disregard the typeParam
  // if search input is empty, then consider the typeParam
  const renderType = renderHelper(searchQuery, typeParam, "movies");

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
    fetchPopularMoviesPage,
    fetchTopRatedMoviesPage,
    fetchMovieByName,
    searchQuery,
  ]);

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

export default MoviesPage;
