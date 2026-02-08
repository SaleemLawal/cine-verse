"use client";
import MovieSection from "@/components/movieSection/MovieSection";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <h1 className={styles.searchTitle}>Discover Movies & TV Shows</h1>
          <SearchBar />
        </div>
      </div>
      <div className={"wrapper"}>
        <main className={"page-content"}>
          <MovieSection
            sectionName="Top rated movies"
            sectionType="top rated movies"
          />
          <MovieSection
            sectionName="Top rated series"
            sectionType="top rated series"
          />
          <MovieSection
            sectionName="Trending Movies"
            sectionType="popular movies"
          />
          <MovieSection
            sectionName="Trending series"
            sectionType="popular series"
          />
        </main>
      </div>
    </>
  );
}
