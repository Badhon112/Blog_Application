import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const { mode, isAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("role", role);
    formdata.append("password", password);
    formdata.append("education", education);
    formdata.append("avatar", avatar);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
      setPassword("");
      setEducation("");
      setAvatar("");
      toast.success(data.message);
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
        <form onSubmit={handleRegister}>
          <h1 className="text-4xl">Register</h1>
          <div className="flex flex-row items-center">
            <div className="avatar">
              <img
                src={avatarPreview ? `${avatarPreview}` : "/img.jpg"}
                alt="This is a image"
              />
            </div>
            <input
              type="file"
              onChange={avatarHandler}
              className="avatar_input_tag border-none"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="" defaultValue>
              Select your Education
            </option>
            <option value="BSC">Bsc in Cse</option>
            <option value="MSC">Msc in Cse</option>
          </select>
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
            Register
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;
