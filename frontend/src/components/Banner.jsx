import React, { useContext, useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiGlass, CiSearch, CiVolumeHigh } from "react-icons/ci";
import axois from "axios";
import { Link } from "react-router-dom";
import myContext from "../context/myContext";


const Banner = () => {

const categoryArray=["Weather","Entertainment","Tech","Clothes","Other"]
const {search,setSearch}=useContext(myContext)

  return (
    <>
      <div className="w-[90%] sm:w-[80%] mx-auto text-white mt-4 border border-white p-4 rounded-2xl">
        <div className="flex items-center flex-col md:flex-row justify-between gap-4 mt-10 mb-7">
          <div className="flex flex-col w-full md:w-[60%] gap-4 ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl  font-bold ">Discover New Articles here</h1>
            <p className="text-xs sm:text-sm">
            "Words have the power to inspire, create, and transform. Welcome to a world where thoughts come to life – welcome to our blog!"
            </p>
          </div>
          <div className="flex gap-3 text-2xl ">
           <a href="https://instagram.com/allabout.mandar?igshid=NGExMmI2YTkyZg==" target="blank" ><FaInstagram className="cursor-pointer" /></a> 
           <a href="https://github.com/mandarsd18" target="blank">
           <FaGithub className="cursor-pointer"/>
           </a>
            <a href="https://www.linkedin.com/in/mandar-deshmukh-ab6479235" target="blank" > <FaLinkedin className="cursor-pointer"/></a>
           <a href="https://x.com/iam_mandar18?t=vrCQXcc2V3OhLLFVK9KmKA&s=09" target="blank"><FaTwitter className="cursor-pointer"/></a>
            
          </div>
        </div>
        <div className="flex justify-between flex-col items-center gap-4">
          <div className="w-full flex border items-center gap-2 border-white p-2 rounded-3xl">
            <CiSearch className="text-xl font-bold" />
            <input type="text" className="w-full bg-transparent placeholder:text-white border border-none focus:border-none focus:outline-none"   placeholder="Search Here" onChange={(e)=>setSearch(e.target.value)}  value={search} />
          </div>

          <div className="w-full mt-2 mb-2 ">
            <div className="w-full h-full overflow-x-scroll p-4 whitespace-nowrap scroll-smooth scrollbar-hide" >
            <Link to={"/all-blogs"} className="mr-4 font-semibold text-lg">All</Link>
              {categoryArray.map((item) => (
               <Link key={item._id} to={`/category/${item}`} className="mr-4 font-semibold text-lg">{item}</Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Banner;
