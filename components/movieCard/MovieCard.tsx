"use client";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie, type }: { movie: MovieItem; type: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles["movie-card"]} data-loaded={imageLoaded}>
      <div className={styles["movie-card__image"]}>
        <Link href={`/${type}/${movie?.id}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${
              movie?.poster_path || movie?.backdrop_path
            }`}
            alt={movie?.original_title || ""}
            width={250}
            height={380}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
      </div>
      <h2>{movie?.original_title || movie?.name} </h2>
    </div>
  );
};

export default MovieCard;
