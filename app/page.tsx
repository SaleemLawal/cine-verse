import MovieSection from "@/components/movieSection/MovieSection";

export default function Home() {
  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <MovieSection
          sectionName="Trending Movies"
          sectionType="popular movies"
        />
        <MovieSection
          sectionName="Top rated movies"
          sectionType="top rated movies"
        />
        <MovieSection
          sectionName="Trending series"
          sectionType="popular series"
        />
        <MovieSection
          sectionName="Top rated series"
          sectionType="top rated series"
        />
      </main>
    </div>
  );
}
