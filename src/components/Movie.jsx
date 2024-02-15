import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import {db} from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import '../../src/index.css'

const Movie = ({movie}) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const {user} = UserAuth()
    const defaultMovieImage = "/imgs/movieDefault.png";

    const movieID = doc(db, 'users', `${user?.email}`)
    const saveShow = async () =>{
        if (user?.email){
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID,{
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path
                })
            })
        } else {
            alert('Please log in to save a movie')
        }
    }
    
    
  return (
    // 
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[285px]  inline-block cursor-pointer relative mb-2  '>
            <img className='w-full h-auto block rounded max-h-[150px]'src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : defaultMovieImage} alt={movie?.title} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white rounded border hover:border-white px-4 py-2 hover:border-spacing-2'>
                <Link to={`/movieDetail/${movie.id}`}>
                <p className='white-space-normal text-xs md:text-sm font-bold flex text-wrap justify-center items-center h-full text-center wrap rounded '>
                    {movie?.title}
                </p>
                </Link>
                <p onClick={saveShow}>
                    {like ? (
                        <FaHeart className='absolute top-4 left-4 text-gray-300'/>
                    ) : (
                        <FaRegHeart className='absolute top-4 left-4 text-gray-300'/>
                    )}
                </p>
            </div>
        </div>
    // 
  )
}

export default Movie