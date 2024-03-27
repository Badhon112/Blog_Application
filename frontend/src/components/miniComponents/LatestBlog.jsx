import React from "react";
import { Link } from "react-router-dom";
const LatestBlog = ({ heading, newClass, blogs }) => {
  return (
    <section
      className={
        newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
      }
    >
      <h3 className="text-3xl">{heading}</h3>
      <div className="container">
        {blogs &&
          blogs.map((element) => {
            return (
              <Link
                to={`/blog/${element._id}`}
                key={element._id}
                className="card"
              >
                <img src={element.mainImage.url} alt="MainImage" />
                <span className="category">{element.category}</span>
                <h4>{element.title}</h4>
                <div className="writer_section">
                  <div className="author">
                    <img src={element.authorAvatar} alt="AuthorAvatar" />
                    <p>{element.authorName}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default LatestBlog;
