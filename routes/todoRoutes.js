import express from "express";
import {
  CreateTodo,
  DeleteTodo,
  GetAllTodos,
  GetTodosbyId,
  UpdateTodo,
} from "../controller/todo.js";
import { verifyToken } from "../middleware/verifyToken.js";
export const todoRoutes = express.Router();

todoRoutes.get("/getAll", verifyToken, GetAllTodos);
todoRoutes.get("/getOne/:id", verifyToken, GetTodosbyId);
todoRoutes.post("/create", verifyToken, CreateTodo);
todoRoutes.patch("/update/:id", verifyToken, UpdateTodo);
todoRoutes.delete("/delete/:id", verifyToken, DeleteTodo);
