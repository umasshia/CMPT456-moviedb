import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import Youtube from "react-youtube";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion,doc,updateDoc,onSnapshot } from "firebase/firestore"; 


const MovieInfo = () => {
  
  const params = useParams();
  const key = process.env.REACT_APP_TMDB_API_KEY;
  const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

  const movieId = params.movieId;

  const [omdbId, setOmdbId] = useState('');
  const [omdbData, setOmdbData] = useState([]);
  const [tmdbData, setTmdbData] = useState([]);
  const [tomatoScore, setTomatoScore] = useState(['', 45]);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState([]);
  const [like, setLike] = useState(false);
  const {user} = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos`
    ).then((response) => {
      setTmdbData(response.data);
      let omId = response.data.imdb_id;
      setOmdbId(omId);
      const trailerid = response.data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailerid ? trailerid : response.data.videos.results[0]);
    }).catch((error) => {
      console.log(error);
    })
  }, [omdbId,key,omdbKey,movieId]);

  useEffect(() => {
    axios.get(
    `https://www.omdbapi.com/?apikey=${omdbKey}&i=${omdbId}`
    ).then((response) => {
      setOmdbData(response.data);
      let tomato = response.data.Ratings;
      setTomatoScore(tomato[0].Value)
    }).catch((error) => {
        console.log(error);
    });
  }, [omdbId, omdbKey, movieId, tomatoScore]);

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

  const imd = parseFloat(omdbData.imdbRating);
  const meta = parseFloat(omdbData.Metascore)/10;
  const tmt = parseFloat(tomatoScore)/10;
  const avg = (imd + meta + tmt) / 3;

  const deleteMovie = async() => {
      try{
        // eslint-disable-next-line
        const result = saved.filter((item)=> item.id != params.movieId)
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
            title: tmdbData.title,
            img:tmdbData.poster_path
          })
        })
      }
    } 
    else{
      alert ("You have to be logged in to save movies!")
    }
  }

  return (
    <div>
      {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                    {}
                    <div className="flex items-start justify-between border-b p-2 ">
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-white opacity-100  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-white opacity-100  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        <AiOutlineClose/>
                        </span>
                      </button>
                    </div>
                    {}
                    <>
                      <Youtube
                        videoId={trailer.key}
                        className="w-[50vh] h-[50vh] md:w-[100vh] md:h-[60vh]"
                        opts={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </>

                    {}
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

        
        <div
          alt=""
          className="w-full h-[60vh] object-cover"
        >
        </div>
      <div className="flex justify-center ">
        <div className="flex flex-col items-center md:flex-row md:max-w-2xl lg:max-w-3xl absolute xl:max-w-4xl md:mt-[-300px] mt-[-200px] text-white ">
          <div className=" lg:w-[30%] h-auto md:h-[400px] w-[70%] overflow-hidden">
            { tmdbData.poster_path === null ? (
              <img
                className="w-[100%] h-full md:h-auto object-cover rounded-md"
                src={require("../img/placeholder.jpg")}
                alt=""
              />
            ) : (
              <img
                className="w-[100%] h-full md:h-auto object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`}
                alt=""
              />
            )}
          </div>
          <div className="float-left w-[70%] md:pl-12 ">
            <p className="text-3xl md:text-5xl mb-3 mt-3 md:mt-0">
              {tmdbData.title || tmdbData.original_title}{" "}
            </p>
            <div className="flex flex-row items-center ">
            <div className="text-base mb-2">	
                Ratings:	
                <p className="text-base">	
                  IMDB:&nbsp;	
                  {imd}{" "}
                </p>	
                <p className=" text-base">	
                  Rotten Tomatoes:&nbsp;	
                  {tmt}{" "}
                </p>	
                <p className="text-base">	
                  Metacritic:&nbsp; 
                  {meta}{" "}	
                </p>	
                <p className="text-base">	
                  Average:&nbsp;	
                  {avg.toFixed(1) ? avg.toFixed(1) : "N/A"}{" "}
               </p>
              </div>
              <div className="">
                <div className="">
                <p className="text-base md:text-base ml-20 mb-2">
                    Released:&nbsp;  {tmdbData?.release_date}{" "}
                  </p>
                  <p className="text-sm md:text-base mb-2 ml-20">
                    Runtime:&nbsp;  {tmdbData?.runtime} min
                  </p>
                </div>

                <div className="rid grid-flow-col auto-cols-max gap-4 mb-3 ml-20">
                  Genres:&nbsp; 
                  {tmdbData.genres &&
                    tmdbData.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="text-sm  md:text-base">
                        {genre.name};&nbsp;
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <p className="mb-8 mt-2">
            {tmdbData.overview} 
            </p>
            <div className="flex flex-row items-center ">
              <button
                onClick={() => setShowModal(true)}
                className="border rounded-xl text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:border-red-600 mb-8 md:mb-0"
              >
                <IoMdPlay className="mr-3" />
                Trailer
              </button>

              
                {like ? (
                  <p onClick={deleteMovie}  className="cursor-pointer">
                    <FaBookmark className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
                  </p>
                ) : (
                  <p onClick={saveMovie}className="cursor-pointer">
                    <FaRegBookmark className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
                  </p>
                )}
              
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
