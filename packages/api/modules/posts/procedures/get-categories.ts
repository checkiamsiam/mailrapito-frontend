import { CategorySchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const getCategories = publicProcedure
  .input(z.object({}))
  .output(z.array(CategorySchema))
  .query(async () => {
    const posts = await db.category.findMany({});
    return posts;
  });
