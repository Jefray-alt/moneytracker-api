import { signJwt } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { TokenInterface } from '../@types';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../@types/models';

export async function newAccessToken(id: string) {
  return signJwt({ id }, '30s', process.env.SECRET_KEY as string);
}

export async function newRefreshToken(id: string) {
  return signJwt({ id }, '1d', process.env.REFRESH_SECRET_KEY as string);
}

export async function createNewRefreshToken(refreshToken: string) {
  const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY as string);
  const userObj: HydratedDocument<IUser> | null = await User.findOne({ id: (user as TokenInterface).id });

  if (userObj) {
    userObj.refreshToken = await newRefreshToken(userObj._id.toString());
    await userObj.save();
    return userObj.refreshToken;
  }

  throw new Error('User not found');
}


export async function createNewAccessToken(refreshToken: string) {
  const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY as string);
  const userObj: HydratedDocument<IUser> | null = await User.findOne({ id: (user as TokenInterface).id });

  if (userObj) {
    return newAccessToken(userObj._id.toString());
  }

  throw new Error('User not found');
}