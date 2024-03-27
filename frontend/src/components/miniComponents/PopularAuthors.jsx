import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/authors",
        {
          withCredentials: true,
        }
      );
      setAuthors(data.authors);
    };
    fetchUser();
  }, []);
  return (
    <section className="popularAuthors">
      <h3 className="text-3xl">Popular Authors</h3>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.slice(0,4).map(element=>{
            return(
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="Author" className="rounded-full" />
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
            )
          })
        ) : (
          <BeatLoader size={60} color={"#1cac78"} />
        )}
      </div>
    </section>
  );
};

export default PopularAuthors;
