import express from "express";
import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetPostbyId,
  UpdatePost,
  UpLoadFile,
} from "../controller/index.js";
export const router = express.Router();
//Post Method
router.post("/post", CreatePost);
//upload files
router.post("/uploadFile", UpLoadFile);

//Get all Method
router.get("/getAll", GetAllPosts);
//Get by ID Method
router.get("/getOne/:id", GetPostbyId);

//Update by ID Method
router.patch("/update/:id", UpdatePost);

//Delete by ID Method
router.delete("/delete/:id", DeletePost);
