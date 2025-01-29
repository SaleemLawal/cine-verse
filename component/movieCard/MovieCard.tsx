"use client";
import React from "react";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: MovieItem }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles["movie-card"]}>
      <Link href={`/movie/${movie?.id}`}>
        <Image
          src={`${baseUrl}${movie?.poster_path}`}
          alt={movie?.original_title || ""}
          width={250}
          height={380}
        />
      </Link>
      <h2>{movie?.original_title || movie?.name} </h2>
    </div>
  );
};

export default MovieCard;
