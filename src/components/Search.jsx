import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


const SearchNav = ( { handleInput }) => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex item-center justify-between p-4 z-100 w-4/5 m-auto ">
            <Link to="/">
                <h1 className="text-5xl font-bold cursor-pointer hover:text-gray-300">
                    moviedb
                </h1>
            </Link>
                <div className="w-1/2 text-gray-700 text-xl font-light ">
                    <input 
                        type="text" 
                        placeholder="Search for a movie..." 
                        className="block w-full border text-[#FFFDE3] border-gray-300 py-2 px-6 bg-transparent" 
                        onChange={handleInput}
                    />
                </div>
            {user?.email ? (
            <div>
                <Link to="/account">
                    <button className="text-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-gray-300 hover:text-[#141515] mr-3">Watchlist</button>
                </Link>
                <button
                onClick={handleLogOut}
                className="text-[#FFFDE3] border border-gray-300 px-6 py-2 cursor-pointer hover:bg-gray-300 hover:text-[#141515] "
                >
                Logout
                </button>
            </div>
            ) : (
            <div>
                <Link to="/logIn">
                    <button className="text-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-gray-300 hover:text-[#141515] mr-3">Log In</button>
                </Link>
                <Link to="/register">
                    <button className="text-[#FFFDE3] border border-gray-300 px-6 py-2 cursor-pointer hover:bg-gray-300 hover:text-[#141515]">
                        Register
                    </button>
                </Link>
            </div>
            )}
        </div>
    );
};

    export default SearchNav;
