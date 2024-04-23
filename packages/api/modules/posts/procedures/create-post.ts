import { TRPCError } from "@trpc/server";
import { BlogSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const createPost = publicProcedure
  .input(
    z.object({
      title: z.string().min(1, { message: "Required" }),
      slug: z.string().min(1, { message: "Required" }),
      author: z.string().min(1, { message: "Required" }),
      keywords: z.string().min(1, { message: "Required" }),
      description: z.string().min(1, { message: "Required" }),
      category: z.enum(["", "MEMBER", "OWNER"]),
      content: z
        .string()
        .min(100, { message: "Content must be at least 100 characters long" }),
    }),
  )
  .output(BlogSchema)
  .mutation(async ({ input }) => {
    try {
      const newPost = await db.blog.create({
        data: input,
      });
      return newPost;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to post the blog.",
      });
    }
  });
