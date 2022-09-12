import express from "express";
import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetPostbyId,
  UpdatePost,
} from "../controller/index.js";
import Model from "../model/model.js";
export const router = express.Router();
//Post Method
router.post("/post", CreatePost);

//Get all Method
router.get("/getAll", GetAllPosts);
//Get by ID Method
router.get("/getOne/:id", GetPostbyId);

//Update by ID Method
router.patch("/update/:id", UpdatePost);

//Delete by ID Method
router.delete("/delete/:id", DeletePost);

///////////////////////////////////////////
//register user
// router.post("/register", RegisterUser);
