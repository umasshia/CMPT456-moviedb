import React, { useState, useEffect } from "react";
import { AiFillForward, AiFillBackward } from "react-icons/ai";
import axios from "axios";

import Movie from "./Movie";

const List = ({ fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(fetchURL + page)
    axios.get(fetchURL + page)
    .then((response) => {
        setMovies(response.data.results);
      })
    .catch((error) => {
      console.log(error);
    });
  }, [page, fetchURL]);


  return (
    <div>
      <div className="list-wrap">
        <div className='movie-list'>
          {movies.map((item) => {
            return (
              <Movie key={item.id} item={item} ></Movie>
            );
          })}
        </div>      
      </div>
      <div className="page-container">
          
          {page <= 2 ? (
            <div></div>
          ) : (
          <button className="page-btn" onClick={() => setPage(page - 2)} disabled={page<2 ? true: false}>
            <AiFillBackward />
          </button>
          )}
          {page === 1 ? (
            <div></div>
          ) : (
          <button className="page-btn" onClick={() => setPage(page - 1)} disabled={page<2 ? true: false}>
            {page-1}
          </button>

          )}
          <button className="curr-page-btn" disabled={true}>
            {page}
          </button>
          {page < 15 ? (
            <button className="page-btn" onClick={() => setPage(page + 1)} disabled={page>15 ? true: false}>
              {page+1}
            </button>
            ) : (
            <div></div>
          )}
          {page < 14 ? (
            <button className="page-btn" onClick={() => setPage(page + 2)} disabled={page>15 ? true: false}>
              <AiFillForward /> 
            </button>
          ) : (
            <div></div>
          )}
      </div>    
    </div>
  );
};

export default List;




