import React from "react";
import { Link } from "react-router-dom";


const Bottom = () => {

  return (
    <div className="footer-container">  
        <div>
          <Link to="/about">
            <button className="about-btn">About</button>
          </Link>
        </div>
    </div>
  );
};

export default Bottom;
