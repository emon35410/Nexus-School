import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink ,Link } from "react-router";

const links = (
  <>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/">About</NavLink>
    </li>
    <li>
      <NavLink to="/">Contact</NavLink>
    </li>
    <li>
      <NavLink to="/id-card-maker">Id Card Maker</NavLink>
    </li>
  </>
);

const Navbar = () => {
  const [activeRes, setActiveRes] = useState(false);
  const handleActiveRes = () => {
    setActiveRes(!activeRes)
  }
  return (
    <header className="top-0 border-b/10 shadow py-4 sticky bg-white z-50 ">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        {/* mobile nav */}
        <div className="logo text-2xl font-semibold flex items-center  space-x-3">
          <div className=" relative  md:hidden ">
            <span className=" cursor-pointer" onClick={handleActiveRes}>
              <FaBarsStaggered />
            </span>
            {activeRes && (
              <nav className=" absolute -left-4 top-11 bg-gray-50 p-3 rounded-b-xl z-50 min-h-screen">
                <ul className=" space-y-3">{links}</ul>
              </nav>
            )}
          </div>
          {/* logo */}
          <Link>
            Lo<span className="text-primary">Go</span>
          </Link>
        </div>

        {/* desktop nav */}
        <nav className=" hidden xl:block">
          <ul className="flex gap-5">{links}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
