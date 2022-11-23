import React from 'react';

const Genre = ({ genreSelection,mediaType,handleGenreChange }) => {

	const movieGenres =[
		{id:'',genre:"Popular"},
		{id:99999,genre:"Top Rated"},
		{id:28,genre:"Action"},
		{id:12,genre:"Adventure"},
		{id:16,genre:"Animation"},
		{id:35,genre:"Comedy"},
		{id:80,genre:"Crime"},
		{id:99,genre:"Documentary"},
		{id:18,genre:"Drama"},
		{id:10751,genre:"Family"},
		{id:14,genre:"Fantasy"},
		{id:36,genre:"History"},
		{id:27,genre:"Horror"},
		{id:10402,genre:"Music"},
		{id:9648,genre:"Mystery"},
		{id:10749,genre:"Romance"},
		{id:878,genre:"Science Fiction"},
		{id:10770,genre:"TV Movie"},
		{id:53,genre:"Thriller"},
		{id:10752,genre:"War"},
		{id:37,genre:"Western"}]

	const tvGenres = [
		{id:'',genre:"Popular"},
		{id:99999,genre:"Top Rated"},
		{id:10759,genre:"Action & Adventure"},
		{id:16,genre:"Animation"},
		{id:35,genre:"Comedy"},
		{id:80,genre:"Crime"},
		{id:99,genre:"Documentary"},
		{id:18,genre:"Drama"},
		{id:10751,genre:"Family"},
		{id:10762,genre:"Kids"},
		{id:9648,genre:"Mystery"},
		{id:10763,genre:"News"},
		{id:10764,genre:"Reality"},
		{id:10765,genre:"Sci-Fi & Fantasy"},
		{id:10766,genre:"Soap"},
		{id:10767,genre:"Talk"},
		{id:10768,genre:"War & Politics"},
		{id:37,genre:"Western"}]

	return (
		<div className="genre-list-container">
			{mediaType === 'movie' ? (
				<div className ="genre-list">
					{movieGenres.map((genre, index) => (
					<div key={index} 
					// eslint-disable-next-line
						className={genre.id == genreSelection ? 'genre-selected' : 'genre'} 
						id={genre.id}
						onClick={handleGenreChange}
					>
					{genre.genre}</div>
					))}
				</div>
			) : (
				<div className ="genre-list">
					{tvGenres.map((genre, index) => (
					<div key={index} 
					// eslint-disable-next-line
						className={genre.id == genreSelection ? 'genre-selected' : 'genre'} 
						id={genre.id}
						onClick={handleGenreChange}
					>
					{genre.genre}</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Genre;