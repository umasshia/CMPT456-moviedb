import React from "react";
import { Link } from "react-router-dom";


const Bottom = () => {

  return (
    <div className="flex item-center justify-center p-4 z-100 w-11/12 m-auto ">  
        <div>
          <Link to="/about">
            <button className="text-[#FFFDE3] px-6 py-2 cursor-pointer hover:bg-[#FFFDE3] hover:text-[#141515] mr-3">About</button>
          </Link>
        </div>
    </div>
  );
};

export default Bottom;
