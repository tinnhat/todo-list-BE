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
      newUser.save();
      return res.status(200).json({ result: newUser });
    }
  });
};
export const GetAllUsers = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
