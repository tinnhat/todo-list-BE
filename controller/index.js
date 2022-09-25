import formidable from "formidable";
import fs from "fs";
import Post from "../model/post.js";

export const CreatePost = async (req, res) => {
  const data = new Post({
    content: req.body.content,
    author: req.body.author,
    userid: req.body.userid,
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
    const data = await Post.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetPostbyId = async (req, res) => {
  try {
    const data = await Post.find({ userid: req.params.id });

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

    const result = await Post.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const DeletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpLoadFile = (req, res, next) => {
  console.log(req.body);
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files);
    let oldpath = files.file.filepath;
    const arrName = files.file.originalFilename.split(".");
    const time = Date.now();
    let newpath = "./uploads/" + time + "." + arrName[arrName.length - 1];
    let rawData = fs.readFileSync(oldpath);
    fs.writeFile(newpath, rawData, function (err) {
      if (err)
        res.status(500).json({
          result: false,
          message: err,
        });
      const link =
        req.protocol +
        "://" +
        req.get("host") +
        `/file/${time + "." + arrName[arrName.length - 1]}`;
      console.log(link);
      return res.status(200).json({
        result: true,
        message: "Uploaded successfully",
        link: link,
      });
    });
  });
};
