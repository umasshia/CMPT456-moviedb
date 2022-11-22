import React from "react";
import {useNavigate} from 'react-router-dom';
import Preview from "./Preview";

const Movie = (props) => {
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/${props?.mediaType}/${props.item.id}`)
  }

  return (
    <div className="movie-container">
    { props.item.poster_path === null ? (
      <div>
      <img
        className="movie-poster"
        src={require("../img/placeholder.jpg")}
        alt=""
        onClick={handleClick}
      />
      <div onClick={handleClick} className="movie-poster-cover">
        <Preview mediaType={props?.mediaType} item={props.item}></Preview>
      </div>
    </div>
    ) : (
    <div>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${props.item?.poster_path}`}
        onClick={handleClick}
        alt=""
      />
      <div onClick={handleClick} className="movie-poster-cover">
        <Preview mediaType={props?.mediaType} item={props.item}></Preview>
      </div>
    </div>
    )}
    </div>
  );
};

export default Movie;
