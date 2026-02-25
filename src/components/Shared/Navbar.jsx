import React, { use, useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { logOut, user } = use(AuthContext);
  const navigate = useNavigate();
  // responsive nav
  const [activeRes, setActiveRes] = useState(false);
  const handleActiveRes = () => {
    setActiveRes(!activeRes);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "nexusdark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // logout function
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        toast.info("success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // all nav bar link
  const links = (
    <>
      <li>
        {/* <button onClick={toggleTheme} className="btn btn-ghost text-xl">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button> */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-lg transition-transform duration-300 hover:rotate-180"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </li>
      <li className=" btn btn-soft ">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      {user ? (
        <button onClick={handleLogOut} className=" btn btn-primary">
          LogOut
        </button>
      ) :
        (
          <>
            <li className=" btn btn-ghost btn-outline border-gray-300">
              <Link to="/login">Login</Link>

            </li>
            <li className=" btn btn-info ">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

    </>
  );

  return (
    // <header className="top-0 border-b/10 shadow py-4 sticky bg-white z-50 ">
    <header
      className="top-0 border-b border-base-300 shadow py-4 sticky 
    bg-base-100 z-50 transition-colors duration-300"
    >
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        {/* mobile nav */}
        <div className="logo text-2xl font-semibold flex items-center  space-x-3">
          <div className=" relative  md:hidden ">
            <span className=" cursor-pointer" onClick={handleActiveRes}>
              <FaBarsStaggered />
            </span>
            {activeRes && (
              // <nav className=" absolute -left-4 top-11 bg-gray-50 p-3 rounded-b-xl z-50 min-h-screen">
              <nav
                className="absolute -left-4 top-11 bg-base-200 p-3 
              rounded-b-xl z-50 min-h-screen shadow-lg"
              >
                <ul className=" space-y-3">{links}</ul>
              </nav>
            )}
          </div>
          {/* logo */}
          <Link to="/" className="font-bold">
            Nexus-<span className="text-primary">School</span>
          </Link>
        </div>

        {/* desktop nav */}
        <nav className=" hidden xl:block">
          <ul className="flex gap-5 ">{links}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
