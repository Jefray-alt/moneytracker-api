import { NextFunction, Request, Response, Router } from 'express';
import {
  addTransaction,
  getTransaction,
} from '../controllers/TransactionController';
import verifyJwt from '../middleware/jwt/verifyJwt';

const router: Router = Router();

router.use(verifyJwt);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await getTransaction(req.params.id, req.user.id);
    return res.json(transaction).status(201);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await addTransaction(
      req.body.transaction,
      req.user.id,
      req.body.wallet_id
    );
    return res.json(transaction).status(201);
  } catch (error) {
    next(error);
  }
});

export default router;
