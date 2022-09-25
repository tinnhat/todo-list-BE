import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";
import { mailRoutes } from "./routes/mailRoutes.js";

import path from "path";
import cors from "cors";
dotenv.config();
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api`, router);
app.use(express.static("uploads"));
app.use(`/file`, express.static("uploads"));
app.use(`/user`, userRoutes);
app.use(`/todo`, todoRoutes);
app.use(`/email`, mailRoutes);

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});
