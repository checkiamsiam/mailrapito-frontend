import { TRPCError } from "@trpc/server";
import { imageUpload } from "storage";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const signedUploadUrl = publicProcedure
  .input(
    z.object({
      formData: z.instanceof(File),
    }),
  )
  .mutation(async ({ input: { formData } }) => {
    // ATTENTION: be careful with how you give access to write to the storage
    // always check if the user has the right to write to the desired bucket before giving them a signed url

    if (!formData) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "File not found",
      });
    }

    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    return await imageUpload(buffer, file.name);
  });
