// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
// import { protectedProcedure } from "../../../trpc/base";
// import { createTransaction as createTransactionResolver } from "../provider";

// export const createTransaction = protectedProcedure
//   .input(
//     z.object({
//       currency1: z.string(),
//       currency2: z.string(),
//       amount: z.number(),
//       buyer_email: z.string(),
//     }),
//   )
//   .output(
//     z.object({
//       amount: z.string(),
//       txn_id: z.string(),
//       address: z.string(),
//       confirms_needed: z.string(),
//       timeout: z.number().int().positive(),
//       checkout_url: z.string().url(),
//       status_url: z.string().url(),
//       qrcode_url: z.string().url(),
//     }),
//   )
//   .mutation(
//     async ({ input: { currency1, currency2, amount, buyer_email } }) => {
//       try {
//         const transaction = await createTransactionResolver({
//           currency1,
//           currency2,
//           amount,
//           buyer_email,
//         });

//         if (!transaction) {
//           throw new TRPCError({
//             code: "INTERNAL_SERVER_ERROR",
//           });
//         }
//         console.log("createTransaction called", transaction);

//         return transaction;
//       } catch (e) {
//         console.error(e);

//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//         });
//       }
//     },
//   );
