import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/blog/myblogs",
        {
          withCredentials: true,
        }
      );
      setMyBlogs(data.myblogs);
      console.log(data);
    };
    fetchMyBlogs();
  }, []);
  const deleteBlogs = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/blog/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Delete Succefull");
      setMyBlogs((prev) => prev.filter((myBlogs) => myBlogs._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <section className="my-blogs">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((ele) => (
            <div className="author-blog-card" key={ele._id}>
              {ele.mainImage && (
                <img src={ele.mainImage.url} alt="Blog Image" />
              )}
              <span className="category">{ele.category}</span>
              <h4>{ele.title}</h4>
              <div className="btn-wrapper">
                <Link to={`/blog/update/${ele._id}`}>Update</Link>
                <button onClick={deleteBlogs(ele._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <BeatLoader
            size={60}
            color={"#1cac78"}
            style={{ padding: "200px 0" }}
          />
        )}
      </section>
    </>
  );
};

export default MyBlogs;
