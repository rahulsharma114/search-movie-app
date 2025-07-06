import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie } from "../types/movie";

interface TVMazeSearchResponse {
  show: Movie;
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.tvmaze.com/" }),
  endpoints: (builder) => ({
    searchShows: builder.query<Movie[], string>({
      query: (searchTerm) => `search/shows?q=${searchTerm}`,
      transformResponse: (response: TVMazeSearchResponse[]) =>
      response.map((item) => item.show),
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useSearchShowsQuery } = movieApi;
