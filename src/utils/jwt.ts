import { sign } from 'jsonwebtoken';
import { TokenInterface } from '../@types';

export function signJwt(payload: TokenInterface, limit: string, SECRET_KEY: string) {
  const token = sign(payload, SECRET_KEY, { expiresIn: limit });
  return token;
}