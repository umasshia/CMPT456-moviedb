import React from 'react'
import SavedMovies from '../components/SavedMovies'

const Watchlist = () => {
  return (
    <div>
      <div className='w-full text-white'>
        <div className='w-full h-[400px] object-cover'></div>
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'>
        </div>
          <h1 className='absolute right-0 left-0 bottom-0 top-[20%] text-3xl md:text-5xl font-bold text-center'>Watchlist</h1>
      </div>
      <SavedMovies />
    </div>
  )
}

export default Watchlist;