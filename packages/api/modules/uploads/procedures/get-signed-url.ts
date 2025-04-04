import { TRPCError } from "@trpc/server";
import { getSignedUrl } from "storage";
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
    if (bucket) {
      return getSignedUrl(path, { bucket });
    }

    throw new TRPCError({
      code: "FORBIDDEN",
    });
  });
