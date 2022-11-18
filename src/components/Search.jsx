import React from 'react';

const Search = ({ handleInput }) => {

	return (
		<div className=" w-1/2 text-gray-700 m-auto text-xl font-light ">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="block w-full border text-[#FFFDE3] border-gray-300 py-2 px-6 bg-transparent" 
				onChange={handleInput}
			/>
		</div>
	)
}

export default Search;