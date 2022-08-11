import { Schema, model } from 'mongoose';
import { IUser } from '../@types/models';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  refreshToken: {
    type: String,
    required: false,
    default: null
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
  } else {
    next();
  }

});

export default model<IUser>('users', UserSchema);