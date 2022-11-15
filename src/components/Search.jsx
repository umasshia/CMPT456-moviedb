import React from 'react';

const Search = ({ handleInput }) => {

	return (
		<section className="block w-full p-4 rounded-lg text-gray-700 text-xl font-light mt-5">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="block w-full border text-[#FFFDE3] rounded-2xl border-gray-300 py-2 px-6 bg-transparent" 
				onChange={handleInput}
			/>
		</section>
	)
}

export default Search;