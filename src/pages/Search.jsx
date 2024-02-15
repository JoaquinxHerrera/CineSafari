import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';

const Search = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const api_key = 'e25cdb95cf675bc05353541ff1df1195'; 

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    
    const handleSubmit = (e) =>{
      e.preventDefault()
      setPage(1);
      navigate(`/search?query=${search}`)
      setSearch('');
      setSearchPerformed(true);
    }

    const handleLoadMore = () => {
      setPage(page + 1); // Incrementa la página al hacer clic en "Load more movies"
  };
    
    const fetchMovies = async () =>{
      try{
        const response = await fetch(`${urlBase}?query=${query}&api_key=${api_key}&page=${page}`)
        const data = await response.json()
        setMovies((prevMovies) => (page === 1 ? data.results : [...prevMovies, ...data.results]));
      }catch(error){
        console.log("Error", error)
      }
    }

      useEffect(() => {
        if (query) {
          fetchMovies();
          setSearchPerformed(true);
        }
      }, [query, page]);

  return (
    <>
      <div className='mx-[3.2%]'>
        <div className='flex bg-blue w-full pt-[7%] gap-3 '>
          <form>
            <select 
              name="Filter" 
              id=""
              className="p-2 border border-gray-300 rounded"
            >
              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
              <option value="filter3">Filter 3</option>
            </select>
            
          </form>
          <form>
            <select 
              name="genres" 
              id=""
              className="p-2 border border-gray-300 rounded"
            >
              <option value="option1">Genre 1</option>
              <option value="option2">Genre 2</option>
              <option value="option3">Genre 3</option>
            </select>
          </form>

        </div>
        <div className=' my-5 '>
            <form onSubmit={handleSubmit} className=" ">
                    <input
                    type="text"
                    placeholder="Search your movie..."
                    value={search}
                    onChange={handleInputChange}
                    className="px-3 py-2 w-[97%] mb-7 border border-gray-300 rounded-full"
                    />
                    <button type='submit' className='button-gradient py-[9px] px-5 -ml-10 text-white font-bold'>Search</button>
            </form>

            {searchPerformed && movies.length === 0 && (
              <p className='text-white'>No results found for: "{query}"</p>
            )}

            {searchPerformed && movies.length > 0 && (
                <p className='text-white'>Results for: "{query}"</p>
            )}
            <div>
              <MovieList movies={movies}/>
            </div>
            <button 
              className='button-gradient w-full p-2 mt-7 text-white font-bold'
              onClick={handleLoadMore}
              >Load more movies
            </button>
            
        </div>
      </div>
    </>
  )
}

export default Search