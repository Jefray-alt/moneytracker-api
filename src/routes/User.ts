import express, { NextFunction, Request, Response, Router } from 'express';
import { getUserDetails, loginUser, logoutUser, registerUser } from '../controllers/UserController';
import verifyJwt from '../middleware/jwt/verifyJwt';

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;
  try {
    const user = await registerUser({
      email,
      password,
      username
    });

    res.cookie('jwt', user.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json(user).status(201);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const loggedInUser = await loginUser({ email, password });
    res.cookie('jwt', loggedInUser.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json(loggedInUser).status(201);
  } catch (error) {
    next(error);
  }
});

// router.use(verifyJwt);
router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logoutUser(req.user.id);
    res.clearCookie('jwt');
    return res.send('User logged out').status(201);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserDetails(req.params.id);
    return res.json(user).status(201);
  } catch (error) {
    next(error);
  }
});

export default router;
