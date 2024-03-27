import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const TrendingBlogs = () => {
  const { blogs } = useContext(Context);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  <Carousel responsive={responsive}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
  </Carousel>;
  return (
    <div className="trending">
      <h3 className="text-3xl">Trending</h3>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 10).map((element) => {
            return (
              <Link
                to={`/blog/${element._id}`}
                className="card"
                key={element._id}
              >
                <img
                  src={element.mainImage.url}
                  alt="Blog"
                  className="blogImg"
                />
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
          })
        ) : (
          <BeatLoader size={30} color="gray" />
        )}
      </Carousel>
    </div>
  );
};

export default TrendingBlogs;
