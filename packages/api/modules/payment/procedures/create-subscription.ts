import { TRPCError } from "@trpc/server";
import type { OrderStatusType } from "database";
import { UserSubscriptionSchema, db } from "database";
import { sendEmail } from "mail";
import { publicProcedure } from "../../../trpc/base";

export const createSubscription = publicProcedure
  .input(UserSubscriptionSchema)
  .mutation(async ({ input: subscription }) => {
    let orderIdExist: {
      id?: string;
      orderId: string;
      email?: string;
      status?: OrderStatusType;
      createdAt?: Date;
    } | null = null;

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
        await sendEmail({
          to: subscription.email,
          templateId: "paymentConfirm",
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
