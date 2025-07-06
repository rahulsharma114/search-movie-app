import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movie';

interface State {
  movies: Movie[];
}

const initialState: State = { movies: [] };

const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      if (!state.movies.find((movie) => movie.id === action.payload.id)) {
        state.movies.push(action.payload);
      }
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = selectedMoviesSlice.actions;
export default selectedMoviesSlice.reducer;