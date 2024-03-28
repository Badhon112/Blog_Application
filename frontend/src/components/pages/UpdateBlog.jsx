import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../../main";
const UpdateBlog = () => {
  const { mode } = useContext(Context);
  const { id } = useParams();
  const navigateto = useNavigate("");
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/blog/singleBlog/${id}`,
          {
            withCredentials: true,
          }
        );
        setTitle(data.blog.title);
        setIntro(data.blog.intro);
        setCategory(data.blog.category);

        setMainImage(data.blog.mainImage.url);

        setParaOneTitle(data.blog.title);
        setParaTwoTitle(data.blog.paraTwoTitle);
        setParaThreeTitle(data.blog.paraThreeTitle);

        setParaOneDescription(data.blog.paraOneDescription);
        setParaTwoDescription(data.blog.paraTwoDescription);
        setParaThreeDescription(data.blog.paraThreeDescription);

        data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url);
        data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url);
        data.blog.paraThreeImage &&
          setParaThreeImage(data.blog.paraThreeImage.url);

        // setMainImagePrev(data.blog.mainImagePrev);
        // setParaOneImageprev(data.blog.);
        // setParaTwoImageprev(data.blog.);
        // setParaThreeImageprev(data.blog.);

        setPublished(data.blog.published);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("title", title);
    updatedData.append("category", category);
    updatedData.append("mainImage", mainImage);
    updatedData.append("intro", intro);
    updatedData.append("published", published);
    //Para one
    if (paraOneTitle.length > 0) {
      updatedData.append("paraOneTitle", paraOneTitle);
    }
    if (paraOneImage) {
      updatedData.append("paraOneImage", paraOneImage);
    }
    if (paraOneDescription.length > 0) {
      updatedData.append("paraOneDescription", paraOneDescription);
    }
    //Para Two
    if (paraTwoTitle.length > 0) {
      updatedData.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraTwoImage) {
      updatedData.append("paraTwoImage", paraTwoImage);
    }
    if (paraTwoDescription.length > 0) {
      updatedData.append("paraTwoDescription", paraTwoDescription);
    }
    //Para Three
    if (paraThreeTitle.length > 0) {
      updatedData.append("paraThreeTitle", paraThreeTitle);
    }
    if (paraThreeImage) {
      updatedData.append("paraThreeImage", paraThreeImage);
    }
    if (paraThreeDescription.length > 0) {
      updatedData.append("paraThreeDescription", paraThreeDescription);
    }
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/blog/update/${id}`,
        updatedData,
        {
          withCredentials: true,
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
      navigateto("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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

  return (
    <article  className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3 className="text-4xl">Update Blogs</h3>
        <div className="container">
          <form>
            <input
              type="text"
              placeholder="Blog Main title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="sub-para"
            >
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
                src={paraOneImageprev ? `${paraOneImageprev}` : "/img.jpg"}
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
                src={paraTwoImageprev ? `${paraTwoImageprev}` : "/img.jpg"}
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
                src={paraThreeImageprev ? `${paraThreeImageprev}` : "/img.jpg"}
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
            <button onClick={handleUpdate} className="update-btn" type="submit">
              Update BLOG
            </button>
          </form>
        </div>
      </section>
    </article>
  );
};

export default UpdateBlog;
