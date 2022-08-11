import { model, Schema } from 'mongoose';
import { IWallet } from '../@types/models';
import Transaction from './Transaction';

const WalletSchema = new Schema<IWallet>({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  transactions: [Transaction.schema],
  enabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default model<IWallet>('wallets', WalletSchema);