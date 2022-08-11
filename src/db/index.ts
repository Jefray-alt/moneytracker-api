import consola from 'consola';
import mongoose, { ConnectOptions } from 'mongoose';

export default async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);

    consola.success('Database Connected');
  } catch (error) {
    consola.error(error);
  }
}