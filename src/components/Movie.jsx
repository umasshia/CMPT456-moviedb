import React from "react";
import {useNavigate} from 'react-router-dom';

const Movie = (props) => {
  const navigate= useNavigate();

  const handleClick=()=>{
    navigate(`/${props.genre}/${props.item.id}`)
  }

  return (
    <div className="w-[180px] sm:w-[250px] md:w-[300px] lg:w-[310px] inline-block cursor-pointer relative p-4 z-0 ">
    { props.item.poster_path === null ? (
      <div>
      <img
        className="w-full h-auto hover:opacity-50"
        src={require("../img/placeholder.jpg")}
        alt=""
        onClick={handleClick}
      />
      <div onClick={handleClick} className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white px-5">
        <div className="flex w-11/12 overflow-y m-auto absolute pl-5 pt-5">
          <p className="text-xs font-bold">{props.item?.title} </p>
        </div>
      </div>
    </div>
    ) : (
    <div className=" ">
      <img
        className="w-full h-auto hover:opacity-50 "
        src={`https://image.tmdb.org/t/p/w500${props.item?.poster_path}`}
        onClick={handleClick}
        alt=""
      />
      <div onClick={handleClick} className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white px-5">
        <div className="block justify-center items-center absolute top-8 right-8 ">
          <p className="text-xs font-bold">{props.item?.title} </p>
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Movie;
