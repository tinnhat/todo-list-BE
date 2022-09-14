import Model from "../model/model.js";
import formidable from "formidable";
import fs from "fs";
import path from "path";
export const CreatePost = async (req, res) => {
  console.log(req);
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const GetAllPosts = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetPostbyId = async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const UpdatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const DeletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpLoadFile = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let oldpath = files.file.filepath;
    let newpath = "./uploads/" + files.file.originalFilename;
    var rawData = fs.readFileSync(oldpath);
    fs.writeFile(newpath, rawData, function (err) {
      if (err) console.log(err);
      return res.send("Successfully uploaded");
    });
  });
};
