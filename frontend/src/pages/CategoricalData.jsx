import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom'

const CategoricalData = () => {

    const {categoryName}=useParams()
    const [data, setData] = useState([]);
    const getData = async () => {
      const res = await axios.get(`http://localhost:4000/blogs/category/${categoryName}`);
      setData(res?.data?.myblogs);
    };
  
    useEffect(() => {
      getData();
        }, []);
    
  return (
   <>
   <h1 className="text-center text-xl font-bold text-white sm:text-2xl md:text-4xl mb-6 mt-4">
        {categoryName}
      </h1>
      <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap items-center justify-center gap-5">
        {data.length==0 ? <h1 className='font-bold text-white text-xl'>No Data Exist</h1>:data.map((item) => (
          <div className="flex flex-col text-white  w-[260px] md:w-[280px] border border-white p-2 rounded-md">
            <div className="w-full">
              <img
                src={item.image}
                alt=""
                className="w-full object-cover h-[240px] sm:h-[260px] rounded-sm"
              />
            </div>
            <div
              className="flex flex-col gap-2
           p-2"
            >
              <h1 className="text-lg font-bold">{item.title}</h1>
              <p className="text-sm text-gray-400">{item.description}</p>
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
   </>
  )
}

export default CategoricalData
