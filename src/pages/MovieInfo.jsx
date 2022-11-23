import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import Youtube from "react-youtube";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import Navbar from "../components/Navbar";
import SimilarList from "../components/SimilarList";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion,doc,updateDoc,onSnapshot } from "firebase/firestore"; 


const MovieInfo = () => {
  const params = useParams();
  const key = process.env.REACT_APP_TMDB_API_KEY;
  const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

  const movieId = params.movieId;
  const mediaType = params.mediaType;

  console.log(params.movieId)
  console.log(params.mediaType)

  const [omdbData, setOmdbData] = useState([]);
  const [tmdbData, setTmdbData] = useState([]);
  const [tomatoScore, setTomatoScore] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState([]);
  const [like, setLike] = useState(false);
  const [type, setType] = useState('')

  const tmdbSimilarUrl = `https://api.themoviedb.org/3/${params.mediaType}/${params.movieId}/similar?api_key=${key}&language=en-US&page=1`;
  const {user} = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${params.mediaType}/${params.movieId}?api_key=${key}&append_to_response=videos`)
    .then((response) => response.json())
    .then((data) => { 
      setTmdbData(data);
      const trailerid = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailerid ? trailerid : data.videos.results[0]);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [key, params.mediaType, params.movieId]);

  useEffect(() => {   
    params.mediaType === 'tv' ? setType('series') : setType(params.mediaType);
    fetch(`https://api.themoviedb.org/3/${params.mediaType}/${params.movieId}/external_ids?api_key=${key}`)
    .then((response) => response.json())
    .then((data) => {
        fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&type=${type}&i=${data.imdb_id}`)
        .then((response) => response.json())
        .then((data) => {     
        console.log(data)
        setOmdbData(data)
        if(data.Ratings !== undefined) {
            let tomato = data.Ratings.find(({ Source }) => Source === "Rotten Tomatoes");
            if(tomato === undefined) { 
                setTomatoScore('N/A')  
            }else{
                setTomatoScore(tomato.Value)
            }
        }
        })
        .catch((error) => {
            console.log(error);
        });          
    })
    .catch((error) => {
        console.log(error);
    })        
    
}, [key, params.mediaType, params.movieId, omdbKey, type]);

  useEffect(() => {
    onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
      setSaved(doc.data()?.savedMovies)
      for(var i = 0; i < doc.data()?.savedMovies.length; i++){
        if(doc.data()?.savedMovies[i].id === tmdbData.id){
          setLike(true) 
        }
      }
    });
  }, [movieId, user?.email,tmdbData.id,tomatoScore]);

  const deleteMovie = async() => {
    try{
      // eslint-disable-next-line
      const result = saved.filter((item)=> toString(item.id) != movieId)
      await updateDoc(movieID,{
        savedMovies: result
      })
      setLike(false)
    }catch (error) {
      console.log(error)
    }
  }

  const saveMovie = async() => {
    if (user?.email){
      if(like === false){
        setLike(!like)
        updateDoc(movieID,{
          savedMovies:arrayUnion({
            id: tmdbData.id,
            title: omdbData.Title,
            img:tmdbData.poster_path,
            type:mediaType
          })
        })
      }
    } 
    else{
      alert ("You have to be logged in to save movies!")
    }
  }

  return (
    <>
    <Navbar />
    <div className="movie-info">
      
      {showModal ? (
        <div>
          <div className="trailer-container">
            <div>
              {}
                <div>
                  <button
                    className="trailer-close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                {}
                  <Youtube
                    videoId={trailer.key}
                    className="trailer-video"
                    opts={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                {}
              </div>
          </div>
          <div className="trailer-info-cover"></div>
        </div>
      ) : null}
      <div className="movie-info-container">
        <div className="movie-info-poster">
          { tmdbData.poster_path === null ? (
            <img
              className=""
              src={require("../img/placeholder.jpg")}
              alt=""
            />
          ) : (
            <img
              className=""
              src={`https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`}
              alt=""
            />
          )}
        </div>
        <div className="movie-info-text">
          <p className="movie-info-title">
              {omdbData?.Title}{" "}
          </p>
          <div className="movie-info-stats">
            <div className="movie-info-ratings">
              <div className="rating">
                <img 
                className="movie-info-logo"
                src={require("../img/imdb-icon.png")} 
                alt='' 
                />
                &nbsp;	
                {omdbData?.imdbRating}{" "}
              </div>
              <div className="rating">
                <img 
                className="movie-info-logo"
                src={require("../img/tomato.png")} 
                alt='' 
                />
                &nbsp;	
                {tomatoScore}{" "}
              </div>
              <div className="rating">
                <img 
                className="movie-info-logo"
                src={require("../img/metascore.png")} 
                alt='' 
                />
                &nbsp; 
                {omdbData?.Metascore}{" "}	 
              </div>
            </div>
            <div className="movie-info-general">
              <div>
                Director:&nbsp;  {omdbData?.Director}{" "}
              </div>
              <div>
                Writer:&nbsp;  {omdbData?.Writer}{" "}
              </div>
              <div>
                Cast:&nbsp;  {omdbData?.Actors}{" "}
              </div>
              <div>
                Released:&nbsp;  {omdbData?.Released}{" "}
              </div>
              {mediaType === 'movie' ? (
                <div>
                Runtime:&nbsp;  {omdbData?.Runtime} 
                </div>
              ) : (
                <div>
                Total Seasons:&nbsp; {omdbData?.totalSeasons}
                </div>    
              )}
              <div>
                Genres:&nbsp; {omdbData?.Genres}
              </div>
            </div>
          </div>
          <div className="movie-info-summary">
            {tmdbData.overview} 
          </div>
          <div className="movie-info-btns">
            <button
            onClick={() => setShowModal(true)}
            className="trailer-btn"
            >
              <IoMdPlay /> {" "}
              Trailer
            </button>              
            {like ? (
              <div onClick={deleteMovie} className="bookmark-btn">
                <FaBookmark />
              </div>
            ) : (
              <div onClick={saveMovie}className="bookmark-btn">
                <FaRegBookmark />
              </div>
            )}
          </div>
        </div>
      </div>
        <div>
          <p className="might-also-like">You might also like: </p>
          <SimilarList mediaType={params.mediaType} fetchURL={tmdbSimilarUrl} />
        </div>
    </div>
    </>
  );
};

export default MovieInfo;
