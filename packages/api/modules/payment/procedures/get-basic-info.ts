import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";
import { getBasicInfo as getBasicInfoResolver } from "../provider";

const BasicInfoSchema = z.object({
  uername: z.string(),
  username: z.string(),
  merchant_id: z.string(),
  email: z.string().email(),
  public_name: z.string(),
  time_joined: z.number().int(),
  kyc_status: z.boolean().optional(),
  kyc_tier: z.number().int().optional(),
  kyc_msg: z.string().optional().optional(),
  kyc_requirefullby: z.number().int().optional(),
  kyc_volume_limit: z.number().int().optional(),
  kyc_volume_used: z.number().int().optional(),
  swych_tos_accepted: z.boolean(),
});

export const getBasicInfo = protectedProcedure
  .output(BasicInfoSchema)
  .query(async () => {
    try {
      const basicInfo = await getBasicInfoResolver();

      if (!basicInfo) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return basicInfo;
    } catch (e) {
      console.error(e);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });
