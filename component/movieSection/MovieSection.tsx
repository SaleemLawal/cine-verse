import { Button } from "@/components/ui/button";
import LinkItem from "../Link/LinkItem";
import styles from "./MovieSection.module.scss";
import MovieGrid from "../movieGrid/MovieGrid";

interface MovieSectionProps {
  sectionName: string;
  sectionType: string;
}
const MovieSection = ({ sectionName, sectionType }: MovieSectionProps) => {
  return (
    <section className={styles["movie-section"]}>
      <div className={styles.section__header}>
        <h2>{sectionName}</h2>
        <Button
          className={`text-[1.5rem] px-6 py-5 rounded-full border-gray-400 ${styles.button}`}
          variant="outline"
        >
          <LinkItem href={sectionType} name="View all" active={false} />
        </Button>
      </div>

      {/* GRID */}
      <MovieGrid sectionType={sectionType} />
    </section>
  );
};

export default MovieSection;
