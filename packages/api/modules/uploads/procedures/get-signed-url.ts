import { TRPCError } from "@trpc/server";
import { getPublicUrl } from "storage";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

export const getSignedUploadedUrl = protectedProcedure
  .input(
    z.object({
      bucket: z.string().min(1),
      path: z.string().min(1),
    }),
  )
  .mutation(({ input: { bucket, path } }) => {
    if (bucket === "avatars") {
      return getPublicUrl(path, { bucket });
    }

    throw new TRPCError({
      code: "FORBIDDEN",
    });
  });
