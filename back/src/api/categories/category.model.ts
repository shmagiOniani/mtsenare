import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import { ObjectID } from 'mongodb';

const CategorySchema = new Schema({
  name: String,
  code: String,
  parentId:  String,
  // parentId:  {type: Schema.Types.ObjectId, ref: 'Categories'},
});

export default model('Category', CategorySchema);