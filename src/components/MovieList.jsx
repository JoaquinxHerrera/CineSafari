import Movie from "./Movie";


const MovieList = ({ movies }) => {
  return (
    <div className="mt-5 flex items-center flex-wrap gap-3.5">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} /> 
      ))}
    </div>
  );
};

export default MovieList;