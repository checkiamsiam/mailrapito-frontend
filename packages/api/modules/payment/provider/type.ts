// import type {
//   CoinpaymentsCreateTransactionResponse,
//   CoinpaymentsGetCallbackAddressResponse,
// } from "coinpayments/dist/types/response";

export type GetBasicInfo = (params: object) => Promise<string | null>;

// export type CreateTransaction = (params: {
//   currency1: string;
//   currency2: string;
//   amount: number;
//   buyer_email: string;
//   address?: string;
//   buyer_name?: string;
//   item_name?: string;
//   item_number?: string;
//   invoice?: string;
//   custom?: string;
//   ipn_url?: string;
//   success_url?: string;
//   cancel_url?: string;
// }) => Promise<CoinpaymentsCreateTransactionResponse>;

// export type GetCallbackAddress = (params: {
//   currency: string;
//   ipn_url?: string;
//   label?: string;
//   eip55?: number;
// }) => Promise<CoinpaymentsGetCallbackAddressResponse>;
