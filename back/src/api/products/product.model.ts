import { Schema, model } from 'mongoose';
import imageSchema from '../../schemas/image.schema';
import multilingualSchema from '../../schemas/multilingual.schema';

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  deliveryTime: String,
  deliveryType: String,
  quantity: Number,
  images: [imageSchema],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  isActive: Boolean,
  createdAt: Date,
});

export default model('Product', ProductSchema);