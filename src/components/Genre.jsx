import React from 'react';

const Genre = ({ handleGenreChange }) => {

	const genres = [
		{
			genre: "Popular",
			id: ""
		},
		{
			genre: "Action",
			id: "28"
		},
		{
			genre: "Adventure",
			id: "12"
		},
		{
			genre: "Animation",
			id: "16"
		},
		{
			genre: "Comedy",
			id: "35"
		},
		{
			genre: "Drama",
			id: "18"
		},
		{
			genre: "Family",
			id: "10751"
		},
		{
			genre: "Fantasy",
			id: "14"
		},
		{
			genre: "History",
			id: "36"
		},
		{
			genre: "Horror",
			id: "27"
		},
		{
			genre: "Music",
			id: "10402"
		},
		{
			genre: "Mystery",
			id: "9648"
		},
		{
			genre: "Romance",
			id: "10749"
		},
		{
			genre: "Science Fiction",
			id: "878"
		},
		{
			genre: "Thriller",
			id: "53"
		},
		{
			genre: "War",
			id: "10752"
		},
		{
			genre: "Western",
			id: "37"
		},
	]

	return (
		<div className="w-4/5 m-auto">
			<div className ="flex overflow-scroll scrollbar-hide">
				{genres.map((genre, index) => (
				<div key={index} 
					className="flex items-center text-[#FFFDE3] px-6 cursor-pointer hover:bg-gray-300 hover:text-[#141515] mr-3 " 
					id={genre.id}
					onClick={handleGenreChange}
				>
						{genre.genre}</div>
				))}
			</div>
		</div>
	)
}

export default Genre;