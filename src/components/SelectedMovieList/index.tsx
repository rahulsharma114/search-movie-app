import React, { type JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { removeMovie } from "../../features/selectedMovies/selectedMoviesSlice";
import type { RootState } from "../../app/store";
import MovieCard from "./MovieCard";

export const SelectedMovieList: React.FC = (): JSX.Element => {
    const movies = useAppSelector(
        (state: RootState) => state.selectedMovies.movies
    );
    const dispatch = useAppDispatch();

    return (
        <div className="w-full max-w-xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4 text-left sm:text-xl sm:text-left">
                Selected Movies
            </h2>

            {movies.length > 0 ? (
                <div className="max-h-[450px] overflow-y-auto pr-1">
                    <ul className="space-y-4">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onRemove={() => dispatch(removeMovie(movie.id))}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-gray-500 text-center sm:text-left">
                    No Movies Selected
                </div>
            )}
        </div>
    );
};
