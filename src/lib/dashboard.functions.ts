import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LeadRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
};

export const getLeadsDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("leads")
      .select(
        "id, full_name, email, phone, created_at, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Dashboard read failed", { code: error.code });
      throw new Error("Não foi possível carregar os contactos.");
    }

    return { leads: (data ?? []) as LeadRow[] };
  });
