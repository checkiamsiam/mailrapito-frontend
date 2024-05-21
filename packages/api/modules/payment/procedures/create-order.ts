import { TRPCError } from "@trpc/server";
import { OrderSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const createOrder = publicProcedure
  .input(
    z.object({
      orderId: z
        .string()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      email: z.string().email(),
      status: z.enum(["CREATED", "PENDING", "PAID"]),
    }),
  )
  .output(OrderSchema)
  .mutation(async ({ input }) => {
    try {
      const newOrder = await db.order.create({
        data: input,
      });
      console.log("order created", newOrder);
      return newOrder;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to post the blog.",
      });
    }
  });
