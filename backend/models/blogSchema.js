import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: [10, "Blog title must contain at least 10 charecters !"],
    maxLength: [40, "Blog title cannot exceef 40 charecters !"],
  },
  mainImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  intro: {
    type: String,
    require: true,
    minLength: [190, "Blog title must contain at least 190 charecters !"],
  },
  paraOneImage: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  paraOneDescription: {
    type: String,

    minLength: [
      50,
      "Para Description title must contain at least 50 charecters !",
    ],
  },
  paraOneTitle: {
    type: String,
    e,
    minLength: [50, "Blog title must contain at least 50 charecters !"],
  },

  paraTwoImage: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  paraTwoDescription: {
    type: String,

    minLength: [
      50,
      "Para Description title must contain at least 50 charecters !",
    ],
  },
  paraTwoTitle: {
    type: String,
    e,
    minLength: [50, "Blog title must contain at least 50 charecters !"],
  },

  paraThreeImage: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  paraThreeDescription: {
    type: String,

    minLength: [
      50,
      "Para Description title must contain at least 50 charecters !",
    ],
  },
  paraThreeTitle: {
    type: String,
    e,
    minLength: [50, "Blog title must contain at least 50 charecters !"],
  },
  category: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  authorName: {
    type: String,
    require: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
