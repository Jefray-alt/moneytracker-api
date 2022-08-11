import express, { NextFunction, Request, Response, Router } from 'express';
import { createNewRefreshToken, createNewAccessToken } from '../controllers/TokenController';

const router: Router = express.Router();

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies || !req.cookies['jwt']) {
      next(new Error('No Refresh token detected'));
    }
    const refreshToken = await createNewRefreshToken(req.cookies['jwt']);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({ status: 'success' }).status(201);
  } catch (error) {
    next(error);
  }
});

router.get('/access-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies || !req.cookies['jwt']) {
      next(new Error('No Refresh token detected'));
    }
    const accessToken = await createNewAccessToken(req.cookies['jwt']);
    return res.json({ access_token: accessToken }).status(201);
  } catch (error) {
    next(error);
  }
});

export default router;