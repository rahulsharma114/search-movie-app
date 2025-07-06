import type { JSX } from "react";
import MovieSearch from "../components/MovieSearch";
import { SelectedMovieList } from "../components/SelectedMovieList";

const Home: React.FC = (): JSX.Element => {
  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      <section className="mb-8">
        <MovieSearch />
      </section>
      <section>
        <SelectedMovieList />
      </section>
    </main>
  );
};

export default Home;
