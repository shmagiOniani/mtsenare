import { Schema, model } from 'mongoose';

const LibrariesSchema = new Schema({
  name: String,
  library: [{name: String}],
  isActive: Boolean,
});

export default model('Libraries', LibrariesSchema);