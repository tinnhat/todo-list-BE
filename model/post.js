import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    required: true,
    type: String,
  },
  userid: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Post", PostSchema);
