import React from "react";
import {useNavigate} from 'react-router-dom';

const Movie = (props) => {
  const navigate= useNavigate();

  const handleClick=()=>{
    navigate(`/${props.item.id}`)
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[220px] lg:w-[240px] inline-block cursor-pointer p-2 relative border-4 border-double border-[#FFFDE3]">
    { props.item.poster_path === null ? (
      <div>
      <img
        className="w-full h-auto hover:opacity-50"
        src={require("../img/placeholder.jpg")}
        alt=""
        onClick={handleClick}
      />
      <div onClick={handleClick} className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-[#FFFDE3] px-5 text-right">
        <div className="flex w-11/12 overflow-y m-auto absolute self-right top-4 ">
          <p className="text-s font-bold">{props.item?.title} </p>
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
      <div onClick={handleClick} className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-[#FFFDE3] px-5">
        <div className="flex w-11/12 overflow-y m-auto absolute self-right top-4 ">
          <p className="text-s font-bold">{props.item?.title} </p>
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Movie;
