import express, { Router, Request, Response } from 'express';
import User from './User';
import Token from './Token';
import Wallet from './Wallet';
import Transaction from './Transaction';

const router: Router = express.Router();

router.use('/user', User);
router.use('/token', Token);
router.use('/wallet', Wallet);
router.use('/transaction', Transaction);

export default router;
