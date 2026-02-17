import React from "react";
import { Link } from "react-router";

const links = (
  <>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/">About</Link>
    </li>
    <li>
      <Link to="/">Contact</Link>
    </li>
    <li>
      <Link to="/id-card-maker">Id Card Maker</Link>
    </li>
  </>
);

const Navbar = () => {
  return (
    <header className="top-0 border-b/10 shadow py-4 sticky bg-white z-50 ">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        {/* logo */}
        <div className="logo text-2xl font-semibold">
          <Link>
            Lo<span className="text-primary">Go</span>
          </Link>
        </div>

        {/* desktop nav */}
        <nav>
          <ul className="flex gap-5">{links}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
