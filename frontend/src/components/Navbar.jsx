import React, { useContext, useState } from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


const Navbar = () => {
  const navRef = useRef();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const UserId=localStorage.getItem("userId")

 

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const logout=()=>{
    setCookies("access_token","")
    window.localStorage.removeItem("userId");
    console.log("User Logout successfully")
    toast.success('User Logout Successfully !!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    navigate("/login")
  }
  return (
    <>
      <div className="w-full h-16 shadow-md sticky top-0 left-0 right-0 z-50 bg-[#131313] ">
        <header className="flex items-center justify-between h-full w-[90%] sm:w-[80%] text-white mx-auto">
          <Link className="text-2xl sm:text-3xl font-bold text-white" to="/">
            Blogify
          </Link>
          <nav ref={navRef} className="flex items-center z-50">
            <Link
              className="mx-4 hover:text-gray-200  font-semibold text-lg cursor-pointer"
              to="/"
            >
              Home
            </Link>
           
            <Link
              className=" mx-4 hover:text-gray-200  font-semibold text-lg cursor-pointer"
              to="/all-blogs"
            >
              All Blogs
            </Link>
            {
              UserId ? <Link
              className=" mx-4 hover:text-gray-200  font-semibold text-lg cursor-pointer"
              to="/create-blog"
            >
              Create Blog
            </Link>:""
            }
            {
              UserId ? <Link
              className=" mx-4  hover:text-gray-200 text-lg font-semibold cursor-pointer"
              to="/my-blogs"
            >
              My blogs
            </Link>:""
            }
            
            
            {
          !cookies.access_token ?  <Link className="mt-5 md:mt-0 mx-4 text-white rounded-md hover:bg-blue-700 text-base font-semibold  bg-blue-600 py-1.5 px-4 " to="/register">
            Register
          </Link> 
          :<button  className="mt-5 md:mt-0 mx-4 text-white rounded-md hover:bg-blue-700 text-base font-semibold  bg-blue-600 py-1.5 px-4 " onClick={logout}>Logout</button>
        }
            {/* <Link
              className="mt-5 md:mt-0 mx-4 text-black rounded-3xl  text-base font-semibold  bg-white py-1.5 px-4 cursor-pointer "
              to="/register"
            >
              Register
            </Link> */}

            <button
              className="nav-btn nav-close-btn md:hidden"
              onClick={showNavbar}
            >
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn md:hidden" onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
      </div>
    </>
  );
};

export default Navbar;
