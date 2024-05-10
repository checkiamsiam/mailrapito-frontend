import { TRPCError } from "@trpc/server";
import { CategorySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const createCategory = publicProcedure
  .input(
    z.object({
      name: z.string().min(1, { message: "Required" }),
      language: z.string().min(1, { message: "Required" }),
    }),
  )
  .output(CategorySchema)
  .mutation(async ({ input }) => {
    try {
      const newCategory = await db.category.create({
        data: input,
      });
      return newCategory;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to post the blog.",
      });
    }
  });
