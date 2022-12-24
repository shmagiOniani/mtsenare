import { Schema, model } from 'mongoose';

const LibrariesSchema = new Schema({
  name: String,
  library: [{name: String, id: Number}],
  isActive: Boolean,
});

export default model('Libraries', LibrariesSchema);