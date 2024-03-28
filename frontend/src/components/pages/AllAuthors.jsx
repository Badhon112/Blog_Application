import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
  const { mode } = useContext(Context);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/authors",
        {
          withCredentials: true,
        }
      );
      console.log(data.authors);
      setAuthors(data.authors);
    };
    fetchAuthors();
  }, []);
  return (
    <article className={mode === "dark" ? "dark-bg min-h-screen" : "light-bg min-h-screen"}>
      {/* <LatestBlog blogs={blogs} title={"Blogs"} /> */}
      <section className="popularAuthors">
        <h3 className="text-3xl">Popular Authors</h3>
        <div className="container">
          {authors && authors.length > 0 ? (
            authors.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <img
                    src={element.avatar.url}
                    alt="Author"
                    className="rounded-full"
                  />
                  <p>{element.name}</p>
                  <p>{element.role}</p>
                </div>
              );
            })
          ) : (
            <BeatLoader size={60} color={"#1cac78"} style={{padding:"200px 0"}} />
          )}
        </div>
      </section>
    </article>
  );
};

export default AllAuthors;
