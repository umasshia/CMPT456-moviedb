import React from "react";
import {useNavigate} from 'react-router-dom';
import Preview from "./Peview";

const Movie = (props) => {
  const navigate= useNavigate();

  const handleClick=()=>{
    navigate(`/${props.item.id}`)
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
        <div className="poster-title-container">
          <p className="poster-title">{props.item?.title} </p>
          <Preview item={props.item}></Preview>
        </div>
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
        <div className="poster-title-container">
          <p className="poster-title">{props.item?.title} </p>
          <br />
          <Preview item={props.item}></Preview>
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Movie;
