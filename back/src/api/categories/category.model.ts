import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const CategorySchema = new Schema({
  name: multilingualSchema,
  isActive: Boolean,
  position: Number,
});

export default model('Category', CategorySchema);