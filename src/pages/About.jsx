import React from 'react'
import Navbar from '../components/Navbar';

const About = () => {
    return (
    <div>
        <Navbar />
            <div className='w-full text-[#FFFDE3]'>
            <h1 className='watchlist-header'>About This Website</h1>
            </div>
            <div className='credits'>
            <div className='credits-text'>
                This is my first app made using React! <br />
                OMDB and TMDB APIs were utilized in this project.
            </div>
            <div className='credits-img'>
                <a href="https://www.themoviedb.org/documentation/api">
                <img 
                className="credits-logo"
                src={require("../img/tmdbapi.png")} 
                href="https://www.themoviedb.org/"
                alt='' 
                />
                </a>
                <a href='https://www.omdbapi.com/'>
                <img 
                className="credits-logo"
                src={require("../img/omdbapi.png")} 
                alt='' 
                />
                </a>
            </div>
            <div className='credits-text'>
                Feel free to also visit my github for the source code!
            </div>
            <div className='credits-img'>
            <a href='https://www.github.com/umasshia/cmpt456-moviedb'>
                <img 
                className="credits-logo-git"
                src={require("../img/github.png")} 
                alt='' 
                />
                </a>
            </div>
            </div>
    </div>
    )
}

export default About;
