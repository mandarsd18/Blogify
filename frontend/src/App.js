import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllBlogs from "./pages/AllBlogs";
import MyBlogs from "./pages/MyBlogs";
import CategoricalData from "./pages/CategoricalData";
import CreateBlog from "./pages/CreateBlog";

import DetailPage from "./pages/DetailPage";
import UpdateBlog from "./pages/UpdateBlog";
import MySate from "./context/MyState"

function App() {
  return (
    <>
  <MySate>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/category/:categoryName" element={<CategoricalData />} />
          <Route path="/blog/:id" element={<DetailPage/>}/>
          <Route path="/update-blogs/:id" element={<UpdateBlog/>}/>
        </Routes>
      </BrowserRouter>
      </MySate>
    </>
  );
}

export default App;
