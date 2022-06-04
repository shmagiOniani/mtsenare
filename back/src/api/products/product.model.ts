import { Schema, model } from 'mongoose';
import imageSchema from '../../schemas/image.schema';
import multilingualSchema from '../../schemas/multilingual.schema';

const ProductSchema = new Schema({
  name: multilingualSchema,
  description: multilingualSchema,
  price: Number,
  deliveryTime: Number,
  deliveryType: String,
  quantity: Number,
  images: [imageSchema],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  isActive: Boolean,
  createdAt: Date,
});

export default model('Product', ProductSchema);