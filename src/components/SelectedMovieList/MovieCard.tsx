import { Link } from "react-router";
import type { Movie } from "../../types/movie";
import type { JSX } from "react";

const MovieCard: React.FC<{ movie: Movie; onRemove: () => void }> = ({ movie, onRemove }): JSX.Element => (
    <li
      key={movie.id}
      className="border p-3 rounded-md flex sm:flex-row flex-col sm:items-center gap-4 bg-white shadow-sm"
    >
      {movie.image?.medium && (
        <img
          src={movie.image.medium}
          alt={movie.name}
          className="sm:w-24 w-full h-auto rounded object-cover mx-auto sm:mx-0"
        />
      )}
      <div className="flex-1 sm:text-left text-center">
        <Link
          to={`/movie/${movie.id}`}
          className="text-lg font-bold text-blue-600 hover:underline"
        >
          {movie.name}
        </Link>
        <p className="text-sm text-gray-600">
          Rating: {movie.rating?.average ?? "N/A"}
        </p>
      </div>
      <div className="text-center sm:text-right">
        <button
          onClick={onRemove}
          className="text-sm text-red-500 font-bold hover:underline cursor-pointer"
        >
          Remove
        </button>
      </div>
    </li>
  );
  
  export default MovieCard;