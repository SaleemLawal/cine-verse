"use client";
import React from "react";
import { Season } from "@/types/Movie";
import styles from "./SeasonSelector.module.scss";
import { Button } from "@/components/ui/button";

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeason: number | null;
  onSelectSeason: (seasonNumber: number) => void;
  seriesId: number;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  selectedSeason,
  onSelectSeason,
}) => {
  // Filter out season 0 (specials) and sort by season number
  const validSeasons = seasons
    .filter((season) => season.season_number > 0)
    .sort((a, b) => a.season_number - b.season_number);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Seasons</h3>
      <div className={styles.seasonsGrid}>
        {validSeasons.map((season) => (
          <Button
            key={season.id}
            variant={selectedSeason === season.season_number ? "default" : "outline"}
            size="lg"
            className={`${styles.seasonButton} ${
              selectedSeason === season.season_number ? styles.active : ""
            }`}
            onClick={() => onSelectSeason(season.season_number)}
          >
            <div className={styles.seasonContent}>
              <span className={styles.seasonNumber}>Season {season.season_number}</span>
              {season.episode_count > 0 && (
                <span className={styles.episodeCount}>
                  {season.episode_count} {season.episode_count === 1 ? "episode" : "episodes"}
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector;
