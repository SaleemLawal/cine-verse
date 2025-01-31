import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MovieItem } from "@/types/Movie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterHelper = (data: MovieItem[], prev: MovieItem[]) => {
  const newMovies = data.filter(
    (movie: MovieItem) => !prev.some((prevMovie) => prevMovie.id === movie.id)
  );
  return newMovies;
};

export const renderHelper = (searchQuery: string, typeParam: string | null, type: string) => {
  let renderType = "";
  if (searchQuery) {
    renderType = `search ${type}`;
  } else if (!typeParam || typeParam === "popular") {
    renderType = `popular ${type}`;
  } else if (typeParam === "top_rated") {
    renderType = `top rated ${type}`;
  }
  return renderType;
};
