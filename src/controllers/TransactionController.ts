import { CallbackError } from 'mongoose';
import { IWallet, ITransaction } from '../@types/models';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';

export async function getTransaction(transactionId: string, userId: string) {
  const wallet = await Wallet.findOne(
    { userId },
    { 'transactions._id': transactionId }
  );

  if (wallet?.transactions[0]) {
    return wallet;
  }

  throw new Error('Transaction not found!');
}

export async function addTransaction(
  transaction: ITransaction,
  userId: string,
  walletId: string
) {
  const wallet = await Wallet.findOne({ _id: walletId, userId });

  if (wallet) {
    const createdTransaction = new Transaction(transaction);
    wallet.transactions.push(createdTransaction);
    await wallet.save();

    return createdTransaction;
  }

  throw new Error('No wallet found');
}
