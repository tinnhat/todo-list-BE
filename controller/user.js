import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
export const RegisterUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "Email has already been registered" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        } else {
          user.password = undefined;
          return res.status(200).json({ result: newUser });
        }
      });
    }
  });
};
export const GetAllUsers = async (req, res) => {
  // let jwtSecretKey = process.env.SERECT_KEY_SIGNATURE;
  // console.log(token);
  try {
    // const token = req.header("Authorization");
    // const verified = jwt.verify(token, jwtSecretKey);
    // if (verified) {
    const data = await User.find().select("-password");
    return res.status(200).json({ result: data });
    // } else {
    // return res.status(401).send(error);
    // }
  } catch (error) {
    return res.status(401).send(error);
  }
};
export const GetUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).select("-password");
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await User.findByIdAndUpdate(id, updatedData, options);
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    return res.send(`User with ${data.username} has been deleted..`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const SignIn = async (request, response) => {
  const user = await User.findOne({ username: request.body.username });
  if (!user)
    return response.status(422).json({
      message: "Username is not correct",
      result: false,
    });

  const checkPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!checkPassword)
    return response.status(422).json({
      message: "Password is not correct",
      result: false,
    });
  const token = jwt.sign({ user }, process.env.SERECT_KEY_SIGNATURE, {
    expiresIn: 60 * 60 * 24, // 24 hours
  });
  return response.json({
    message: "Login Successfully!",
    result: true,
    token: token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
  });
};
