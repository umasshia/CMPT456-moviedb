import React, { useEffect, useState } from "react";
import axios from "axios";


const Preview = (props) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const omdbKey = process.env.REACT_APP_OMDB_API_KEY;
    const movieId = props.item?.id;

    const [omdbId, setOmdbId] = useState('');
    const [omdbData, setOmdbData] = useState([]);
    const [tmdbData, setTmdbData] = useState([]);
    const [tomatoScore, setTomatoScore] = useState([]);

    console.log(props.item?.imdb_id)

    useEffect(() => {
        axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos`
        ).then((response) => {
            setTmdbData(response.data);
            let omId = response.data.imdb_id;
            setOmdbId(omId);
        }).catch((error) => {
            console.log(error);
        })
    }, [omdbId,key,omdbKey,movieId]);
    
    useEffect(() => {
        axios.get(
        `https://www.omdbapi.com/?apikey=${omdbKey}&i=${omdbId}`
        ).then((response) => {
            setOmdbData(response.data);
            let tomato = response.data.Ratings.find(({ Source }) => Source === "Rotten Tomatoes");
            if(tomato === undefined) { 
                setTomatoScore('N/A')  
            }else{
                setTomatoScore(tomato.Value)
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [omdbId, omdbKey, movieId, tomatoScore]);


    return (
        <div className="movie-preview">
            <div className="rating">
                <img 
                className="movie-info-logo"
                src={require("../img/imdb-icon.png")} 
                alt='' 
                />
                &nbsp;	
            {omdbData.imdbRating}{" "}
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
                {omdbData.Metascore}{" "}	 
            </div>
            <div>
                Released:&nbsp;  {tmdbData?.release_date}{" "}
            </div>
            <div>
                Runtime:&nbsp;  {tmdbData?.runtime} min
            </div>
            <div className="preview-genres">
                Genres:&nbsp; 
                {tmdbData.genres &&
                    tmdbData.genres.slice(0, 2).map((genre, i) => (
                    <span key={i} className="">
                        {genre.name};&nbsp;
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Preview;
