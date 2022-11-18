import React, { useState } from "react"
import List from "../components/List"
import Search from "../components/Search"


const Home = () => {

  const key = process.env.REACT_APP_TMDB_API_KEY

  const [movieTitle, setTitle] = useState("");

  const handleInput = (e) => {
    setTitle(e.target.value);
    console.log(movieTitle);
  }

  const requestList = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=`;

  const requestSearch = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieTitle}&page=`;

  return (
    <div> 
      {/^(.{2,})$/.test(movieTitle) ? (
        <div> 
          <Search handleInput={handleInput} />
          <List fetchURL={requestSearch} />
        </div>
      ) : (
        <div> 
          <Search handleInput={handleInput} />        
          <List fetchURL={requestList} />
        </div>
      )}
    </div>
  )
}

export default Home;