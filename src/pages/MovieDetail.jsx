import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { FaHeart, FaPlayCircle, FaRegHeart } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import CircularRate from '../components/CircularRate';
import { UserAuth } from '../context/AuthContext';
import { getMovieCredits, getMovieDetails, getMovieVideos, getRelatedMovies } from '../Request';
import {db} from '../firebase'
import VideoModal from '../components/VideoModal'
import Movie from '../components/Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [saved, setSaved] = useState(false)
  const [like, setLike] = useState(false)
  const [videos, setVideos] = useState(null); // Agrega el estado para almacenar los videos
  const [selectedVideo, setSelectedVideo] = useState(null); // Nuevo estado para el video seleccionado
  const {user} = UserAuth()
  const [trailers, setTrailers] = useState([]);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const defaultMovieImage = "/imgs/movieDefault.png";
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slideLeft = () =>{
    let slider = document.getElementById('slider' )
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () =>{
      let slider = document.getElementById('slider')
      slider.scrollLeft = slider.scrollLeft + 500;
  };

  const movieID = doc(db, 'users', `${user?.email}`)
  const saveShow = async () =>{
    if (user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID,{
            savedShows: arrayUnion({
                id: movieDetails.id,
                title: movieDetails.title,
                img: movieDetails.backdrop_path
            })
        })
    } else {
        alert('Please log in to save a movie')
    }
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const loadRelatedMovies = async () => {
    try {
      // Llama a la función getRelatedMovies para obtener las películas relacionadas
      const relatedMoviesData = await getRelatedMovies(id);
      setRelatedMovies(relatedMoviesData);
    } catch (error) {
      console.error('Error fetching related movies:', error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        console.log('Movie Details:', details);
        setMovieDetails(details);

        const trailers = await getMovieVideos(id);
        setTrailers(trailers);

        const castDetails = await getMovieCredits(id);
        const mainActors = castDetails.cast.filter((actor)=>actor.order <= 5 && actor.profile_path)
        setCast(mainActors)
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

    const fetchAndSetVideos = async () => {
      try {
        const fetchedVideos = await getMovieVideos(id);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching movie videos', error);
        setVideos([]);
      }
    };

    
   
    loadRelatedMovies();
    fetchAndSetVideos();
    fetchMovieDetails();
  }, [id]);



  if (!movieDetails || !trailers || !cast) {
    return <p>Loading...</p>;
  }

  return (
    <div className='w-full h-[800px] text-white'> 
      <div className='absolute w-full h-[800px] gradient-detail' ></div>
      <img 
        className='w-full h-full object-cover' 
        src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`} 
        alt={movieDetails?.title} 
      />
      <div className='absolute top-[25%] flex justify-center mt-20 '>
        <div className='flex justify-end'>
          <img 
            className='w-[60%] object-cover' 
            src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`} 
            alt={movieDetails?.title}
          />
        </div>
        <div className='ml-7 w-[40%]'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movieDetails?.title}</h1>
          <div className='flex gap-3 py-9'>
            <CircularRate value={movieDetails.vote_average} />
            {Array.isArray(movieDetails.genres) &&
              movieDetails.genres.map((genre) => (
              <p 
                className='text-white button-gradient py-1 px-3 h-9 mt-2'
                key={genre.id}>{genre.name}
              </p>
            ))}
          </div>
          <p className='text-gray-400 text-sm'>Released: {movieDetails?.release_date}</p>
          <p>
            {movieDetails?.overview}
          </p>
          <div className='flex'>
            <button 
              className='rounded bg-red-500 flex py-2 px-3 gap-3 mt-5 mr-2 font-bold'
              onClick={() => openVideoModal(videos[0])}
              >
                <FaPlayCircle className='text-white  text-2xl' />WATCH TRAILER
            </button>
              
            <button 
              className='button-gradient flex gap-3 mt-5 py-2 px-7 font-bold'
              onClick={saveShow}
            >
              ADD TO FAVORITES
            {like ? (
              <FaHeart className='text-white mt-1'/>
            ):(
              <FaRegHeart className='text-white mt-1'/>
              )}
            </button>
          </div>
          {isModalOpen && (
                <VideoModal
                  video={selectedVideo}
                  onClose={() => {
                    setIsModalOpen(false);
                    setSelectedVideo(null);
                  }}
                />
          )}
        </div>
          
      </div>
      
      <h1 className='text-white font-bold text-center text-[2.2rem]'>Cast</h1>
      <div className="flex gap-4 mt-5 mb-5 justify-center">
        {cast.map(actor => (
          <div key={actor.id}>
            {actor.profile_path ? (
              <img
                className="w-32 h-42 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div className="w-24 h-36 bg-gray-400 rounded-md flex justify-center items-center text-gray-600">
                No Image
              </div>
            )}
            <p className="text-center mt-1">{actor.name}</p>
          </div>
        ))}
      </div>

      <div className="relatedMovies mt-20 pb-20">
        <h1 className='text-white font-bold text-center text-[2.2rem] mb-5'>Related Movies</h1>
        <div className='relative flex items-center group'>
            <MdChevronLeft 
            className='bg-gray left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideLeft}
            />
            <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {relatedMovies.map((movie) =>(
                    <div  key={movie.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                      <img className='w-full h-auto  block max-h-[150px] rounded'src={movie.image} alt={movie?.title}  />
                      <div className='absolute top-2 left-2  w-[144px] h-[81px] sm:h-[103px] sm:w-[184px] md:w-[224px] md:h-[126px] lg:w-[264px] lg:h-[148px] rounded hover:bg-black/80 opacity-0 hover:opacity-100 text-white border hover:border-white px-4 py-2 hover:border-spacing-2'>
                        <Link to={`/movieDetail/${movie.id}`}>
                          <p 
                              className='white-space-normal text-wrap text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                              {movie?.title}
                          </p>
                        </Link>
                        
                      </div>
                  </div>
                ))}
            </div>
            <MdChevronRight 
            className='bg-gray right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideRight}
            />
        </div>
      </div>
    </div>
  )
}

export default MovieDetail