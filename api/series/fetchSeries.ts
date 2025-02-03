import apiClient from "../apiClient";

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

export const fetchSeries = async (name: string, page: number = 1) => {
  try {
    const response = await apiClient.get(
      `/search/tv?query=${name}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchSimilarSeriesApi = async (series_id: number) => {
  try {
    const response = await apiClient.get(`/tv/${series_id}/similar`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};

export const fetchSeriesDetails = async (series_id: number) => {
  try {
    const response = await apiClient.get(
      `/tv/${series_id}?append_to_response=videos,credits&language=en-US`
    );
    console.log("series detail", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};
