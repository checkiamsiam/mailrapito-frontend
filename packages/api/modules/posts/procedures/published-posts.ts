import { BlogSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const publishedPosts = publicProcedure
  .input(z.object({}))
  .output(z.array(BlogSchema))
  .query(async () => {
    const posts = await db.blog.findMany({
      where: {
        published: true || false,
      },
    });
    return posts;
  });
