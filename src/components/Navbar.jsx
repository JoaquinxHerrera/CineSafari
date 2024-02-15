import React, { useRef, useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [search, setSearch] = useState('')
  const inputRef = useRef(null);


  const handleLogout = async () =>{
    try{
      await logOut();
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate(`/search?query=${search}`)
    setSearch('');
    toggleInputVisibility();
  }

  // const handleClickOutside = (e) =>{
  //   if(inputRef.current && !inputRef.current.contains(e.target) && isInputVisible){
  //     setIsInputVisible(false)
  //   }
  // }


  return (
    <div className='flex items-center justify-between p-4 px-[3.2%] z-[100] w-full absolute'>
      <Link to='/'>
        <img src="../imgs/logo.png" alt="" />
      </Link>
      <div className='flex items-center'>
        {user?.email ? (
          <>
            <button
              className={`text-white pr-4`}
              
            >
              <FaSearch className='text-2xl' onClick={toggleInputVisibility}/>
            </button>
            
            {isInputVisible && (
              <form onSubmit={handleSubmit} ref={inputRef} >
                <input
                  type="text"
                  placeholder="Search your movie..."
                  className={`mr-2 px-2 py-1.5 rounded transition-all duration-300 ${
                    isInputVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  value={search}
                  onChange={handleInputChange}
                  
                />
              </form>
            )}
            <Link to='/account'>
              <button className='pr-4'>
                <img className='w-11'src="../imgs/avatar.png" alt="" />
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className='button-gradient text-white font-bold px-6 py-2 rounded cursor-pointer '
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={`text-white pr-4 w-[30px] h-[30px]`}
              
            >
              <FaSearch onClick={toggleInputVisibility}/>
            </button>
            {isInputVisible && (
              <form onSubmit={handleSubmit} ref={inputRef} className='search-input'>
                <input
                  type="text"
                  placeholder="Search your movie..."
                  className={`mr-2 px-2 py-1.5 rounded transition-all duration-300 ${
                    isInputVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  value={search}
                  onChange={handleInputChange}
                  
                />
              </form>
            )}

            <Link to='/login'>
              <button className='text-white pr-4'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='button-gradient text-white font-bold px-6 py-2 rounded cursor-pointer'>Sign Up</button>
            </Link>
          </>
        )}
      </div>
      
    </div>
  )
}

export default Navbar