import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getLeadsDashboard, type LeadRow } from "@/lib/dashboard.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const leadsQueryOptions = queryOptions({
  queryKey: ["leads-dashboard"],
  queryFn: () => getLeadsDashboard(),
});

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [
      { title: "Painel de contactos — Grow Digital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(leadsQueryOptions),
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <p role="alert" className="text-sm text-destructive">
        {error.message}
      </p>
    </main>
  ),
  notFoundComponent: () => null,
  component: PainelPage,
});

const SEM_ORIGEM = "Direto / sem campanha";

type Periodo = "7d" | "30d" | "tudo";

const PERIODOS: { value: Periodo; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "tudo", label: "Tudo" },
];

function origemDe(lead: LeadRow): string {
  if (lead.utm_source) return lead.utm_source;
  if (lead.referrer) {
    try {
      return new URL(lead.referrer).hostname.replace(/^www\./, "");
    } catch {
      return lead.referrer;
    }
  }
  return SEM_ORIGEM;
}

function contarPor(leads: LeadRow[], chave: (l: LeadRow) => string) {
  const mapa = new Map<string, number>();
  for (const lead of leads) {
    const k = chave(lead);
    mapa.set(k, (mapa.get(k) ?? 0) + 1);
  }
  return [...mapa.entries()]
    .map(([nome, total]) => ({ nome, total }))
    .sort((a, b) => b.total - a.total);
}

function seriePorDia(leads: LeadRow[], periodo: Periodo) {
  const dias = periodo === "7d" ? 7 : periodo === "30d" ? 30 : 0;
  const mapa = new Map<string, number>();

  if (dias > 0) {
    const hoje = new Date();
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(d.getDate() - i);
      mapa.set(d.toISOString().slice(0, 10), 0);
    }
  }

  for (const lead of leads) {
    const dia = lead.created_at.slice(0, 10);
    if (dias > 0 && !mapa.has(dia)) continue;
    mapa.set(dia, (mapa.get(dia) ?? 0) + 1);
  }

  return [...mapa.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dia, total]) => ({
      dia: new Date(`${dia}T00:00:00`).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
      }),
      total,
    }));
}

const CORES = [
  "var(--primary)",
  "var(--highlight)",
  "oklch(0.7 0.15 200)",
  "oklch(0.75 0.14 60)",
  "oklch(0.65 0.12 330)",
  "oklch(0.72 0.1 150)",
];

function PainelPage() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(leadsQueryOptions);
  const leads = data.leads;
  const [periodo, setPeriodo] = useState<Periodo>("30d");

  const filtrados = useMemo(() => {
    if (periodo === "tudo") return leads;
    const dias = periodo === "7d" ? 7 : 30;
    const limite = Date.now() - dias * 24 * 60 * 60 * 1000;
    return leads.filter((l) => new Date(l.created_at).getTime() >= limite);
  }, [leads, periodo]);

  const porOrigem = useMemo(() => contarPor(filtrados, origemDe), [filtrados]);
  const porCampanha = useMemo(
    () => contarPor(filtrados, (l) => l.utm_campaign ?? SEM_ORIGEM),
    [filtrados],
  );
  const porDia = useMemo(() => seriePorDia(filtrados, periodo), [filtrados, periodo]);

  async function sair() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Grow Digital
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground">
              Painel de contactos
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Campanha «Agenda Cheia» — origem e evolução dos contactos.
            </p>
          </div>
          <Button variant="outline" onClick={sair}>
            Sair
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {PERIODOS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPeriodo(p.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                periodo === p.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">
            {filtrados.length} contacto{filtrados.length === 1 ? "" : "s"} no período ·{" "}
            {leads.length} no total
          </span>
        </div>

        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Contactos por dia
          </h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={porDia} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="dia" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Contactos"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Por origem
            </h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={porOrigem} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis
                    type="category"
                    dataKey="nome"
                    width={110}
                    tick={{ fontSize: 12 }}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar dataKey="total" name="Contactos" radius={[0, 6, 6, 0]}>
                    {porOrigem.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Por campanha
            </h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={porCampanha} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis
                    type="category"
                    dataKey="nome"
                    width={110}
                    tick={{ fontSize: 12 }}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 13,
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar dataKey="total" name="Contactos" radius={[0, 6, 6, 0]}>
                    {porCampanha.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Contactos recentes
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Nome</th>
                  <th className="pb-2 pr-4 font-medium">Email</th>
                  <th className="pb-2 pr-4 font-medium">Telefone</th>
                  <th className="pb-2 pr-4 font-medium">Origem</th>
                  <th className="pb-2 pr-4 font-medium">Campanha</th>
                  <th className="pb-2 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{lead.full_name}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{lead.email}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{lead.phone}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{origemDe(lead)}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">
                      {lead.utm_campaign ?? "—"}
                    </td>
                    <td className="py-2.5 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      Sem contactos neste período.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
