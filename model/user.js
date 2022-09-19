import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  fullname: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  phone: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  avatar: {
    type: String,
  },
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("User", UserSchema);
