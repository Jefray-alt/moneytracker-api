import { CallbackError } from 'mongoose';
import { IWallet, ITransaction } from '../@types/models';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';

export async function getTransaction(transactionId: string, userId: string) {

  const wallet = await Wallet.findOne(
    { 'transaction._id': transactionId }, function (err: CallbackError, wallet: Array<IWallet>) {
      wallet.filter((wallet) => {
        return wallet.userId === userId;
      });
    });

  if (wallet && wallet.transactions.length !== 0) {
    return wallet?.transactions[0];
  }

  throw new Error('Transaction not found!');
}

export async function addTransaction(transaction: ITransaction, userId: string, walletId: string) {
  const wallet = await Wallet.findOne({ '_id': walletId, userId });

  if (wallet) {
    const createdTransaction = new Transaction(transaction);
    wallet.transactions.push(createdTransaction);
    await wallet.save();

    return createdTransaction;
  }

  throw new Error('No wallet found');
}