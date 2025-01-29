import MovieSection from "@/component/movieSection/MovieSection";
import styles from "./page.module.scss";
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.page}>
        <MovieSection sectionName="Trending Movies" sectionType="popular movies" />
        <MovieSection sectionName="Top rated movies" sectionType="top rated movies" />
        <MovieSection sectionName="Trending series" sectionType="popular series" />
        <MovieSection sectionName="Top rated series" sectionType="top rated series" />
      </main>
    </div>
  );
}
