import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
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
    <div className="bg-black flex item-center justify-between p-4 z-100 w-full block">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          Movie Database
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-[#FFFDE3] px-6 py-2   cursor-pointer bg-red-600 hover:bg-red-800 mr-3">Watchlist</button>
          </Link>
          <button
            onClick={handleLogOut}
            className="text-[#FFFDE3] px-6 py-2   cursor-pointer bg-red-600 hover:bg-red-800 "
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/logIn">
            <button className="text-[#FFFDE3] px-6 py-2   cursor-pointer bg-red-600 hover:bg-red-800 mr-3">Log In</button>
          </Link>
          <Link to="/register">
            <button className="text-[#FFFDE3] px-6 py-2   cursor-pointer bg-red-600 hover:bg-red-800">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
