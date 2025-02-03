"use client";
import { useMovies } from "@/context/MoviesContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./seriesDetailPage.module.scss";
import Image from "next/image";
// import MovieSection from "@/components/movieSection/MovieSection";
import Similar from "@/components/similar/Similar";
// import Cast from "@/components/cast/Cast";
import Detail from "@/components/detail/Detail";

const SeriesDetailPage = () => {
  const { fetchSeriesById, seriesDetail, fetchSimilarSeries } = useMovies();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);

  const { seriesId } = useParams();
  useEffect(() => {
    async function fetchData() {
      await fetchSeriesById(parseInt(seriesId as string));
      await fetchSimilarSeries(parseInt(seriesId as string));
      setImageLoaded(false);
      setBgLoaded(false);
    }
    fetchData();
  }, [seriesId, fetchSeriesById, fetchSimilarSeries]);

  return (
    <>
      <div
        className={`${styles.overview} ${bgLoaded ? styles.loaded : ""}`}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${seriesDetail?.poster_path})`,
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${seriesDetail?.poster_path}`}
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
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${seriesDetail?.poster_path}`}
              alt={seriesDetail?.name || ""}
              width={250}
              height={380}
              priority
            />
          </div>

          <Detail
            data={seriesDetail}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />

        </div>
      </div>
      <Similar
        data={seriesDetail}
        sectionName={"Similar Series"}
        sectionType="similar series"
      />
    </>
  );
};

export default SeriesDetailPage;
