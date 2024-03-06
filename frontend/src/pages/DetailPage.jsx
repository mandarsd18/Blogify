import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { Bounce, toast } from "react-toastify";
const DetailPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate=useNavigate()
  const singleBlog = async () => {
    const res = await axios.get(`https://blogify-ioe8.onrender.com/blogs/${id}`);

    setData(res.data.singleBlog);
  };


  const deleteItem = async(id) => {
    await axios.delete(`https://blogify-ioe8.onrender.com/blogs/delete-blog/${id}`);
    // setUiChange((prevState)=>!prevState)
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
    singleBlog();
  }, []);
  return (
    <>
      <div className="w-[90%] sm:w-[80%] mx-auto text-white">
        <h1 className="text-center text-3xl font-bold mt-4">{data.title}</h1>
        <img
          src={data.image}
          className="w-[100%] h-[400px] object-cover rounded-md mt-4"
          alt=""
        />
        <div className="w-full flex justify-between mt-4 items-center" >
          <div className="font-semibold">-{moment(data.createdAt).format("DD-MM-YYYY")}</div>
          <div className="flex gap-3 items-center font-semibold">
            <Link to={`/update-blogs/${data._id}`}>
            <MdOutlineEdit className="text-[20px] cursor-pointer"/>
            </Link>
            
            <MdDelete onClick={() => deleteItem(data._id)} className="text-[20px] cursor-pointer"/>
          </div>
        </div>
        <p className="text-sm mt-4">{data.description}</p>
      </div>
    </>
  );
};

export default DetailPage;
