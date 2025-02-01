import apiClient from "../apiClient";

export const fetchPopularMovies = async (page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/movie/popular?language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async (page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchMovies = async (name: string, page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/search/movie?query=${name}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMoviesDetails = async (id: number) => {
  try {
    const response = await apiClient.get(
      `/movie/${id}?append_to_response=videos,credits`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};

export const fetchSimilarMoviesApi = async (movie_id: number) => {
  try {
    const response = await apiClient.get(`/movie/${movie_id}/similar`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};

export const fetchVideos = async (id?: number) => {
  try {
    const response = await apiClient.get(`/movie/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
