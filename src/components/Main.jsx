import axios from 'axios'
import React, { useEffect, useState } from 'react'
import requests, { getMovieDetails, getMovieVideos } from '../Request'
import VideoModal from './VideoModal'

const Main = () => {
    const [movies, setMovies] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videos, setVideos] = useState(null); // Agrega el estado para almacenar los videos
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);

    useEffect(() => {
      axios.get(requests.requestPopular)
        .then((response) => {
          setMovies(response.data.results);
          setRandomMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)]);
        })
        .catch((error) => {
          console.error('Error fetching movies', error);
        });
    }, []);
  
    useEffect(() => {
      const fetchAndSetVideos = async () => {
        if (randomMovie) {
          try {
            const fetchedVideos = await getMovieVideos(randomMovie.id);
            setVideos(fetchedVideos);
          } catch (error) {
            console.error('Error fetching movie videos', error);
            setVideos([]);
          }
        }
      };
  
      const fetchMovieDetails = async () => {
        if (randomMovie) {
          try {
            const fetchedTrailers = await getMovieVideos(randomMovie.id);
            setTrailers(fetchedTrailers);
          } catch (error) {
            console.error('Error fetching movie details', error);
          }
        }
      };
  
      fetchAndSetVideos();
      fetchMovieDetails();
    }, [randomMovie]);
  
    const openVideoModal = () => {
      setSelectedVideo(videos[0]);
      setIsModalOpen(true);
    };
  
    const truncateString = (str, num) => {
      if (str?.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    };

  return (
    <div className='w-full h-[800px] text-white'> 
        <div className='w-full h-full'>
            <div className='absolute w-full h-[800px] gradient' ></div>
            <img 
            className='w-full h-full object-cover' 
            src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`} 
            alt={randomMovie?.title} 
            />
            <div className='absolute w-full top-[25%]  mt-20 md:pl-16'>
                <h1 className='text-3xl md:text-5xl font-bold'>{randomMovie?.title}</h1>
                <div className='my-4'>
                    <button 
                        className='border bg-gray-300 text-black border-gray-300 py-2 px-5'
                        onClick={() => openVideoModal(videos[0])}
                        >Play
                    </button>
                    <button className='border  text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
                </div>
                <p className='text-gray-400 text-sm'>Released: {randomMovie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                    {truncateString(randomMovie?.overview, 150)}
                </p>
            </div>
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
  )
}

export default Main