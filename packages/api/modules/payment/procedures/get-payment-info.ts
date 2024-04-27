import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";
import { getPaymentInfo as getPaymentInfoResolver } from "../provider";

const GetPaymentInfoSchema = z.object({
  txid: z.string(),
  full: z.number().int(),
});

const GetPaymentInfoResponseSchema = z.object({
  time_created: z.number(),
  time_expires: z.number(),
  status: z.number(),
  status_text: z.string(),
  type: z.string(),
  coin: z.string(),
  amount: z.number(),
  amountf: z.string(),
  received: z.number(),
  receivedf: z.string(),
  recv_confirms: z.number(),
  payment_address: z.string(),
});

export const getPaymentInfo = publicProcedure
  .input(GetPaymentInfoSchema)
  .output(GetPaymentInfoResponseSchema)
  .mutation(async ({ input: { txid, full } }) => {
    try {
      const paymentInfo = await getPaymentInfoResolver({ txid, full });

      if (!paymentInfo) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return paymentInfo;
    } catch (e) {
      console.error(e);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });
