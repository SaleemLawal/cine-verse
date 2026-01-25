"use client";
import { useMovies } from "@/context/MoviesContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./movieDetailPage.module.scss";
import Image from "next/image";
// import MovieSection from "@/components/movieSection/MovieSection";
import Similar from "@/components/similar/Similar";
// import Cast from "@/components/cast/Cast";
import Detail from "@/components/detail/Detail";

const MovieDetailPage = () => {
  const { fetchMoviesById, moviesDetail, fetchSimilarMovies } = useMovies();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);
  const { movieId } = useParams();

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const posterPath = moviesDetail?.poster_path;
  const posterImageUrl = imageBaseUrl && posterPath ? `${imageBaseUrl}${posterPath}` : null;

  useEffect(() => {
    async function fetchData() {
      await fetchMoviesById(parseInt(movieId as string));
      await fetchSimilarMovies(parseInt(movieId as string));
      setImageLoaded(false);
      setBgLoaded(false);
      // await playMovie(parseInt(movieId as string));
    }
    fetchData();
  }, [movieId, fetchMoviesById, fetchSimilarMovies]);

  return (
    <>
      <div
        className={`${styles.overview} ${bgLoaded ? styles.loaded : ""}`}
        style={{
          backgroundImage: posterImageUrl ? `url(${posterImageUrl})` : "none",
        }}
      >
        {posterImageUrl && (
          <Image
            src={posterImageUrl}
            alt=""
            width={1}
            height={1}
            onLoad={() => setBgLoaded(true)}
            style={{ display: "none" }}
            priority
          />
        )}
        <div className={`${styles.content} ${bgLoaded ? styles.visible : ""}`}>
          {posterImageUrl && (
            <div className={styles.poster}>
              <Image
                className={styles.posterImage}
                src={posterImageUrl}
                alt={moviesDetail?.original_title || ""}
                width={250}
                height={380}
                priority
              />
            </div>
          )}

          <Detail
            data={moviesDetail}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
        </div>
      </div>

      <Similar
        id={parseInt(movieId as string)}
        data={moviesDetail}
        sectionName={"Similar Movies"}
        sectionType="similar movies"
      />
    </>
  );
};

export default MovieDetailPage;
