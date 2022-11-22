import React, { useEffect, useState } from "react";

const Preview = (props) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

    const movieId = props.id;
    const mediaType = props.mediaType;

    const [omdbId, setOmdbId] = useState('');
    const [tomatoScore, setTomatoScore] = useState([]);
    const [omdbData, setOmdbData] = useState([]);

    const [type, setType] = useState('movie')

    const tmdbUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/external_ids?api_key=${key}`;
    const omdbUrl = `https://www.omdbapi.com/?apikey=${omdbKey}&type=${type}&i=${omdbId}`;

    useEffect(() => {   
        mediaType === 'tv' ? setType('series') : setType(mediaType);
        fetch(tmdbUrl)
        .then((response) => response.json())
        .then((data) => {
            setOmdbId(data.imdb_id)
        })
        .catch((error) => {
            console.log(error);
        })        
        
    }, [mediaType,tmdbUrl,omdbId]);

    console.log(omdbId)

    useEffect(() => {
        fetch(omdbUrl)
        .then((response) => response.json())
        .then((data) => {     
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
    },[omdbUrl])

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
            <div className="preview-genres">
                Genres:&nbsp; {omdbData?.Genre}
            </div>
        </div>
    );
};

export default Preview;
