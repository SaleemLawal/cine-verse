"use client";
import React from "react";
import { SearchResult } from "@/api/search/fetchSearch";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: () => void;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
  query,
}) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

  const getRoute = (result: SearchResult) => {
    return result.media_type === "movie" ? "movies" : "series";
  };

  const getTitle = (result: SearchResult) => {
    return result.title || result.name || result.original_title || result.original_name || "Untitled";
  };

  const getYear = (result: SearchResult) => {
    const date = result.release_date || result.first_air_date;
    return date ? new Date(date).getFullYear() : null;
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </span>
      </div>
      <div className={styles.resultsList}>
        {results.map((result) => {
          const imagePath = result.poster_path || result.backdrop_path;
          const imageUrl = imageBaseUrl && imagePath ? `${imageBaseUrl}${imagePath}` : null;
          const route = getRoute(result);
          const title = getTitle(result);
          const year = getYear(result);

          return (
            <Link
              key={`${result.media_type}-${result.id}`}
              href={`/${route}/${result.id}`}
              onClick={onResultClick}
              className={styles.resultItem}
            >
              <div className={styles.resultImage}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={80}
                    height={120}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
              </div>
              <div className={styles.resultInfo}>
                <div className={styles.resultHeader}>
                  <h3 className={styles.resultTitle}>{title}</h3>
                  {year && <span className={styles.resultYear}>({year})</span>}
                </div>
                <div className={styles.resultMeta}>
                  <span className={styles.mediaType}>
                    {result.media_type === "movie" ? "Movie" : "TV Series"}
                  </span>
                  {result.vote_average > 0 && (
                    <span className={styles.rating}>
                      ⭐ {result.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                {result.overview && (
                  <p className={styles.resultOverview}>
                    {result.overview.length > 150
                      ? `${result.overview.substring(0, 150)}...`
                      : result.overview}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
