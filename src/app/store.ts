import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../services/movieApi';
import selectedMoviesReducer from '../features/selectedMovies/selectedMoviesSlice';

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    selectedMovies: selectedMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
