import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Footer from "../components/Footer";

const MyBlogs = () => {
  const userID = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [uiChange,setUiChange]=useState(false)
  // const {setUiChange,uiChange}=useContext(blogContext)

  const navigate=useNavigate()
  const getData = async () => {
    const res = await axios.get(`https://blogify-ioe8.onrender.com/blogs/myblogs/${userID}`);
    setData(res?.data?.myblogs);
  };
  const deleteItem = (id) => {
    axios.delete(`https://blogify-ioe8.onrender.com/blogs/delete-blog/${id}`);
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
    navigate("/")
  };
  useEffect(() => {
    getData();
  }, [uiChange]);

  return (
   <>
   <h1 className="text-center text-xl font-bold text-white sm:text-2xl md:text-4xl mb-6 mt-4">
        My Blogs
      </h1>
      <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap items-center justify-center gap-5">
        {data.map((item) => (
          <div className="flex flex-col text-white  w-[260px] md:w-[280px] border border-white p-2 rounded-md">
            <div className="w-full relative">
              <img
                src={item.image}
                alt=""
                className="w-full object-cover h-[240px] sm:h-[260px] rounded-sm"
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
              <h1 className="text-lg font-bold"> {item.title.length>25?item.title.slice(0,25)+"...":item.title}</h1>
              <p className="text-sm text-gray-400">{item.description.length>50?item.description.slice(0,50)+"...":item.description}</p>
              <hr className="mt-1" />
              <div className="flex items-center gap-2 justify-end">
                {" "}
                -
                <CiCalendarDate className="text-white text-xl" />
                <p
                  className="text-sm
            "
                >
                  {item.createdAt}
                </p>
              </div>
              <Link
                to={"/"}
                className="text-center border border-white p-2 rounded-3xl hover:bg-blue-600 font-bold hover:border-none"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
      </>
  );
};

export default MyBlogs;
