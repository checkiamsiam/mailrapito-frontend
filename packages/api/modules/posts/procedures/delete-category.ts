import { TRPCError } from "@trpc/server";
import { db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const deleteCategory = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input: { id } }) => {
    try {
      await db.category.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  });
