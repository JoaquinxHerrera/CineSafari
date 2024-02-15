import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
          <img 
            className='w-full h-[400px] object-cover'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/5eea0e13-ba23-4c64-aa47-cda69315c9ef/AR-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
            alt="/" 
          />
          <div className='bg-black/60 fixed top-0 left-0 w-full h-[400px]'></div>
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
          </div>
      </div>
      <SavedShows/>
    </>
  )
}

export default Account