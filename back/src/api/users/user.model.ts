import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  userName: String,
  name: String,
  passwordHash: String,
  phoneNumber: String,
  address: String,
  isActive: Boolean,
  role: String,
  joinedAt: Date,
});

UserSchema.index({email: 1}, {unique: true});

export default model('User', UserSchema);
