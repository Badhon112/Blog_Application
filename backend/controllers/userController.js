import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User avatar Required !", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type. Plz Provide this in png, jpg or webp formet",
        400
      )
    );
  }
  
  const { name, email, password, phone, role, education } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !role ||
    !education ||
    !avatar
  ) {
    return next(new ErrorHandler("Please Fill full details", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown cloudinary Error!"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    education,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
  //   expiresinIn: "5d",
  // });

  sendToken(user, 200, "User registered successfully", res);
  // res.status(200).json({ success: true, message: "User registered!" });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide full details", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password!", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("Invalid Role!", 400));
  }
  // res.status(200).json({ success: true, message: "User Login succefull!" });
  sendToken(user, 200, "User Logged in successfully", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expiresIn: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logged out! ",
    });
});

export const getMyProfile = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
  const authors = await User.find({ role: "Author" });
  res.status(200).json({
    success: true,
    authors,
  });
});
