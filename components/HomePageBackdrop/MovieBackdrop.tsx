"use client";
import React, { useState } from "react";
import styles from "./MovieBackdrop.module.scss";
import useNowPlayingBackdrop from "@/hooks/useNowPlayingBackdrop";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrailerModal from "../Trailer/TrailerModal";
import { fetchVideos } from "@/api/movies/fetchMovies";
import { Video } from "@/types/Movie";
import LinkItem from "../Link/LinkItem";

const MovieBackdrop = () => {
  const { currentMovie, nextMovie, isTransitioning } = useNowPlayingBackdrop();
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerData, setTrailerData] = useState<Video[]>([]);

  const currentImageUrl = currentMovie?.backdrop_path
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${currentMovie.backdrop_path}`
    : "";
  const nextImageUrl = nextMovie?.backdrop_path
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${nextMovie.backdrop_path}`
    : "";

  async function toggleTrailerModal() {
    if (!showTrailerModal && currentMovie?.id) {
      try {
        const response = await fetchVideos(currentMovie.id);
        setTrailerData(response);
        setShowTrailerModal(true);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    } else {
      setShowTrailerModal(false);
    }
  }

  return (
    <div className={styles["homepage-backdrop"]}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: currentImageUrl ? `url(${currentImageUrl})` : "none",
        }}
      />

      <div
        className={`${styles.backgroundImage} ${styles.nextImage} ${
          isTransitioning ? styles.fadeIn : ""
        }`}
        style={{
          backgroundImage: nextImageUrl ? `url(${nextImageUrl})` : "none",
        }}
      />
      <div
        className={`${styles.content} ${
          !isTransitioning ? styles.contentVisible : ""
        }`}
      >
        <div className={styles.detail}>
          <h1 className={styles.title}>{currentMovie?.original_title}</h1>
          <p className={styles.overview}>{currentMovie?.overview}</p>

          <div className={styles.actions}>
            <Button
              variant="outline"
              size="lg"
              className={`text-[1.5rem] p-8 rounded-full ${styles.button}`}
              onClick={toggleTrailerModal}
            >
              Watch trailer
            </Button>

            <Button
              size="lg"
              className={`text-[1.5rem] p-8 rounded-full border border-transparent ${styles.button} ${styles.button__watchNow}`}
            >
              <LinkItem
                href={`/movies/${currentMovie?.id}`}
                name={"Watch Now"}
                active={false}
              />
            </Button>
          </div>
        </div>
        <div className={styles.poster}>
          <Image
            className={styles.posterImage}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${currentMovie?.poster_path}`}
            alt={currentMovie?.original_title || ""}
            width={250}
            height={380}
            priority
          />
        </div>
      </div>
      {showTrailerModal && (
        <TrailerModal
          toggleTrailerModal={toggleTrailerModal}
          trailerData={trailerData}
        />
      )}
    </div>
  );
};

export default MovieBackdrop;
