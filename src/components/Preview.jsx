import React, { useEffect, useState } from "react";

const Preview = (props) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

    const movieId = props.id;
    const mediaType = props.mediaType;

    const [omdbId, setOmdbId] = useState('');
    const [tomatoScore, setTomatoScore] = useState([]);
    const [metaScore, setMetaScore] = useState([]);
    const [imdbScore, setImdbScore] = useState([]);
    const [title, setTitle] = useState([])
    const [genres, setGenres] = useState([])
    const [date, setDate] = useState([])
    const [runtime, setRuntime] = useState([])
    const [seasons, setSeasons] = useState([])

    const [type, setType] = useState('movie')

    const tmdbUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/external_ids?api_key=${key}`;
    const omdbUrl = `https://www.omdbapi.com/?apikey=${omdbKey}&type=${type}&i=${omdbId}`;

    useEffect(() => {   
        if(mediaType === 'tv'){
            setType('series');
        }
        fetch(tmdbUrl)
        .then((response) => response.json())
        .then((data) => {
            let imId = data.imdb_id;
            console.log(data.imdb_id)
            setOmdbId(imId)
        })
        .catch((error) => {
            console.log(error);
        })        
        fetch(omdbUrl)
        .then((response) => response.json())
        .then((data) => {     
            if(data.Ratings !== undefined) {
                let tomato = data.Ratings.find(({ Source }) => Source === "Rotten Tomatoes");
                if(tomato === undefined) { 
                    setTomatoScore('N/A')  
                }else{
                    setTomatoScore(tomato.Value)
                }
            }
            
            data.imdbRating !== undefined ? setImdbScore(data.imdbRating) : setImdbScore('N/A')
            data.Metascore !== undefined ? (setMetaScore(data.Metascore)) : setMetaScore('N/A')
            data.Title !== undefined ? (setTitle(data.Title)) : setTitle('N/A')
            data.Runtime !== undefined ? (setRuntime(data.Runtime)) : setRuntime('N/A')
            data.Released !== undefined ? (setDate(data.Released)) : setDate('N/A')
            data.Genre !== undefined ? (setGenres(data.Genre)) : setGenres('N/A')
            data.totalSeasons !== undefined ? (setSeasons(data.totalSeasons)) : setSeasons('N/A')      
            
        })
        .catch((error) => {
            console.log(error);
        }); 
    }, [mediaType,tmdbUrl,omdbUrl]);

    return (
        <div className="movie-preview">
            <p className="poster-title">{title}</p>
            <div className="rating">
                <img 
                className="movie-info-logo"
                src={require("../img/imdb-icon.png")} 
                alt='' 
                />
                &nbsp;	
                {imdbScore}{" "}
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
                {metaScore}{" "}	 
            </div>
            <div>
                Released:&nbsp;  {date}{" "}
            </div>
            {mediaType === 'movie' ? (
                <div>
                Runtime:&nbsp;  {runtime} 
                </div>
            ) : (
                <div>
                Total Seasons:&nbsp; {seasons}
                </div>    
            )}
            <div className="preview-genres">
                Genres:&nbsp; {genres}
            </div>
        </div>
    );
};

export default Preview;
