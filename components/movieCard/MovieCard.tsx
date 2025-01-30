"use client";
import React, {useState} from "react";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie, type }: { movie: MovieItem; type: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles["movie-card"]}>
      <div className={styles["movie-card__image"]}>
        <Link href={`/${type}/${movie?.id}`}>
          <Image
            src={`${baseUrl}${movie?.poster_path || movie?.backdrop_path}`}
            alt={movie?.original_title || ""}
            width={250}
            height={380}
            className={styles["movie-card__image-fade"]}
            loading="lazy"
            data-loaded={imageLoaded}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
      </div>
      <h2>{movie?.original_title || movie?.name} </h2>
    </div>
  );
};

export default MovieCard;
