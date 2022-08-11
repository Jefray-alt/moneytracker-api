import { Request } from 'express';
import { NotFoundError } from '../../utils/errors';

export default function (req: Request) {
  throw new NotFoundError(`${req.path} Route not found`);
}