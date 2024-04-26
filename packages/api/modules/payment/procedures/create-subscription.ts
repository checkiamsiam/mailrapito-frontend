import { TRPCError } from "@trpc/server";
import { UserSubscriptionSchema, db } from "database";
import { publicProcedure } from "../../../trpc/base";

export const createSubscription = publicProcedure
  .input(UserSubscriptionSchema)
  .mutation(async ({ input: subscription }) => {
    let orderIdExist = null;

    if (subscription?.orderId) {
      orderIdExist = await db.order.findFirst({
        where: {
          orderId: subscription.orderId,
        },
      });
    }

    try {
      if (orderIdExist) {
        await db.order.update({
          where: {
            orderId: subscription.orderId,
          },
          data: {
            status: "PAID",
          },
        });
        await db.userSubscription.create({
          data: {
            ...subscription,
            status: "PAID",
          },
        });
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Order id does not exist.",
      });
    }
  });
