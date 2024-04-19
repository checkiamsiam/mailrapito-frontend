import { BlogSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const publishedPosts = publicProcedure
  .output(z.array(BlogSchema))
  .query(async () => {
    const posts = await db.blog.findMany({
      where: {
        title: true,
      },
    });

    return posts;
  });
