import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
});
export default mongoose.model("User", UserSchema);
