import React from "react";
import styles from "./Similar.module.scss";
import MovieSection from "../movieSection/MovieSection";
import { MovieDetail, SeriesDetail } from "@/types/Movie";
import VideoEmbed from "@/components/videoEmbed/VideoEmbed";

const Similar = ({
  data,
  sectionName,
  sectionType,
  id,
}: {
  data: MovieDetail | SeriesDetail | null;
  sectionName: string;
  sectionType: string;
  id?: number;
}) => {
  return (
    <div className={"wrapper"}>
      <main className={"page-content"}>
        <div className={styles["container"]}>
          {sectionName.includes("Movies") && id ? (
            <div className={styles.watchMovieSection}>
              <h2 className={styles.title}>Watch Movie</h2>
              <VideoEmbed embedUrl={`https://vidsrc.xyz/embed/movie/${id}`} />
            </div>
          ) : null}
          
          {data?.videos?.results?.slice(0, 2).map((video) => {
            return (
              <div key={video.id} className={styles["video-container"]}>
                <h2 className={styles.title}>{video.name}</h2>
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            );
          })}
        </div>
        <MovieSection sectionName={sectionName} sectionType={sectionType} />
      </main>
    </div>
  );
};

export default Similar;
