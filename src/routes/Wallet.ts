import express, { NextFunction, Request, Response } from 'express';
import { createWallet, getUserWallets, getWallet, updateWallet } from '../controllers/WalletController';
import verifyJwt from '../middleware/jwt/verifyJwt';

const router = express.Router();

router.use(verifyJwt);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wallet = await createWallet(req.body);

    return res.json(wallet).status(201);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wallet = await updateWallet(req.body, req.user.id);

    return res.json(wallet).status(201);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wallet = await getWallet(req.user.id, req.params.id);

    return res.json(wallet).status(201);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wallets = await getUserWallets(req.user.id);

    return res.json(wallets).status(201);
  } catch (error) {
    next(error);
  }
});

export default router;