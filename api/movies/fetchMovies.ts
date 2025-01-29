import apiClient from "../apiClient";
export const fetchNowPlaying = async () => {
  try {
    const response = await apiClient.get(
      "/movie/now_playing?language=en-US&page=1"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};
