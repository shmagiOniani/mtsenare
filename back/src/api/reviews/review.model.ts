import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  score: Number,
  date: Date,
});

export default model('Review', ReviewSchema);