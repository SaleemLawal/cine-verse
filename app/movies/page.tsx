"use client";
import React, { Suspense, useState } from "react";
import { useMovies } from "@/context/MoviesContext";
import SearchParamsComponent from "@/components/searchParam/SearchParamsProvider";
import { PageContent } from "./PageContent";

const MoviesPage = () => {
  const { fetchPopularMoviesPage, fetchTopRatedMoviesPage, fetchMovieByName } =
    useMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeParam, setTypeParam] = useState<string | null>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent setTypeParam={setTypeParam} />
      <PageContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeParam={typeParam}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchPopularMoviesPage={fetchPopularMoviesPage}
        fetchTopRatedMoviesPage={fetchTopRatedMoviesPage}
        fetchMovieByName={fetchMovieByName}
      />
    </Suspense>
  );
};

export default MoviesPage;
