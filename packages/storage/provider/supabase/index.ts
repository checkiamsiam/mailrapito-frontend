import { createClient } from "@supabase/supabase-js";
import type {
  GetPublicUrlHandler,
  GetSignedUploadUrlHandler,
  GetSignedUrlHander,
} from "../../types";

let supabaseClient: ReturnType<typeof createClient> | null = null;
const getSupabaseAdminClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  if (!supabaseUrl) {
    throw new Error("Missing env variable NEXT_PUBLIC_SUPABASE_URL");
  }

  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing env variable SUPABASE_SERVICE_ROLE_KEY");
  }

  supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

  return supabaseClient;
};

export const getSignedUploadUrl: GetSignedUploadUrlHandler = async (
  path,
  { bucket },
) => {
  const supabaseClient = getSupabaseAdminClient();
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error) {
    console.error(error);
    throw new Error("Could not get signed url");
  }

  return data.signedUrl;
};

export const getPublicUrl: GetPublicUrlHandler = (path, { bucket }) => {
  const supabaseClient = getSupabaseAdminClient();
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};

// This function can be used to get signed URLs for uploaded files in S3 which has the expiry time
export const getSignedUrl: GetSignedUrlHander = async (
  path,
  { bucket, expiresIn },
) => {
  const supabaseClient = getSupabaseAdminClient();
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn ?? 3600);

  if (error) {
    console.error(error);
    throw new Error("Could not get signed url");
  }

  return data.signedUrl;
};
