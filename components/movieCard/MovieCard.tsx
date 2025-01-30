"use client";
import React from "react";
import styles from "./MovieCard.module.scss";
import { MovieItem } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  movie,
  sectionType,
}: {
  movie: MovieItem;
  sectionType: string;
}) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const splitted = sectionType.split(" ");
  const type = splitted.length > 2 ? splitted[2] : splitted[1];

  return (
    <div className={styles["movie-card"]}>
      <div className={styles["movie-card__image"]}>
        <Link href={`/${type}/${movie?.id}`}>
          <Image
            src={`${baseUrl}${movie?.poster_path}`}
            alt={movie?.original_title || ""}
            width={250}
            height={380}
          />
        </Link>
      </div>
      <h2>{movie?.original_title || movie?.name} </h2>
    </div>
  );
};

export default MovieCard;
