import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  passwordHash: String,
  phoneNumber: String,
  address: String,
  userName: String,
  isActive: Boolean,
  role: String,
  joinedAt: Date,
});

UserSchema.index({email: 1}, {unique: true});

export default model('User', UserSchema);
