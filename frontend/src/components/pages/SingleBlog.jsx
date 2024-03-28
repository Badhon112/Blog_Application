import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SingleBlog = () => {
  const { mode, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const getSingleBlogs = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/v1/blog/singleBlog/${id}`,
        {
          withCredentials: true,
        }
      );
      setBlog(res.data.blog);
    };
    getSingleBlogs();
  }, []);
  // console.log(blog.category);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <section className="container">
          <div className="category text-white">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="writer_section">
            <div className="author">
              <img src={blog.authorAvatar} alt="authorAvatar" />
              <p>{blog.authorName}</p>
            </div>
          </div>
          {blog && blog.mainImage && (
            <img
              src={blog.mainImage.url}
              alt="Main Image"
              className="mainImg"
            />
          )}
          <p className="intro-text">{blog.intro}</p>
          <div className="sub-para">
            <h3>{blog.paraOneTitle}</h3>
            {blog && blog.paraOneImage && (
              <img
                src={blog.paraOneImage.url}
                alt="Main Image"
                className="mainImg"
              />
            )}
            <p className="intro-text">{blog.paraOneDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraTwoTitle}</h3>
            {blog && blog.paraTwoImage && (
              <img
                src={blog.paraTwoImage.url}
                alt="Main Image"
                className="mainImg"
              />
            )}
            <p className="intro-text">{blog.paraTwoDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraThreeTitle}</h3>
            {blog && blog.paraThreeImage && (
              <img
                src={blog.paraThreeImage.url}
                alt="Main Image"
                className="mainImg"
              />
            )}
            <p className="intro-text">{blog.paraThreeDescription}</p>
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
