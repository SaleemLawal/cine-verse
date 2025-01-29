import apiClient from "../apiClient";
export const fetchPopularMovies = async () => {
  try {
    const response = await apiClient.get(
      `/movie/popular?language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await apiClient.get(
      "/movie/top_rated?language=en-US&page=1"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchTopRatedSeries = async () => {
  try {
    const response = await apiClient.get(
      "/tv/top_rated?language=en-US&page=1"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchPopularSeries = async () => {
  try {
    const response = await apiClient.get(
      "/tv/popular?language=en-US&page=1"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchVideos = async (movie_id: number) => {
  try {
    const response = await apiClient.get(`/movie/${movie_id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
