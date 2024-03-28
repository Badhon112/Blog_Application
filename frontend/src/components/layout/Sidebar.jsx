import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
const Sidebar = ({ component, setComponent }) => {
  const { mode, setMode, setIsAuthenticated,user } = useContext(Context);
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleComponent = (value) => {
    setComponent(value);
  };

  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <p className="text-3xl">{user.name}</p>
          <img src={user.avatar.url} alt="Avater" />
        </div>
        <ul>
          <button className="bg-white" onClick={() => setComponent("MyBlogs")}>My Blogs</button>
          <button onClick={() => setComponent("CreateBlog")}>
            Create Blog
          </button>
          <button onClick={() => setComponent("Chart")}>My Chart</button>
          <button onClick={() => setComponent("MyProfile")}>My Profile</button>
          <button onClick={gotoHome}>Home</button>
          <button onClick={handleLogout}>Log Out</button>
          <button
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {mode === "light" ? (
              <CiLight className="light-icon" />
            ) : (
              <MdDarkMode className="dark-icon" />
            )}
          </button>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
