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
          {/* <VideoEmbed embedUrl={`https://2embed.org/embed/movie/${id}`} /> */}
          <h2 className={`${styles.title} `}>Watch Movie</h2>
          <VideoEmbed embedUrl={`https://vidsrc.xyz/embed/movie/${id}`} />
          
          {data?.videos?.results?.splice(0, 2).map((video) => {
            return (
              <div key={video.id} className={styles["video-container"]}>
                <h2 className={`${styles.title} `}>{video.name}</h2>
                <iframe
                  width="912"
                  height="480"
                  src={`https://www.youtube.com/embed/${video.key}`}
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
