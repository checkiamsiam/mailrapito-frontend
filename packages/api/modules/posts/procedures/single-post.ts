import { BlogSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const singlePost = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .output(BlogSchema)
  .query(async ({ input }) => {
    const post = await db.blog.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  });
