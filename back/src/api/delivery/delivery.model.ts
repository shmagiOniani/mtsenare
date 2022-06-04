import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const DeliverySchema = new Schema({
  name: multilingualSchema,
  position: Number,
});

export default model('Delivery', DeliverySchema);