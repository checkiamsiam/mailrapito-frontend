import Coinpayments from "coinpayments";
// import type { CreateTransaction } from "../type";

interface CoinpaymentsCredentials {
  key: string;
  secret: string;
}

const credentials: CoinpaymentsCredentials = {
  key: process.env.COINPAYMENT_API_KEY!,
  secret: process.env.COINPAYMENT_API_SECRET!,
};

export function getCoinClient(): Coinpayments {
  const client = new Coinpayments(credentials);

  return client;
}

export const getBasicInfo = async () => {
  const client = getCoinClient();
  const info = await client.getBasicInfo();
  return info;
};

// export const createTransaction: CreateTransaction = async function (params) {
//   const client = getCoinClient();
//   const transaction = await client.createTransaction(params);
//   return transaction;
// };
