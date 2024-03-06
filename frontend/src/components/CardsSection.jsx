import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import Pagination from "./Pagination";
import axois from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import myContext from "../context/myContext";
import { Bounce, toast } from "react-toastify";
import moment from 'moment';

const CardsSection = () => {
  const [postPerPage, setPostPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const userID = localStorage.getItem("userId");
  const [uiChange,setUiChange]=useState(false)
//  const[search,setSearch]=useState("web")
  const [data, setData] = useState([]);
  const {search}=useContext(myContext)
  //   console.log(category);
  const nav = useNavigate();
// const {setUiChange,uiChange}=useContext(blogContext)
  const getData = async () => {
    const res = await axois.get("http://localhost:4000/blogs/allBlogs");
    setData(res?.data?.allblog);
  };

  const deleteItem = async(id) => {
    await axios.delete(`http://localhost:4000/blogs/delete-blog/${id}`);
    setUiChange((prevState)=>!prevState)
    toast.success('Blog Deleted Successfully !!', {
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
  };

  useEffect(() => {
    getData();
  }, [uiChange]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentData = data?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <h1 className="text-center text-xl font-bold text-white sm:text-2xl md:text-4xl mt-8 mb-8">
        All Blogs
      </h1>
      <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap items-center justify-center gap-5">
        {currentData.filter((item)=>{
          return search.toLocaleLowerCase()===""?item:item.title.toLocaleLowerCase().includes(search);
        }).map((item) => (
          <div key={item._id} className="flex flex-col text-white  w-[260px] md:w-[280px] border border-white rounded-md p-2">
            <div className="w-full relative">
              <img
                src={item.image}
                alt=""
                className="w-full object-cover h-[240px] sm:h-[260px] rounded-md"
              />
              {userID == item.owner ? (
                <Link
                  to={`/update-blogs/${item._id}`}
                  className="absolute top-5 rounded-full right-12 z-30 bg-black p-2 cursor-pointer"
                >
                  <MdOutlineEdit />
                </Link>
              ) : (
                ""
              )}
              {userID == item.owner ? (
                <div className="absolute top-5 rounded-full right-3 z-30 bg-black p-2 cursor-pointer" onClick={() => deleteItem(item._id)}>
                  <MdDelete  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="flex flex-col gap-2
           p-2"
            >
              <h1 className="text-lg font-bold">  {item.title.length>25?item.title.slice(0,25)+"...":item.title}</h1>
              <p className="text-sm text-gray-400">  {item.description.length>50?item.description.slice(0,50)+"...":item.description}</p>
              <hr className="mt-1" />
              <div className="flex items-center gap-2 justify-end">
                {" "}
                -
                <CiCalendarDate className="text-white text-xl" />
                <p
                  className="text-sm
            "
                >
                  {moment(item.createdAt).format('DD-MM-YYYY')}
                </p>
              </div>
              <Link
                to={`blog/${item._id}`}
                className="text-center border border-white p-2 rounded-3xl hover:bg-blue-600 font-bold hover:border-blue-600"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      {data.length > 8 ? (
        <div className="w-full mt-4">
          <Pagination
            totalpost={data.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CardsSection;
