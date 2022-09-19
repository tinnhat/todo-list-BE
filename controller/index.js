import formidable from "formidable";
import fs from "fs";
import Post from "../model/post.js";

export const CreatePost = async (req, res) => {
  console.log(req);
  const data = new Post({
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
    const data = await Post.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetPostbyId = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id);
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
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let oldpath = files.file.filepath;
    const arrName = files.file.originalFilename.split(".");
    let newpath = "./uploads/" + Date.now() + "." + arrName[arrName.length - 1];
    let rawData = fs.readFileSync(oldpath);
    fs.writeFile(newpath, rawData, function (err) {
      if (err)
        res.status(500).json({
          result: false,
          message: err,
        });
      return res.status(200).json({
        result: true,
        message: "Uploaded successfully",
      });
    });
  });
};

export const GetFile = (req, res) => {
  let fileName = req.params.name;
  fs.readFile(`./uploads/${fileName}`, function (err, image) {
    if (err) {
      // throw err;
      res.status(500).json({
        result: false,
        message: err,
      });
    }
    res.setHeader("Content-Type", "image/jpg");
    //   //nối link
    const link = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.status(200).json({
      result: true,
      message: {
        link: link,
      },
    });
  });
};
