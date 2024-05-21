import Coinpayments from "coinpayments";
// import type { CreateTransaction } from "../type";
import type { GetPaymentInfo } from "../type";

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

export const getPaymentInfo: GetPaymentInfo = async function (params: {
  txid: string;
  full: number; // Set to 1 to also include the raw checkout and shipping data for the payment if available.
}) {
  const { txid, full } = params;
  const client = getCoinClient();
  const info = await client.getTx({ txid, full });
  return info;
};

// export const createTransaction: CreateTransaction = async function (params) {
//   const client = getCoinClient();
//   const transaction = await client.createTransaction(params);
//   return transaction;
// };
