import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axois from "axios";


const BannerSlider = () => {
  const [data, setData] = useState([]);
  //   console.log(category);

  useEffect(() => {
    const getData = async () => {
      const res = await axois.get("http://localhost:4000/blogs/allBlogs");
      setData(res?.data?.allblog);
    };

    getData();
  }, []);


  return (
    <>
      <div className="w-[90%] sm:w-[80%] mx-auto mt-4 mb-4">
      <div className="my-6" >
        <h1 className="text-white font-bold text-2xl text-center sm:text-2xl md:text-4xl ">Articles</h1>
      </div>


        <Carousel autoPlay infiniteLoop showThumbs={false} className="mt-4 rounded-3xl">
        {
          data.map((item)=>(
            <div key={item._id} className="h-[300px] relative z-10 ">
            <img
              src={item.image}
              className="h-full object-cover rounded-3xl"
              alt="img"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 z-20 opacity-70 rounded-3xl"></div>

            <div className="w-full h-full text-white absolute top-0 left-0  z-30 flex flex-col items-center justify-center gap-2 ">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">{item.title.length>25?item.title.slice(0,25)+"...":item.title}</h1>
              <p className=" md:w-[60%] ">
              {item.description.length>50?item.description.slice(0,50)+"...":item.description}
              </p>
            </div>
          </div>

          ))
        }
         
        
        </Carousel>
      </div>
    </>
  );
};

export default BannerSlider;
