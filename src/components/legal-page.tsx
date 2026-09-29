import type { ComponentType, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export type LegalSection = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  content: ReactNode;
};

/** Layout partilhado pelas páginas legais (Privacidade e Termos), com o visual da landing. */
export function LegalPage({
  icon: Icon,
  title,
  updated,
  footerNote,
  sections,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  updated: string;
  footerNote: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden bg-hero text-hero-foreground">
        <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-primary-strong/60 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5 pt-6 pb-14 sm:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5" aria-label="Grow Digital — voltar à página inicial">
              <span className="flex size-10 items-center justify-center rounded-lg bg-hero-foreground font-display text-xl font-semibold text-hero">J</span>
              <span className="font-display text-lg leading-none font-semibold tracking-wide uppercase">
                Grow<span className="block text-[0.7rem] tracking-[0.3em] text-hero-foreground/80">Digital</span>
              </span>
            </a>
            <a href="/" className="flex items-center gap-2 text-sm font-semibold text-hero-foreground/85 transition hover:text-hero-foreground">
              <ArrowLeft className="size-4" /> Voltar
            </a>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-hero-foreground/15 ring-1 ring-hero-foreground/25">
              <Icon className="size-7 text-highlight" />
            </span>
            <div>
              <h1 className="font-display text-4xl leading-tight font-semibold sm:text-5xl">{title}</h1>
              <p className="mt-2 text-sm text-hero-foreground/80">Última atualização: {updated}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
        <nav aria-label="Índice" className="mb-12 rounded-xl border border-border bg-muted/50 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Índice</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#section-${i + 1}`} className="text-muted-foreground transition hover:text-primary">{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-8">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <section.icon className="size-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
              </div>
              <div className="text-base leading-7 text-foreground/85 sm:ml-15">{section.content}</div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">{footerNote}</p>
          <Button asChild variant="campaign" size="lg" className="mt-8">
            <a href="/#formulario">Voltar e receber o guia gratuito <ArrowRight /></a>
          </Button>
        </div>
      </div>

      <LegalFooter />
    </main>
  );
}

export function LegalFooter() {
  return (
    <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted-foreground">
      <p>© 2026 Grow Digital · Estratégia, tecnologia e suporte direto de quem desenvolve.</p>
      <p className="mt-3 flex items-center justify-center gap-4">
        <a href="/privacidade" className="underline-offset-4 transition hover:text-primary hover:underline">Política de Privacidade</a>
        <span aria-hidden="true">·</span>
        <a href="/termos" className="underline-offset-4 transition hover:text-primary hover:underline">Termos de Serviço</a>
      </p>
    </footer>
  );
}

/* Pequenos blocos reutilizáveis para o conteúdo */

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" />
      <div>{children}</div>
    </div>
  );
}

export function CheckItem({ icon: Icon, tone = "text-success", children }: { icon: ComponentType<{ className?: string }>; tone?: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`mt-1 size-4 shrink-0 ${tone}`} />
      <span>{children}</span>
    </div>
  );
}

export function Box({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg bg-muted/60 p-4 ${className}`}>{children}</div>;
}

export function Callout({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "success" | "warning" }) {
  const tones = {
    primary: "border-primary/25 bg-primary-soft/50 text-primary-strong",
    success: "border-success/25 bg-success-soft/60 text-success",
    warning: "border-alert/25 bg-alert/10 text-foreground",
  };
  return <div className={`mt-4 rounded-lg border p-4 font-medium ${tones[tone]}`}>{children}</div>;
}
