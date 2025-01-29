"use client";
import { useState, useEffect } from "react";
import { fetchNowPlaying } from "@/api/movies/fetchMovies";

interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// simulate an algo that would switch the background image every 5 seconds from the items returned from calling fetchNowPlaying
const useNowPlayingBackdrop = () => {
  const [data, setData] = useState<MovieItem[]>([]);
  const [index, setIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [nextImageUrl, setNextImageUrl] = useState("");
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
      setCurrentImageUrl(data[0].backdrop_path);
      setNextImageUrl(data[0].backdrop_path);
    }
  }, [data]);

  // useEffect + dependency would be interval every 5 seconds, incrementing setIndex and looping back, setting backgorundImage state to current image path of index
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        const nextIndex = (index + 1) % data.length;
        setNextImageUrl(data[nextIndex].backdrop_path);
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentImageUrl(data[nextIndex].backdrop_path);
          setIndex(nextIndex);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 7500);
    return () => clearInterval(interval);
  }, [data, index]);

  return { currentImageUrl, nextImageUrl, isTransitioning };
};

export default useNowPlayingBackdrop;
