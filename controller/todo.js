import Todos from "../model/todo.js";

export const CreateTodo = async (req, res) => {
  const data = new Todos(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const GetAllTodos = async (req, res) => {
  try {
    const data = await Todos.find();
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ message: error.message, result: false });
  }
};
export const GetTodosbyId = async (req, res) => {
  try {
    const data = await Todos.find({ userid: req.params.id });
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ message: error.message, result: false });
  }
};
export const UpdateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Todos.findByIdAndUpdate(id, updatedData, options);
    return res.status(200).json({ message: result, result: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, result: false });
  }
};
export const DeleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todos.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Delete Successfully", result: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, result: false });
  }
};
