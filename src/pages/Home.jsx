import React, { useState } from "react"

import List from "../components/List"
import Search from "../components/Search"
import Genre from "../components/Genre"
import Bottom from "../components/Bottom"


const Home = () => {

 

  const key = process.env.REACT_APP_TMDB_API_KEY

  const [movieTitle, setTitle] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [genre, setGenre] = useState("");
  
  const handleMediaType = (e) => {
    setMediaType(e.target.id);
    setGenre("")
  }

  const handleInput = (e) => {
    setTitle(e.target.value);
  }

  const handleGenreChange = (e) => {
    setGenre(e.target.id);
  }

  const requestList = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}&with_genres=${genre}&page=`;

  const requestSearch = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${key}&query=${movieTitle}&page=`;

  //const topRatedSearch = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=`;

  return (
    <div> 
      <Search mediaType={mediaType} handleMediaType={handleMediaType} handleInput={handleInput} />
      {/^(.{2,})$/.test(movieTitle) ? (
        <div> 
          <List mediaType={mediaType} fetchURL={requestSearch} />
        </div>
      ) : (
        <div> 
          <Genre genreSelection={genre} mediaType={mediaType} handleGenreChange={handleGenreChange} />
          <List mediaType={mediaType} fetchURL={requestList} />
        </div>
      )}
      <Bottom />
    </div>
  )
}

export default Home;