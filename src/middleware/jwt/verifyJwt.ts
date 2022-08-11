import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenInterface } from '../../@types';
import { JwtTokenError } from '../../utils/errors';


export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = (decoded as TokenInterface);
    next();
  } catch (error) {
    const errorJwt = new JwtTokenError((error as Error).message);
    next(errorJwt);
  }
}