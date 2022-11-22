import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

import Preview from "./Preview";

const SavedMovies = () => {
    const [movies,setMovies] = useState([])
    const {user}= UserAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
            setMovies(doc.data()?.savedMovies)
        })
    },[user?.email])

    const movieRef = doc(db,'users',`${user?.email}`)
    const deleteMovie = async(passId)=> {
      try{
        const result = movies.filter((item)=> item.id !== passId)
        await updateDoc(movieRef,{
          savedMovies: result
        })
      }catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      <div className= "list-wrap">
        <div className="movie-list">
          {movies.map((item) => (
            <div key={item.id} className="movie-container" onClick={() => navigate(`/${item.type}/${item.id}`)}>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${item?.img}`}
                alt=""
              />
              <div  className="movie-poster-cover">
                <div onClick={(e) => {
                  e.stopPropagation();
                  deleteMovie(item.id)
                  }} 
                  className="delete-icon">
                  <HiTrash />
                </div>
                <div className="movie-poster-cover">
                <div className="poster-title-container">
                    <Preview mediaType={item.type} item={item}></Preview>
              </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedMovies;
