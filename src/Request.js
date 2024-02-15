import axios from "axios";

const TMDB_API_KEY = 'e25cdb95cf675bc05353541ff1df1195'
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const defaultMovieImage = "/imgs/movieDefault.png";

const requests = {
    requestPopular: `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    requestTopRated: `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
    requestTrending: `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=2`,
    requestHorror: `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27&page=1`,
    requestUpcoming: `${TMDB_API_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    requestComedy: `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35&page=1`,
    requestSciFi: `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&page=1`,
    
}

export const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `${TMDB_API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Error al obtener detalles de la película');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getMovieVideos = async (movieId) => {
    try {
      const response = await fetch(
        `${TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Error al obtener videos de la película');
      }
  
      const data = await response.json();

      const trailers = data.results.filter((video) =>
      video.type.toLowerCase().includes('trailer')
      );
      
      return trailers;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
};
export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movie credits');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRelatedMovies = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    
    // Verificar si se obtuvieron datos de respuesta correctamente
    if (response && response.data && response.data.results) {
      const relatedMovies = response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        genre: movie.genre_ids, // TMDb devuelve IDs de género, necesitarías mapearlos a nombres de género si es necesario
        image: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : defaultMovieImage // Ruta de la imagen de la película
      }));

      return relatedMovies;
    } else {
      console.error('Error fetching related movies: Invalid response');
      return [];
    }
  } catch (error) {
    console.error('Error fetching related movies:', error);
    throw error;
  }
};

export default requests