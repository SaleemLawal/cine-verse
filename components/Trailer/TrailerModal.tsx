"use client";
import React from "react";
import styles from "./Trailer.module.scss";
import { Video } from "@/types/Movie";

interface TrailerModalProps {
  toggleTrailerModal: () => void;
  trailerData: Video[];
}

const TrailerModal = ({
  toggleTrailerModal,
  trailerData,
}: TrailerModalProps) => {
  const trailer =
    trailerData?.find((video) => video.type === "Trailer" && video.official) ||
    trailerData?.[0];
  
  if (!trailer) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={toggleTrailerModal} />
      <div className={styles.trailer}>
        <button className={styles.closeButton} onClick={toggleTrailerModal}>
          ×
        </button>
        <iframe
          width="960"
          height="540"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
