import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 w-full">
        <header className="w-full h-20 bg-slate-50 drop-shadow-md">
          <div className=" flex items-center w-full h-full justify-between px-6">
            <a
              href="/"
              className="text-black pl-4"
              style={{ fontFamily: "lato", fontWeight: 800, fontSize: "40px" }}
            >
              Study Buddies
            </a>
            <nav>
                          <ul className="space-x-5 flex pr-4 ">
                              <li style={{ fontFamily: "lato", fontWeight: 600, fontSize: "20px" }}><Link to="/login">Log in</Link></li>
                <li style={{ fontFamily: "lato", fontWeight: 600, fontSize: "20px" }}><Link to="/signup">Sign Up</Link></li>
                <li style={{ fontFamily: "lato", fontWeight: 600, fontSize: "20px" }}><Link to="/chatPage">Chat</Link></li>
                <li style={{ fontFamily: "lato", fontWeight: 600, fontSize: "20px" }}><Link to="/dashboard">Dashboard</Link></li>
                <li style={{ fontFamily: "lato", fontWeight: 600, fontSize: "20px" }}><Link to="/profile">Profile Page</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
