import React, { useState, useEffect } from "react";

import Movie from "./Movie";

const SimilarList = ({ mediaType, fetchURL }) => {


    const [movies, setMovies] = useState([]);

    useEffect(() => {
    fetch(fetchURL + 1)
    .then((response) => response.json())
    .then((data) => setMovies(data.results))
    .catch((error) => {
        console.log(error);
    });
    }, [fetchURL]);

    return (
    <div>
        <div className="movie-similar-container">
            <div className='movie-similar-list'>
                {movies.map((item) => {
                return (
                    <Movie mediaType={mediaType} key={item.id} item={item} ></Movie>
                )
                })}
            </div>      
        </div>   
    </div>
    );
    };

export default SimilarList;




