import express from "express";
import {
  DeleteUser,
  GetAllUsers,
  GetUserById,
  RegisterUser,
  SignIn,
  UpdateUser,
  getProfile,
} from "../controller/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
export const userRoutes = express.Router();
// register user
userRoutes.post("/register", RegisterUser);
//sign in
userRoutes.post("/signin", SignIn);
userRoutes.post("/profile", getProfile);

//getAll user
userRoutes.get("/getAll", verifyToken, GetAllUsers);

//Get by ID Method
userRoutes.get("/getOne/:id", verifyToken, GetUserById);

//Update by ID Method
userRoutes.patch("/update/:id", verifyToken, UpdateUser);

//Delete by ID Method
userRoutes.delete("/delete/:id", verifyToken, DeleteUser);
//get file
