import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mode, isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          role,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1 className="text-4xl">Login</h1>

          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" defaultValue>
              Select Role
            </option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>

          <p className="text-lime-600">
            Already Registered?{" "}
            <Link to={"/login"} className="underline">
              Login here
            </Link>{" "}
          </p>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;
