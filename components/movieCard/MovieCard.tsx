"use client";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie, type }: { movie: MovieItem; type: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const imagePath = movie?.poster_path || movie?.backdrop_path;
  const imageUrl = imageBaseUrl && imagePath ? `${imageBaseUrl}${imagePath}` : null;

  return (
    <div className={styles["movie-card"]} data-loaded={imageLoaded}>
      <div className={styles["movie-card__image"]}>
        <Link href={`/${type}/${movie?.id}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={movie?.original_title || movie?.name || ""}
              width={250}
              height={380}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div style={{ width: 250, height: 380, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              No Image
            </div>
          )}
        </Link>
      </div>
      <h2>{movie?.original_title || movie?.name} </h2>
    </div>
  );
};

export default MovieCard;
