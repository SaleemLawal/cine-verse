// "use client";
import React from "react";
import styles from "./Trailer.module.scss";
import { VideoItem } from "@/types/Movie";

interface TrailerModalProps {
  toggleTrailerModal: () => void;
  trailerData: VideoItem[];
}

const TrailerModal = ({
  toggleTrailerModal,
  trailerData,
}: TrailerModalProps) => {
  const trailer =
    trailerData?.find((video) => video.type === "Trailer" && video.official) ||
    trailerData?.[0];
  return (
    <>
      <div className={styles.overlay} onClick={toggleTrailerModal} />
      <div className={`text-red-700 text-5xl ${styles.trailer}`}>
        <iframe
          width="570"
          height="320"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
        />
      </div>
    </>
  );
};

export default TrailerModal;
