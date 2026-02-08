"use client";
import React, { useState } from "react";
import { Episode, SeasonDetail } from "@/types/Movie";
import Image from "next/image";
import styles from "./EpisodeDetail.module.scss";
import VideoEmbed from "@/components/videoEmbed/VideoEmbed";
import { Button } from "@/components/ui/button";
import TrailerModal from "@/components/Trailer/TrailerModal";

interface EpisodeDetailProps {
  episode: Episode | null;
  seasonDetail: SeasonDetail | null;
  seriesId: number;
  seasonNumber: number;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({
  episode,
  seasonDetail,
  seriesId,
  seasonNumber,
}) => {
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  if (!episode) {
    return (
      <div className={styles.empty}>
        <p>Select an episode to view details.</p>
      </div>
    );
  }

  const toggleTrailerModal = () => {
    setShowTrailerModal(!showTrailerModal);
  };

  const trailerVideo = seasonDetail?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.official
  ) || seasonDetail?.videos?.results?.[0];

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const stillImageUrl = imageBaseUrl && episode.still_path
    ? `${imageBaseUrl}${episode.still_path}`
    : null;

  return (
    <div className={styles.container}>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: stillImageUrl ? `url(${stillImageUrl})` : "none",
        }}
      >
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.episodeHeader}>
            <div className={styles.episodeInfo}>
              <h2 className={styles.episodeTitle}>{episode.name}</h2>
              <div className={styles.meta}>
                <span className={styles.episodeNumber}>
                  S{seasonNumber}E{episode.episode_number}
                </span>
                {episode.air_date && (
                  <span className={styles.airDate}>
                    {new Date(episode.air_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {episode.runtime && (
                  <span className={styles.runtime}>{episode.runtime} min</span>
                )}
                {episode.vote_average > 0 && (
                  <span className={styles.rating}>
                    ⭐ {episode.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              {episode.overview && (
                <p className={styles.overview}>{episode.overview}</p>
              )}
              {trailerVideo && (
                <Button
                  variant="outline"
                  size="lg"
                  className={styles.trailerButton}
                  onClick={toggleTrailerModal}
                >
                  Watch Trailer
                </Button>
              )}
            </div>
            {stillImageUrl && (
              <div className={styles.stillImage}>
                <Image
                  src={stillImageUrl}
                  alt={episode.name}
                  width={500}
                  height={281}
                  className={styles.image}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.watchSection}>
        <h3 className={styles.watchTitle}>Watch Episode</h3>
        <VideoEmbed
          embedUrl={`https://vidsrc.xyz/embed/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`}
        />
      </div>

      {showTrailerModal && trailerVideo && (
        <TrailerModal
          toggleTrailerModal={toggleTrailerModal}
          trailerData={[trailerVideo]}
        />
      )}
    </div>
  );
};

export default EpisodeDetail;
