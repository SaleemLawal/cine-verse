"use client";
import { useMovies } from "@/context/MoviesContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import styles from "./seriesDetailPage.module.scss";
import Image from "next/image";
import Similar from "@/components/similar/Similar";
import Detail from "@/components/detail/Detail";
import SeasonSelector from "@/components/seasonSelector/SeasonSelector";
import EpisodeList from "@/components/episodeList/EpisodeList";
import EpisodeDetail from "@/components/episodeDetail/EpisodeDetail";

const SeriesDetailPage = () => {
  const {
    fetchSeriesById,
    seriesDetail,
    fetchSimilarSeries,
    fetchSeasonDetails,
    seasonDetail,
  } = useMovies();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const episodeDetailRef = useRef<HTMLDivElement>(null);

  const { seriesId } = useParams();
  const seriesIdNum = parseInt(seriesId as string);

  useEffect(() => {
    async function fetchData() {
      await fetchSeriesById(seriesIdNum);
      await fetchSimilarSeries(seriesIdNum);
      setImageLoaded(false);
      setBgLoaded(false);
      // Reset selections when series changes
      setSelectedSeason(null);
      setSelectedEpisode(null);
    }
    fetchData();
  }, [seriesId, fetchSeriesById, fetchSimilarSeries]);

  // Fetch season details when a season is selected
  useEffect(() => {
    if (selectedSeason !== null && seriesIdNum) {
      fetchSeasonDetails(seriesIdNum, selectedSeason);
      setSelectedEpisode(null); // Reset episode selection when season changes
    }
  }, [selectedSeason, seriesIdNum, fetchSeasonDetails]);

  const handleSeasonSelect = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
  };

  const handleEpisodeSelect = (episodeNumber: number) => {
    setSelectedEpisode(episodeNumber);
    // Scroll to episode detail after a short delay to ensure it's rendered
    setTimeout(() => {
      episodeDetailRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const selectedEpisodeData =
    seasonDetail?.episodes?.find(
      (ep) => ep.episode_number === selectedEpisode
    ) || null;

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const posterPath = seriesDetail?.poster_path;
  const posterImageUrl = imageBaseUrl && posterPath ? `${imageBaseUrl}${posterPath}` : null;

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
                alt={seriesDetail?.name || ""}
                width={250}
                height={380}
                priority
              />
            </div>
          )}

          <Detail
            data={seriesDetail}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
        </div>
      </div>

      <div className="wrapper">
        <main className="page-content">
          {selectedEpisode !== null && selectedEpisodeData && seasonDetail && (
            <div ref={episodeDetailRef}>
              <EpisodeDetail
                episode={selectedEpisodeData}
                seasonDetail={seasonDetail}
                seriesId={seriesIdNum}
                seasonNumber={selectedSeason!}
              />
            </div>
          )}

          {seriesDetail?.seasons && seriesDetail.seasons.length > 0 && (
            <SeasonSelector
              seasons={seriesDetail.seasons}
              selectedSeason={selectedSeason}
              onSelectSeason={handleSeasonSelect}
              seriesId={seriesIdNum}
            />
          )}

          {selectedSeason !== null && seasonDetail && (
            <EpisodeList
              episodes={seasonDetail.episodes || []}
              selectedEpisode={selectedEpisode}
              onSelectEpisode={handleEpisodeSelect}
              seasonNumber={selectedSeason}
            />
          )}
        </main>
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
