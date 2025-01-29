"use client";
import { useState, useEffect } from "react";
import { fetchNowPlaying } from "@/api/movies/fetchMovies";

import { MovieItem } from "@/types/Movie";

// simulate an algo that would switch the background image every 5 seconds from the items returned from calling fetchNowPlaying
const useNowPlayingBackdrop = () => {
  const [data, setData] = useState<MovieItem[]>([]);
  const [index, setIndex] = useState(0);
  const [currentMovie, setcurrentMovie] = useState<MovieItem | null>(null);
  const [nextMovie, setnextMovie] = useState<MovieItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await fetchNowPlaying();
        setData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setcurrentMovie(data[0]);
      setnextMovie(data[0]);
    }
  }, [data]);

  // useEffect + dependency would be interval every 5 seconds, incrementing setIndex and looping back, setting backgorundImage state to current image path of index
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        const nextIndex = (index + 1) % data.length;
        setnextMovie(data[nextIndex]);
        setIsTransitioning(true);

        setTimeout(() => {
          setcurrentMovie(data[nextIndex]);
          setIndex(nextIndex);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [data, index]);

  return { currentMovie, nextMovie, isTransitioning };
};

export default useNowPlayingBackdrop;
