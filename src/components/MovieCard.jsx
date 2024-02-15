
const MovieCard = ({ movie }) => {
  const { title, poster_path} = movie;
  const defaultMovieImage = 'src/assets/imgs/movieDefault.png';

  return (
    <div className="movie">
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultMovieImage}
        alt={title}
      />
      <h2 className="movieTitle">{title}</h2>
    </div>
  );
};


export default MovieCard;
