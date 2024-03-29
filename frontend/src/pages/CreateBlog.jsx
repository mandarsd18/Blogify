import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const userID = localStorage.getItem("userId");

  const navigate = useNavigate();

  const categoryArray = [
    "Weather",
    "Entertainment",
    "Tech",
    "Clothes",
    "Other",
  ];
  const createBlogs = async (e) => {
    e.preventDefault();
    try {
      if (userID) {
        const res = await axios
          .post("https://blogify-ioe8.onrender.com/blogs/create-blog", {
            title: title,
            description: description,
            category: category,
            owner: userID,
            image: image,
          })
          .then((res) => {
            toast("Blog Created");
            navigate("/");
            setCategory("");
            setDescription("");
            setImage("");
            setTitle("");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form
          className="text-white mt-4 flex flex-col w-[90%] sm:w-[80%] mx-auto"
          onSubmit={createBlogs}
        >
          <label htmlFor="title" className="mb-3 cursor-pointer">
            Post Title :
          </label>
          <input
            type="text"
            id="title"
            placeholder="Something title"
            className="p-2.5 text-[#222] rounded-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="imege" className="mb-3 mt-6 cursor-pointer">
            Post Image url :
          </label>
          <input
            type="text"
            id="image"
            placeholder="https://images.jpg"
            className="p-2.5 text-[#222] rounded-sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label htmlFor="category" className="mb-3 mt-6 cursor-pointer">
            Post Category :
          </label>
          <select
            id="category"
            className="text-black p-2 border-none outline-none"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {categoryArray.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <label htmlFor="desc" className="mt-6 mb-3 cursor-pointer">
            Post Description :
          </label>
          <textarea
            name=""
            id="desc"
            cols="30"
            rows="10"
            placeholder="something description"
            className="p-3 px-4 text-[#222] rounded-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            className="mt-7 border-2 border-white font-semibold py-2 transition ease-in-out  hover:bg-white 
        duration-300 hover:text-[#222] rounded-sm"
            type="submit"
          >
            Create Blogs
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
