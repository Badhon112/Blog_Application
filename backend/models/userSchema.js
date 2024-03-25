import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    minLength: [3, "Name must container at least 3 Character"],
    maxLength: [32, "Name cannot exceed 32 Character"],
  },
  email: {
    type: String,
    require: true,
    validate: [validator.isEmail, "Plz provide a valid email"],
  },

  phone: {
    type: Number,
    require: true,
    unique: true,
  },

  avater: {
    public_id: {
      type: String,
      require:true
    },
    url: {
      type: String,
      require:true
    },
  },
  education: {
    type: String,
    require: true,
  },
  role: { type: String, require: true, enum: ["Reader", "Author"] },
  password: {
    type: String,
    require: true,
    minLength: [6, "Name must container at least 3 Character"],
    // maxLength: [32, "Name cannot exceed 32 Character"],
    select: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});


export const User = mongoose.model("User", userSchema);
