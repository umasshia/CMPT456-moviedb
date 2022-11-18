import React, { useState } from "react"
import List from "../components/List"
import Search from "../components/Search"
import Genre from "../components/Genre"


const Home = () => {

  const key = process.env.REACT_APP_TMDB_API_KEY

  const [movieTitle, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  const handleInput = (e) => {
    setTitle(e.target.value);
  }

  const handleGenreChange = (e) => {
    setGenre(e.target.id);
    console.log(requestList);
  }

  const requestList = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genre}&page=`;

  const requestSearch = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieTitle}&page=`;

  return (
    <div> 
      <Search handleInput={handleInput} />
      {/^(.{2,})$/.test(movieTitle) ? (
        <div> 
          <List fetchURL={requestSearch} />
        </div>
      ) : (
        <div> 
          <Genre handleGenreChange={handleGenreChange} />
          <List fetchURL={requestList} />
        </div>
      )}
    </div>
  )
}

export default Home;