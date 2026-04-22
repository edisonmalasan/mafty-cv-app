import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";
import { mime } from "zod";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export async function uploadToSupabase(
  buffer: Buffer,
  mimeType: string,
  path: string,
): Promise<string> {
  const { error } = await supabase.storage
    .from("maftycv-assets")
    .upload(path, buffer, {
      contentType: mimeType,
      upsert: true, // overwrite if file already exists
    });
  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const { data } = await supabase.storage
    .from("maftycv-assets")
    .getPublicUrl(path);
  return data.publicUrl;
}
