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

export const fetchTopRatedSeries = async (page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/tv/top_rated?language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchPopularSeries = async (page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/tv/popular?language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
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
