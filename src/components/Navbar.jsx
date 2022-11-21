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
    <div className="navbar">
      <Link to="/">
        <h1 className="moviedb">
          moviedb
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/watchlist">
            <button className="clear-btn">Watchlist</button>
          </Link>
          <button
            onClick={handleLogOut}
            className="reg-btn"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/logIn">
            <button className="clear-btn">Log In</button>
          </Link>
          <Link to="/register">
            <button className="reg-btn">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
