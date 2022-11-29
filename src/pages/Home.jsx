import React, { useState } from "react"

import List from "../components/List"
import Search from "../components/Search"
import Genre from "../components/Genre"
import Bottom from "../components/Bottom"
import { useEffect } from "react"


const Home = () => {

  const key = process.env.REACT_APP_TMDB_API_KEY

  const [movieTitle, setTitle] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [url, setUrl] = useState("");

  //eslint-disable-next-line
  useEffect(() => {
    if(genre !== '99999'){
      setUrl(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}&with_genres=${genre}&page=`);
    }
  },)
  
  const handleMediaType = (e) => {
    setMediaType(e.target.id);
    setGenre()
    setUrl(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}&with_genres=${genre}&page=`);
  }

  const handleInput = (e) => {
    setTitle(e.target.value);
    setUrl(`https://api.themoviedb.org/3/search/${mediaType}?api_key=${key}&query=${movieTitle}&page=`);
  }


  const handleGenreChange = (e) => {
    if(e.target.id === '99999'){   
      setGenre('99999')
      setUrl(`https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${key}&page=`)
    }else{
      
      setGenre(e.target.id);
      setUrl(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}&with_genres=${e.target.id}&page=`);
    }
  }

  return (
    <div> 
      <Search mediaType={mediaType} handleMediaType={handleMediaType} handleInput={handleInput} />
      {/^(.{2,})$/.test(movieTitle) ? (
        <div> 
          <List mediaType={mediaType} fetchURL={url} />
        </div>
      ) : (
        <div> 
          <Genre genreSelection={genre} mediaType={mediaType} handleGenreChange={handleGenreChange} />
          <List mediaType={mediaType} fetchURL={url} />
        </div>
      )}
      <Bottom />
    </div>
  )
}

export default Home;