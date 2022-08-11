export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  refreshToken?: string | null;
}

export interface IWallet {
  id: string;
  name: string;
  userId: string;
  transactions: Array<ITransaction>;
  createdAt?: string;
  updatedAt?: string;
  enabled: boolean;
}

export interface ITransaction {
  id: string;
  value: number;
  createdAt?: string;
  updatedAt?: string;
}