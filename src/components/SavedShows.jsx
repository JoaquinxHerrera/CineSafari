import React, {useState, useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext';
import {db} from '../firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const SavedShows = () => {
  const [movies, setMovies] = useState([])
  const {user} = UserAuth()
  const defaultMovieImage = "/imgs/movieDefault.png";

  const slideLeft = () =>{
    let slider = document.getElementById('slider' )
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () =>{
      let slider = document.getElementById('slider')
      slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShow = async (passedID) => {
    try{
      const result = movies.filter((movie)=>movie.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result,
      });
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
        <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
        <div className='relative flex items-center group'>
            <MdChevronLeft 
            className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideLeft}
            />
            <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                { movies ? (
                  movies.map((movie, id) =>(
                      <div  key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                        <img className='w-full h-auto block max-h-[150px] rounded'src={movie.img ? `https://image.tmdb.org/t/p/w500/${movie.img}` : defaultMovieImage} alt={movie?.title} />
                        <div className='absolute top-2 left-2  w-[144px] h-[81px] sm:h-[103px] sm:w-[184px] md:w-[224px] md:h-[126px] lg:w-[264px] lg:h-[148px] rounded hover:bg-black/80 opacity-0 hover:opacity-100 text-white border hover:border-white px-4 py-2 hover:border-spacing-2'>
                          <Link 
                            to={`/movieDetail/${movie.id}`}
                            className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                            {movie?.title}
                          </Link>
                          <p onClick={()=>deleteShow(movie.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose/></p>
                        </div>
                    </div>
                ))
                ) : (
                  <p>Loading...</p>
                )}
            </div>
            <MdChevronRight 
            className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
            size={40}
            onClick={slideRight}
            />
        </div>
    </div>
  )
}

export default SavedShows