import React, { useState, useEffect } from "react";
import axios from "axios";

import Movie from "./Movie";

const List = ({ fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page)
    // eslint-disable-next-line
  }, [page]);

  const fetchData = async (pgNum) => {
    await axios.get(fetchURL + pgNum)
    .then((response) => {
        setMovies(response.data.results);
      })
    .catch((error) => {
      console.log(error);
    });
  }

  const loadLess = () => {
    setPage((prevState) => prevState - 1)
    console.log(page);
  }

  const loadMore = () => {
    setPage((prevState) => prevState + 1)
    console.log(page);
  }

  const loadLessTwo = () => {
    setPage((prevState) => prevState - 2)
    console.log(page);
  }

  const loadMoreTwo = () => {
    setPage((prevState) => prevState + 2)
    console.log(page);
  }


  return (
    <div className="h-70vhtop-20">
      <div className="items-center pt-10 ">
      </div>
      <div className="relative flex items-center ml-2 group">
        <div className='w-full h-full scroll-smooth scrollbar-hide relative break-words ml-12'>
          {movies.map((item) => {
            return (
              <Movie key={item.id} item={item} ></Movie>
            );
          })}
        </div>      
      </div>
      <div className="flex items-center justify-center mt-10">
          
          {page <= 2 ? (
            <div></div>
          ) : (
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-5 mr-2 ml-2" onClick={loadLessTwo} disabled={page<2 ? true: false}>
            &lt;&lt; 
          </button>
          )}
          {page === 1 ? (
            <div></div>
          ) : (
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-5 ml-2 mr-2" onClick={loadLess} disabled={page<2 ? true: false}>
            {page-1}
          </button>
          )}
          <button className="bg-red-800 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-5 mr-2 ml-2" disabled={true}>
            {page}
          </button>
          {page < 15 ? (
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-5 ml-2 mr-2" onClick={loadMore} disabled={page>15 ? true: false}>
              {page+1}
            </button>
            ) : (
            <div></div>
          )}
          {page < 14 ? (
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-5 ml-2 mr-2" onClick={loadMoreTwo} disabled={page>15 ? true: false}>
              &gt;&gt; 
            </button>
          ) : (
            <div></div>
          )}
      </div>    
    </div>
  );
};

export default List;




