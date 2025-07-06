import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { removeMovie } from "../features/selectedMovies/selectedMoviesSlice";
import type { RootState } from "../app/store";
import type { JSX } from "react";

const stripHtml = (html: string): string =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";

const MovieDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state: RootState) =>
    state.selectedMovies.movies.find((m) => m.id === Number(id))
  );

  if (!movie) {
    return (
      <p className="text-center mt-10 text-gray-600">Movie not found.</p>
    );
  }

  const handleDelete = () => {
    dispatch(removeMovie(movie.id));
    navigate("/");
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:underline cursor-pointer"
          aria-label="Go back"
        >
          ← Back
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline cursor-pointer"
          aria-label="Delete movie"
        >
          Delete
        </button>
      </div>

      {movie.image?.medium && (
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="mx-auto rounded shadow"
        />
      )}

      <h1 className="text-3xl font-bold text-center">{movie.name}</h1>
      <p className="text-center text-gray-600">
        Rating: {movie.rating?.average ?? "N/A"}
      </p>

      <p className="text-gray-700 whitespace-pre-line">
        {movie.summary ? stripHtml(movie.summary) : "No summary available."}
      </p>
    </main>
  );
};

export default MovieDetail;
