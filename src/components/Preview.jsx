import React, { useEffect, useState } from "react";
import axios from "axios";


const Preview = (props) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const omdbKey = process.env.REACT_APP_OMDB_API_KEY;
    const movieId = props.item?.id;
    const mediaType = props.mediaType;

    const [omdbId, setOmdbId] = useState('');
    const [omdbData, setOmdbData] = useState([]);
    const [tomatoScore, setTomatoScore] = useState([]);
    
    useEffect(() => {
        var type = 'movie';
        if(mediaType === 'tv'){
            type = 'series';
            axios.get(
                `https://api.themoviedb.org/3/tv/${movieId}/external_ids?api_key=${key}`
            ).then((response) => {
                let omId = response.data.imdb_id;
                setOmdbId(omId);
            }).catch((error) => {
                console.log(error);
            })
        }else {
            axios.get(
                `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${key}&append_to_response=videos`
            ).then((response) => {
                let omId = response.data.imdb_id;
                setOmdbId(omId);
            }).catch((error) => {
                console.log(error);
            })
        }             
        axios.get(
        `https://www.omdbapi.com/?apikey=${omdbKey}&type=${type}&i=${omdbId}`
        ).then((response) => {
            setOmdbData(response.data);
            if(response.data.Ratings !== undefined) {
                let tomato = response.data.Ratings.find(({ Source }) => Source === "Rotten Tomatoes");
                if(tomato === undefined) { 
                    setTomatoScore('N/A')  
                }else{
                    setTomatoScore(tomato.Value)
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [key, mediaType, movieId, omdbKey, omdbId]);
    
    console.log(omdbData)

    return (
        <div className="movie-preview">
            <p className="poster-title">{omdbData.Title}</p>
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
                Released:&nbsp;  {omdbData?.Released}{" "}
            </div>
            <div>
                Runtime:&nbsp;  {omdbData?.Runtime} 
            </div>
            <div className="preview-genres">
                Genres:&nbsp; {omdbData?.Genre}
            </div>
        </div>
    );
};

export default Preview;
