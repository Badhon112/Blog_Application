import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import MyProfile from "../miniComponents/PopularAuthors";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import MyBlogs from "../miniComponents/MyBlogs";
const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated, user } = useContext(Context);
  if (!isAuthenticated || user.role === "Reader") {
    return <Navigate to={"/"} />;
  }
  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <Sidebar component={component} setComponent={setComponent} />
      {component === "MyProfile" ? (
        <MyProfile />
      ) : component === "CreateBlog" ? (
        <CreateBlog />
      ) : component === "Chart" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
      
    </section>
  );
};

export default Dashboard;
