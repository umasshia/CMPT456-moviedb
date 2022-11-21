import React from 'react'
import Navbar from '../components/Navbar';
import SavedMovies from '../components/SavedMovies'

const Watchlist = () => {
  return (
    <div>
      <Navbar />
      <div className='watchlist-wrap'>
          <h1 className='watchlist-header'>Watchlist</h1>
      </div>
      <SavedMovies />
    </div>
  )
}

export default Watchlist;
