import { Button } from "@/components/ui/button";
import LinkItem from "../Link/LinkItem";
import styles from "./MovieSection.module.scss";
import MovieGrid from "../movieGrid/MovieGrid";

interface MovieSectionProps {
  sectionName: string;
  sectionType: string;
}
const MovieSection = ({ sectionName, sectionType }: MovieSectionProps) => {
  const splitted = sectionType.split(" ");
  let type;
  if (splitted.length === 2) {
    type = splitted[0];
  } else {
    type = splitted[0] + "_" + splitted[1];
  }
  const movieType = splitted.length > 2 ? splitted[2] : splitted[1];

  return (
    <section className={styles["movie-section"]}>
      <div className={styles.section__header}>
        <h2>{sectionName}</h2>
        {sectionType !== "similar movies" &&
        sectionType !== "similar series" ? (
          <Button
            className={`text-[1.5rem] px-6 py-5 rounded-full border-gray-400 ${styles.button}`}
            variant="outline"
          >
            <LinkItem
              href={`/${movieType}?type=${type}`}
              name="View all"
              active={false}
            />
          </Button>
        ) : null}
      </div>

      {/* GRID */}
      <MovieGrid type={movieType} sectionType={sectionType} />
    </section>
  );
};

export default MovieSection;
