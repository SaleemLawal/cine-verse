"use client";
import { useMovies } from "@/context/MoviesContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./movieDetailPage.module.scss";
import Image from "next/image";
import MovieSection from "@/components/movieSection/MovieSection";

const MovieDetailPage = () => {
  const { fetchMoviesById, moviesDetail, fetchSimilarMovies } = useMovies();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchData() {
      await fetchMoviesById(parseInt(movieId as string));
      await fetchSimilarMovies(parseInt(movieId as string));
      setImageLoaded(false);
      setBgLoaded(false);
    }
    fetchData();
  }, [movieId, fetchMoviesById, fetchSimilarMovies]);

  return (
    <>
      <div
        className={`${styles.overview} ${bgLoaded ? styles.loaded : ""}`}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${moviesDetail?.poster_path})`,
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${moviesDetail?.poster_path}`}
          alt=""
          width={1}
          height={1}
          onLoad={() => setBgLoaded(true)}
          style={{ display: "none" }}
          priority
        />
        <div className={`${styles.content} ${bgLoaded ? styles.visible : ""}`}>
          <div className={styles.poster}>
            <Image
              className={styles.posterImage}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${moviesDetail?.poster_path}`}
              alt={moviesDetail?.original_title || ""}
              width={250}
              height={380}
              priority
            />
          </div>

          <div className={styles.detail}>
            <h2 className={styles.title}>{moviesDetail?.original_title}</h2>
            {/* render the genres */}
            <div className={styles.genres}>
              {moviesDetail?.genres?.map((genre, index) => (
                <span key={index}>{genre.name}</span>
              ))}
            </div>
            <p>{moviesDetail?.overview}</p>

            {/* Render the top 4 casts */}
            <h3>Top Casts</h3>
            <div className={styles.casts}>
              {moviesDetail?.credits?.cast?.slice(0, 4).map((cast) => (
                <div
                  key={cast.id}
                  className={styles.cast}
                  data-loaded={imageLoaded}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${cast.profile_path}`}
                    alt={cast.name}
                    width={100}
                    height={100}
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />
                  <small>{cast.name}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={"wrapper"}>
        <main className={"page-content"}>
          <div className={styles["container"]}>
            {moviesDetail?.videos?.results?.splice(0, 2).map((video) => {
              return (
                <div key={video.id} className={styles["video-container"]}>
                  <h2 className={`${styles.title} `}>{video.name}</h2>
                  <iframe
                    width="912"
                    height="480"
                    src={`https://www.youtube.com/embed/${video.key}`}
                  />
                </div>
              );
            })}
          </div>
          <MovieSection
            sectionName={"Similar Movies"}
            sectionType="similar movies"
          />
        </main>
      </div>
    </>
  );
};

export default MovieDetailPage;

