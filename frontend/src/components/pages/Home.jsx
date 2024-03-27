import React from "react";
import { Context } from "../../main";
import { useContext } from "react";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import LatestBlog from "../miniComponents/LatestBlog";
import PopularAuthors from "../miniComponents/PopularAuthors";

const Home = () => {
  const { mode,blogs } = useContext(Context);
  const filteredBlogs=blogs.slice(0,6)
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection />
      <TrendingBlogs/>
      <LatestBlog blogs={filteredBlogs} heading={"Leatest Blogs"} />
      <PopularAuthors/>
    </article>
  );
};

export default Home;
