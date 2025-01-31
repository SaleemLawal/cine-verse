"use client";
import { useState, useEffect } from "react";
import { MovieItem } from "@/types/Movie";
import { useMovies } from "@/context/MoviesContext";

// simulate an algo that would switch the background image every 5 seconds from the items returned from calling fetchNowPlaying
const useNowPlayingBackdrop = () => {
  const { popularMovies } = useMovies();
  const [index, setIndex] = useState(0);
  const [currentMovie, setcurrentMovie] = useState<MovieItem | null>(null);
  const [nextMovie, setnextMovie] = useState<MovieItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (popularMovies.length > 0) {
      setcurrentMovie(popularMovies[0]);
      setnextMovie(popularMovies[0]);
    }
  }, [popularMovies]);

  // useEffect + dependency would be interval every 5 seconds, incrementing setIndex and looping back, setting backgorundImage state to current image path of index
  useEffect(() => {
    const interval = setInterval(() => {
      if (popularMovies.length > 0) {
        const nextIndex = (index + 1) % popularMovies.length;
        setnextMovie(popularMovies[nextIndex]);
        setIsTransitioning(true);

        setTimeout(() => {
          setcurrentMovie(popularMovies[nextIndex]);
          setIndex(nextIndex);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [popularMovies, index]);

  return { currentMovie, nextMovie, isTransitioning };
};

export default useNowPlayingBackdrop;
