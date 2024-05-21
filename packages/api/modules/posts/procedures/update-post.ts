import { BlogSchema, db } from "database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const updatePost = publicProcedure
  .input(
    z.object({
      id: z.string().min(1, { message: "Required" }),
      title: z.string().min(1, { message: "Required" }),
      slug: z.string().min(1, { message: "Required" }),
      author: z.string().min(1, { message: "Required" }),
      keywords: z.string().min(1, { message: "Required" }),
      description: z.string().min(1, { message: "Required" }),
      category: z.string().min(1, { message: "Required" }),
      language: z.enum(["", "en", "fr", "es", "ar"]),
      content: z
        .string()
        .min(100, { message: "Content must be at least 100 characters long" }),
      thumbnail: z.string().min(1, { message: "Required" }),
    }),
  )
  .output(BlogSchema)
  .mutation(async ({ input }) => {
    const post = await db.blog.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        content: input.content,
        slug: input.slug,
        author: input.author,
        keywords: input.keywords,
        description: input.description,
        category: input.category,
        language: input.language,
        thumbnail: input.thumbnail,
      },
    });

    return post;
  });
