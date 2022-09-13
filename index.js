import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";
dotenv.config();
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api`, router);
app.use(`/user`, userRoutes);
app.use(`/todo`, todoRoutes);

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