import { useMemo, useState, type JSX } from "react";
import GenericMultiSelect from "./GenericMultiSelect";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import {
    addMovie,
    removeMovie,
} from "../features/selectedMovies/selectedMoviesSlice";
import type { Movie } from "../types/movie";
import { useDebouncedFetch } from "../hooks/useDebouncedFetch.ts";

interface SearchResult {
    score: number;
    show: Movie;
}

const MovieSearch: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector((state) => state.selectedMovies.movies);
    const [query, setQuery] = useState("");

    const fetchMovies = async (query: string): Promise<Movie[]> => {
        try {
          const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
          const data = await res.json();
          return data.map((item: SearchResult) => item.show as Movie);
        } catch (error) {
          console.error("Failed to fetch movies", error);
          return [];
        }
      };

    const { data: options, loading } = useDebouncedFetch<Movie>({
        query,
        fetchFn: fetchMovies,
        dependencies: [selected],
    });

    const filteredOptions = useMemo(
        () => options.filter((movie) => !selected.some((sel) => sel.id === movie.id)),
        [options, selected]
    );

    const onSelect = (movie: Movie) => {
        dispatch(addMovie(movie));
        setQuery("");
    }

    const onRemove = (id: string | number) => {
        dispatch(removeMovie(Number(id)));
    }

    return (
        <GenericMultiSelect<Movie>
            query={query}
            onQueryChange={setQuery}
            options={filteredOptions}
            loading={loading}
            selectedItems={selected}
            onSelect={onSelect}
            onRemove={onRemove}
            getLabel={(movie) => movie.name}
            getKey={(movie) => movie.id}
            placeholder="Search movies..."
        />
    );
};

export default MovieSearch;
