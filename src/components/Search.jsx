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
            <div className="flex justify-between">
            <Link to="/">
                <h1 className="text-5xl font-bold cursor-pointer hover:text-[#FFFDE3]">
                    moviedb
                </h1>
            </Link>
            <div className="w-1/2 text-[#FFFDE3] text-lg ">
                <input o
                    type="text" 
                    placeholder="Search..." 
                    className="block border-b text-[#FFFDE3] border-[#FFFDE3] py-3 px-6 bg-transparent placeholder:text-[#FFFDE3] placeholder:opacity-50" 
                    onChange={handleInput}
                />
            </div>
            </div>
            {user?.email ? (
            <div>
                <Link to="/watchlist">
                    <button className="text-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-[#FFFDE3] hover:text-[#141515] mr-3">Watchlist</button>
                </Link>
                <button
                onClick={handleLogOut}
                className="text-[#FFFDE3] border border-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-[#FFFDE3] hover:text-[#141515] "
                >
                Logout
                </button>
            </div>
            ) : (
            <div>
                <Link to="/logIn">
                    <button className="text-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-[#FFFDE3] hover:text-[#141515] mr-3">Log In</button>
                </Link>
                <Link to="/register">
                    <button className="text-[#FFFDE3] border border-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-[#FFFDE3] hover:text-[#141515]">
                        Register
                    </button>
                </Link>
            </div>
            )}
        </div>
    );
};

    export default SearchNav;
