import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from './routes/blogRouter.js'
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
//cors functionality
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//File upload

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


//Router functionality
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
