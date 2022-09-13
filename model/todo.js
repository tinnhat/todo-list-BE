import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TodosSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    required: true,
    type: Boolean,
  },
  userid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Todos", TodosSchema);
