import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const utmField = z
  .string()
  .trim()
  .max(200)
  .regex(/^[\p{L}\p{N} ._\-+|/:%()]*$/u)
  .optional()
  .catch(undefined)
  .transform((v) => (v ? v : undefined));

const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Indica o teu nome completo.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Confirma o número de telefone.")
    .max(30)
    .regex(/^[+()\d\s-]+$/, "Confirma o número de telefone."),
  email: z.string().trim().toLowerCase().email("Indica um email válido.").max(255),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário aceitar a política de privacidade." }) }),
  company: z.string().max(0),
  startedAt: z.number().int().positive(),
  attribution: z
    .object({
      utm_source: utmField,
      utm_medium: utmField,
      utm_campaign: utmField,
      utm_content: utmField,
      utm_term: utmField,
      referrer: z.string().trim().max(500).url().optional().catch(undefined),
    })
    .optional()
    .default({}),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 1_500) {
      throw new Error("Não foi possível validar o pedido. Tenta novamente.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").upsert(
      {
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        consented_at: new Date().toISOString(),
        source: "agenda-cheia-guide",
        // Undefined keys are omitted, so a repeat sign-up keeps its original origin.
        ...data.attribution,
      },
      { onConflict: "email" },
    );

    if (error) {
      console.error("Lead submission failed", { code: error.code });
      throw new Error("Não foi possível guardar os teus dados. Tenta novamente.");
    }

    return { success: true };
  });