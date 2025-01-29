"use client";
import React from "react";
import styles from "./MovieBackdrop.module.scss";
import useNowPlayingBackdrop from "@/hooks/useNowPlayingBackdrop";

const MovieBackdrop = () => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const { currentImageUrl, nextImageUrl, isTransitioning } =
    useNowPlayingBackdrop();

  return (
    <div className={styles["homepage-backdrop"]}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${baseUrl}${currentImageUrl})` }}
      />

      <div
        className={`${styles.backgroundImage} ${styles.nextImage} ${
          isTransitioning ? styles.fadeIn : ""
        }`}
        style={{ backgroundImage: `url(${baseUrl}${nextImageUrl})` }}
      />
    </div>
  );
};

export default MovieBackdrop;
