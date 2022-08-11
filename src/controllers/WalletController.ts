import { HydratedDocument } from 'mongoose';
import { IWallet } from '../@types/models';
import Wallet from '../models/Wallet';

export async function createWallet(wallet: IWallet): Promise<IWallet> {
  const existingWallet: HydratedDocument<IWallet> | null = await Wallet.findOne({ name: wallet.name, userId: wallet.userId });

  if (existingWallet) {
    throw new Error('Wallet name already exists');
  }

  const newWallet = new Wallet(wallet);
  await newWallet.save();
  return newWallet;
}

export async function updateWallet(wallet: IWallet, id: string): Promise<IWallet> {
  const existingWallet: HydratedDocument<IWallet> | null = await getWallet(id, wallet.id);

  if (existingWallet) {
    // TODO: update more values needed
    existingWallet.name = wallet.name;
    existingWallet.enabled = wallet.enabled;
    await existingWallet.save();

    return existingWallet;
  }

  throw new Error('Wallet does not exist');
}

export async function getUserWallets(userId: string): Promise<Array<IWallet>> {
  return Wallet.find({ userId });
}

export async function getWallet(userId: string, walletId: string): Promise<HydratedDocument<IWallet> | null> {
  return Wallet.findOne({ userId, _id: walletId });
}