import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import cloudinary from "cloudinary";

export const blogPost = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Blog main image is mandatory", 400));
  }
  const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;
  if (!mainImage) {
    return next(new ErrorHandler("Main Image is Mandatory", 400));
  }
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (
    (mainImage && !allowedFormats.includes(mainImage.mimetype)) ||
    (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) ||
    (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) ||
    (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
  ) {
    return next(new ErrorHandler("Invalid file type", 400));
  }
  const {
    title,
    intro,
    paraOneDescription,
    paraOneTitle,
    paraTwoDescription,
    paraTwoTitle,
    paraThreeDescription,
    paraThreeTitle,
    category,
    published,
  } = req.body;

  const createdBy = req.user._id;
  const authorName = req.user.name;
  const authorAvatar = req.user.avatar.url;

  if (!title || !category || !intro) {
    return next(
      new ErrorHandler("Title, Intro and Category Are Required", 400)
    );
  }
  const uploadPromises = [
    cloudinary.uploader.upload(mainImage.tempFilePath),
    paraOneImage
      ? cloudinary.uploader.upload(paraOneImage.tempFilePath)
      : Promise.resolve(null),
    paraTwoImage
      ? cloudinary.uploader.upload(paraTwoImage.tempFilePath)
      : Promise.resolve(null),
    paraThreeImage
      ? cloudinary.uploader.upload(paraThreeImage.tempFilePath)
      : Promise.resolve(null),
  ];

  const [mainImageRes, paraOneImageRes, paraTwoImageRes, paraThreeImageRes] =
    await Promise.all(uploadPromises);

  if (
    !mainImageRes ||
    mainImageRes.error ||
    (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) ||
    (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error)) ||
    (paraThreeImage && (!paraThreeImageRes || paraThreeImageRes.error))
  ) {
    return next(new ErrorHandler("Error on uploading images", 500));
  }
  const blogData = {
    title,
    intro,
    paraOneTitle,
    paraOneDescription,
    paraTwoTitle,
    paraTwoDescription,
    paraThreeTitle,
    paraThreeDescription,
    category,
    createdBy,
    authorAvatar,
    authorName,
    mainImage: {
      public_id: mainImageRes.public_id,
      url: mainImageRes.secure_url,
    },
    published,
  };
  if (paraOneImageRes) {
    blogData.paraOneImage = {
      public_id: paraOneImageRes.public_id,
      url: paraOneImageRes.secure_url,
    };
  }
  if (paraTwoImageRes) {
    blogData.paraTwoImage = {
      public_id: paraTwoImageRes.public_id,
      url: paraTwoImageRes.secure_url,
    };
  }
  if (paraThreeImageRes) {
    blogData.paraThreeImage = {
      public_id: paraThreeImageRes.public_id,
      url: paraThreeImageRes.secure_url,
    };
  }
  const blog = await Blog.create(blogData);
  res.status(200).json({
    success: true,
    message: "Blog Uploaded!",
    blog,
  });
});

export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 400));
  }
  await blog.deleteOne();
  res.status(200).json({
    success: true,
    message: "Blog Deleted!",
    blog,
  });
});

export const getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const allBlogs = await Blog.find({ published: true });
  if (!allBlogs) {
    return next(new ErrorHandler("Blog not found!", 400));
  }
  res.status(200).json({
    success: true,
    message: "All Blog",
    allBlogs,
  });
});

export const getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});

export const getMyBlogs = catchAsyncErrors(async (req, res, next) => {
  const createdBy = req.user._id;
  const myblogs = await Blog.find({ createdBy });
  if (!myblogs) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  res.status(200).json({
    success: true,
    myblogs,
  });
});

export const uploadBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  const {
    title,
    intro,
    category,
    paraOneTitle,
    paraOneDescription,
    paraTwoTitle,
    paraTwoDescription,
    paraThreeTitle,
    paraThreeDescription,
    published,
  } = req.body;
  const newBlogData = {
    title,
    intro,
    category,
    paraOneTitle,
    paraOneDescription,
    paraTwoTitle,
    paraTwoDescription,
    paraThreeTitle,
    paraThreeDescription,
    published,
  };
  if (req.files) {
    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (
      (mainImage && !allowedFormats.includes(mainImage.mimetype)) ||
      (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) ||
      (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) ||
      (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
    ) {
      return next(new ErrorHandler("Invalid file type", 400));
    }
    if (req.files && mainImage) {
      const blogMainImaged = blog.mainImage.public_id;
      await cloudinary.uploader.destroy(blogMainImaged);
      const newBlogMainImage = await cloudinary.uploader.upload(
        mainImage.tempFilePath
      );
      newBlogData.mainImage = {
        public_id: newBlogMainImage.public_id,
        url: newBlogMainImage.secure_url,
      };
    }
    if (req.files && paraOneImage) {
      if (blog.paraOneImage) {
        const blogparaOneImage = blog.paraOneImage.public_id;
        await cloudinary.uploader.destroy(blogparaOneImage);
      }
      const newBlogparaOneImage = await cloudinary.uploader.upload(
        paraOneImage.tempFilePath
      );
      newBlogData.paraOneImage = {
        public_id: newBlogparaOneImage.public_id,
        url: newBlogparaOneImage.secure_url,
      };
    }
    if (req.files && paraTwoImage) {
      if (blog.paraTwoImage) {
        const blogparaTwoImage = blog.paraTwoImage.public_id;
        await cloudinary.uploader.destroy(blogparaTwoImage);
      }
      const newBlogparaTwoImage = await cloudinary.uploader.upload(
        paraTwoImage.tempFilePath
      );
      newBlogData.paraTwoImage = {
        public_id: newBlogparaTwoImage.public_id,
        url: newBlogparaTwoImage.secure_url,
      };
    }
    if (req.files && paraThreeImage) {
      if (blog.paraThreeImage) {
        const blogparaThreeImage = blog.paraThreeImage.public_id;
        await cloudinary.uploader.destroy(blogparaThreeImage);
      }
      const newBlogparaThreeImage = await cloudinary.uploader.upload(
        paraThreeImage.tempFilePath
      );
      newBlogData.paraThreeImage = {
        public_id: newBlogparaThreeImage.public_id,
        url: newBlogparaThreeImage.secure_url,
      };
    }
  }
  blog = await Blog.findByIdAndUpdate(id, newBlogData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Blog Updated!",
    blog
  });
});
