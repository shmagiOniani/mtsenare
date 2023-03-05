import { Schema, model } from 'mongoose';
import imageSchema from '../../schemas/image.schema';
import multilingualSchema from '../../schemas/multilingual.schema';

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: String,
  deliveryTime: String,
  deliveryType: String,
  quantity: String,
  tags: String,
  images: [ String],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  category: String,
  createdAt: Date,
  isPublished: Boolean
});

export default model('Product', ProductSchema);