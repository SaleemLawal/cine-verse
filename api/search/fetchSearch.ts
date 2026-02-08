import apiClient from "../apiClient";

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: "movie" | "tv";
}

export const searchMulti = async (query: string, page: number = 1): Promise<SearchResult[]> => {
  try {
    const response = await apiClient.get(
      `/search/multi?query=${encodeURIComponent(query)}&page=${page}&language=en-US`
    );
    
    // Transform results to include media_type and normalize title/name
    const results: SearchResult[] = response.data.results
      .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      .map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        name: item.name || item.title,
        original_title: item.original_title || item.original_name,
        original_name: item.original_name || item.original_title,
        overview: item.overview || "",
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        release_date: item.release_date || item.first_air_date,
        first_air_date: item.first_air_date || item.release_date,
        vote_average: item.vote_average || 0,
        media_type: item.media_type,
      }));
    
    return results;
  } catch (error) {
    console.error("Error searching multi:", error);
    throw error;
  }
};
