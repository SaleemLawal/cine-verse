"use client";
import React from "react";
import { Episode } from "@/types/Movie";
import Image from "next/image";
import styles from "./EpisodeList.module.scss";
import { Button } from "@/components/ui/button";

interface EpisodeListProps {
  episodes: Episode[];
  selectedEpisode: number | null;
  onSelectEpisode: (episodeNumber: number) => void;
  seasonNumber: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  selectedEpisode,
  onSelectEpisode,
  seasonNumber,
}) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  
  if (!episodes || episodes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No episodes available for this season.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Season {seasonNumber} Episodes</h3>
      <div className={styles.episodesList}>
        {episodes.map((episode) => {
          const stillImageUrl = imageBaseUrl && episode.still_path
            ? `${imageBaseUrl}${episode.still_path}`
            : null;
          
          return (
            <div
              key={episode.id}
              className={`${styles.episodeCard} ${
                selectedEpisode === episode.episode_number ? styles.active : ""
              }`}
              onClick={() => onSelectEpisode(episode.episode_number)}
            >
              <div className={styles.episodeImage}>
                {stillImageUrl ? (
                  <Image
                    src={stillImageUrl}
                    alt={episode.name}
                    width={300}
                    height={169}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
                <div className={styles.episodeNumber}>
                  E{episode.episode_number}
                </div>
              </div>
            <div className={styles.episodeInfo}>
              <h4 className={styles.episodeName}>{episode.name}</h4>
              {episode.air_date && (
                <p className={styles.airDate}>
                  {new Date(episode.air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {episode.overview && (
                <p className={styles.overview}>{episode.overview}</p>
              )}
              <div className={styles.meta}>
                {episode.runtime && (
                  <span className={styles.runtime}>{episode.runtime} min</span>
                )}
                {episode.vote_average > 0 && (
                  <span className={styles.rating}>
                    ⭐ {episode.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeList;
