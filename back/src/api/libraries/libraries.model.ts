import { Schema, model } from "mongoose";

const LibrariesSchema = new Schema({
  name: String,
  list: [{ name: String, code: String }],
  isActive: Boolean,
});

export default model("Libraries", LibrariesSchema);
