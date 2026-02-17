import React, { use, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink ,Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";


const Navbar = () => {

  const { logOut, user } = use(AuthContext);
  const navigate=useNavigate()
  // responsive nav 
  const [activeRes, setActiveRes] = useState(false);
  const handleActiveRes = () => {
    setActiveRes(!activeRes)
  }

  // logout function
  const handleLogOut = () => {
    logOut().then(res => {
      toast.info('success')
      navigate('/')
    }).catch(err => {
      console.log(err)
    })
  }
  // all nav bar link
  const links = (
    <>
      <li className=" btn btn-primary btn-outline">
        <Link to="/register">Register</Link>
      </li>
      {user ? (
        <button onClick={handleLogOut} className=" btn btn-primary">
         LogOut
        </button>
      ) : (
        <li className=" btn btn-primary">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

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
          <Link to='/' className="font-bold">
            LoNexus-<span className="text-primary">School</span>
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
