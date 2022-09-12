import express from "express";
import {
  RegisterUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
} from "../controller/user.js";
export const userRoutes = express.Router();
// register user
userRoutes.post("/register", RegisterUser);

//getAll user
userRoutes.get("/getAll", GetAllUsers);

//Get by ID Method
userRoutes.get("/getOne/:id", GetUserById);

//Update by ID Method
userRoutes.patch("/update/:id", UpdateUser);

//Delete by ID Method
userRoutes.delete("/delete/:id", DeleteUser);
