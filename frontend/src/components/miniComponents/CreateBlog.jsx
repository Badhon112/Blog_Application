import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigateto=useNavigate("")
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImagePrev, setMainImagePrev] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  //For Image state
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");

  // For image state prev

  const [paraOneImageprev, setParaOneImageprev] = useState("");
  const [paraTwoImageprev, setParaTwoImageprev] = useState("");
  const [paraThreeImageprev, setParaThreeImageprev] = useState("");

  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  // Main Image
  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePrev(reader.result);
      setMainImage(file);
    };
  };
  const paraOneImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImageprev(reader.result);
      setParaOneImage(file);
    };
  };
  const paraTwoImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImageprev(reader.result);
      setParaTwoImage(file);
    };
  };
  const paraThreeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImageprev(reader.result);
      setParaThreeImage(file);
    };
  };

  const handleBlog = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("mainImage", mainImage);
    formdata.append("intro", intro);
    formdata.append("published", published);
    //Para one
    if (paraOneTitle.length > 0) {
      formdata.append("paraOneTitle", paraOneTitle);
    }
    if (paraOneImage) {
      formdata.append("paraOneImage", paraOneImage);
    }
    if (paraOneDescription.length > 0) {
      formdata.append("paraOneDescription", paraOneDescription);
    }
    //Para Two
    if (paraTwoTitle.length > 0) {
      formdata.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraTwoImage) {
      formdata.append("paraTwoImage", paraTwoImage);
    }
    if (paraTwoDescription.length > 0) {
      formdata.append("paraTwoDescription", paraTwoDescription);
    }
    //Para Three
    if (paraThreeTitle.length > 0) {
      formdata.append("paraThreeTitle", paraThreeTitle);
    }
    if (paraThreeImage) {
      formdata.append("paraThreeImage", paraThreeImage);
    }
    if (paraThreeDescription.length > 0) {
      formdata.append("paraThreeDescription", paraThreeDescription);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/blog/post",
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      setIntro("");
      setCategory("");
      setMainImage("");
      setMainImagePrev("");
      setParaOneTitle("");
      setParaOneDescription("");
      setParaOneImage("");
      setParaOneImageprev("");
      setParaTwoTitle("");
      setParaTwoDescription("");
      setParaTwoImage("");
      setParaTwoImageprev("");
      setParaThreeTitle("");
      setParaThreeDescription("");
      setParaThreeImage("");
      setParaThreeImageprev("");
      setPublished(null);
      toast.success(data.response);
      navigateto("/")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="create-blog">
      <h3 className="text-4xl">Create Blogs</h3>
      <div className="container">
        <form onSubmit={handleBlog}>
          
          <input
            type="text"
            placeholder="Blog Main title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ display: "flex", flexDirection: "column" }} className="sub-para">
            <label>Blog main Image</label>
            <img
              src={mainImagePrev ? `${mainImagePrev}` : "/img.jpg"}
              alt="mainImg"
              className="mainImg"
            />
            <input
              type="file"
              onChange={mainImageHandler}
              style={{ border: "none" }}
            />
          </div>
          <textarea
            rows="25"
            className="intro"
            placeholder="BLOG INTRO..... (250 latter)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph one title"
              value={paraOneTitle}
              onChange={(e) => setParaOneTitle(e.target.value)}
            />
            <img
              src={
                paraOneImageprev ? `${paraOneImageprev}` : "/img.jpg"
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraOneImageHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Blog First Sub "
              value={paraOneDescription}
              onChange={(e) => setParaOneDescription(e.target.value)}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph two title"
              value={paraTwoTitle}
              onChange={(e) => setParaTwoTitle(e.target.value)}
            />
            <img
              src={
                paraTwoImageprev ? `${paraTwoImageprev}` : "/img.jpg"
              }
              alt="subParaTwoImg"
            />
            <input
              type="file"
              onChange={paraTwoImageHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Blog Second Sub "
              value={paraTwoDescription}
              onChange={(e) => setParaTwoDescription(e.target.value)}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph three title"
              value={paraThreeTitle}
              onChange={(e) => setParaThreeTitle(e.target.value)}
            />
            <img
              src={
                paraThreeImageprev
                  ? `${paraThreeImageprev}`
                  : "/img.jpg"
              }
              alt="subParaThreeImg"
            />
            <input
              type="file"
              onChange={paraThreeImageHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Blog Third Sub Paragraph Comes Here..."
              value={paraThreeDescription}
              onChange={(e) => setParaThreeDescription(e.target.value)}
            />
          </div>
          <div className="category-box">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Blog Category</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="publish-box">
            <label>Wants to publish now?</label>
            <select
              value={published}
              onChange={(e) => setPublished(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button className="create-btn" type="submit">
            POST BLOG
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
