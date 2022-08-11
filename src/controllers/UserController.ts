import { HydratedDocument } from 'mongoose';
import User from '../models/User';
import { IUser } from '../@types/models';
import { signJwt } from '../utils/jwt';
import bcrypt from 'bcryptjs';
import { newAccessToken, newRefreshToken } from './TokenController';

type UserPayload = Omit<IUser, 'id'>;

export async function registerUser(user: UserPayload) {
  const existingUser: IUser | null = await User.findOne({ email: user.email });

  if (existingUser) {
    throw new Error('User already exists');
  }


  const registeredUser = new User(user);
  const newUser: HydratedDocument<IUser> = await registeredUser.save();
  const { email, username, _id } = newUser;

  const accessToken = signJwt({ id: _id.toString() }, '30s', process.env.SECRET_KEY as string);
  const refreshToken = signJwt({ id: _id.toString() }, '1d', process.env.REFRESH_SECRET_KEY as string);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  return { email, username, _id, accessToken, refreshToken };
}

export async function loginUser(user: { email: string, password: string; }) {

  const existingUser: HydratedDocument<IUser> | null = await User.findOne({ email: user.email }).select('+password');

  if (!existingUser) {
    throw new Error('No User found');
  }

  const isPassCorrect = await bcrypt.compare(user.password, existingUser.password);

  if (!isPassCorrect) {
    throw new Error('No User found');
  }

  const accessToken = await newAccessToken(existingUser._id.toString());
  const refreshToken = await newRefreshToken(existingUser._id.toString());

  existingUser.refreshToken = refreshToken;
  await existingUser.save();
  return { email: existingUser.email, accessToken, refreshToken };
}

export async function logoutUser(id: string) {
  const existingUser: HydratedDocument<IUser> | null = await User.findOne({ _id: id });

  if (existingUser) {
    existingUser.refreshToken = null;
    await existingUser.save();
    return;
  }

  throw new Error('User does not exist');
}

export async function getUserDetails(id?: string) {
  const existingUser: HydratedDocument<IUser> | null = await User.findOne({ _id: id });
  if (existingUser) {
    return existingUser;
  }

  throw new Error('User does not exist');
}