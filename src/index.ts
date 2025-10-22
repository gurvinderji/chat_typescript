import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.DB!)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRouter from "./router/auth.router";
const app = express();
app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);

app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", AuthRouter);
