import { createServerFn } from "@tanstack/react-start";

// TEMPORARY one-time setup: creates the first admin account when no users
// exist. Deleted after use.
export const bootstrapAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw new Error("list failed");
  if (list.users.length > 0) return { created: false };

  const password = crypto.randomUUID().replaceAll("-", "").slice(0, 16) + "Gd!";
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: "jesica.valddez@gmail.com",
    password,
    email_confirm: true,
  });
  if (error) throw new Error("create failed");
  return { created: true, password };
});
