import { model, Schema } from 'mongoose';
import { ITransaction } from '../@types/models';

const TransactionSchema = new Schema<ITransaction>({
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default model<ITransaction>('transactions', TransactionSchema);