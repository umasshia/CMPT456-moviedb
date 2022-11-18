import React from 'react';

const Search = ({ handleInput }) => {

	return (
		<section className="block w-1/2 m-auto p-4 text-gray-700 text-xl font-light mt-2 mb-5">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="block w-full m-auto border text-[#FFFDE3] border-gray-300 py-2 px-6 bg-transparent" 
				onChange={handleInput}
			/>
		</section>
	)
}

export default Search;