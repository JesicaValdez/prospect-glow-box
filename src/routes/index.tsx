import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  AtSign,
  BellRing,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock3,
  ListChecks,
  Mail,
  MessageCircle,
  Phone,
  PhoneMissed,
  ShieldCheck,
  X,
} from "lucide-react";

import guideAsset from "@/assets/agenda-cheia.pdf.asset.json";
import { Logo, LogoMark } from "@/components/brand";
import { LegalFooter } from "@/components/legal-page";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agenda Cheia, Sem Viver ao Telefone | Grow Digital" },
      {
        name: "description",
        content: "Guia gratuito para organizar reservas, reduzir mensagens dispersas e preparar o teu negócio para automatizar marcações.",
      },
      { property: "og:title", content: "Agenda Cheia, Sem Viver ao Telefone" },
      {
        property: "og:description",
        content: "Um plano prático de 7 dias para organizar as reservas do teu negócio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fieldClass =
  "h-12 w-full rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20 user-invalid:border-destructive";

const faqs = [
  {
    q: "O guia é mesmo gratuito?",
    a: "Sim. Preenches o formulário e descarregas o PDF de imediato, sem custos nem cartão.",
  },
  {
    q: "Preciso de algum software ou conhecimentos técnicos?",
    a: "Não. O guia é escrito sem linguagem técnica e começa pelo que já usas hoje: telefone, WhatsApp e Instagram. Só no fim percebes se faz sentido automatizar.",
  },
  {
    q: "Quanto tempo demora a aplicar?",
    a: "O plano está dividido em 7 dias, com uma tarefa pequena e concreta por dia, pensada para caber entre atendimentos.",
  },
  {
    q: "Serve para o meu tipo de negócio?",
    a: "Se recebes marcações ou reservas de clientes por vários canais — salão, clínica, estúdio, agência ou outro serviço por marcação — o guia foi feito para ti.",
  },
  {
    q: "Para que precisam do meu telefone?",
    a: "Apenas para comunicações relacionadas com o guia. Podes retirar o consentimento a qualquer momento.",
  },
];

function Index() {
  const sendLead = useServerFn(submitLead);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const form = formRef.current;
    if (!hero || !form || typeof IntersectionObserver === "undefined") return;
    const heroObs = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0.15 });
    const formObs = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.2 });
    heroObs.observe(hero);
    formObs.observe(form);
    return () => {
      heroObs.disconnect();
      formObs.disconnect();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setMessage("");

    try {
      await sendLead({
        data: {
          fullName: String(formData.get("fullName") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          email: String(formData.get("email") ?? ""),
          consent: formData.get("consent") === "on",
          company: String(formData.get("company") ?? ""),
          startedAt,
        },
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Não foi possível enviar. Tenta novamente.");
    }
  }

  const showStickyCta = pastHero && !formVisible && status !== "success";

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* ───────── Header ───────── */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Wordmark />
          <nav className="flex items-center gap-6">
            <a href="#guia" className="hidden items-center gap-2 text-sm font-semibold text-hero-foreground/80 transition hover:text-hero-foreground md:flex">
              Ver o que inclui <ArrowDown className="size-4" />
            </a>
            <Button asChild variant="campaign" size="sm" className="hidden h-10 px-4 text-sm sm:inline-flex">
              <a href="#formulario">Quero o guia</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* ───────── Hero + formulário ───────── */}
      <section ref={heroRef} className="relative bg-hero pt-28 text-hero-foreground sm:pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
          <LogoMark className="absolute -left-24 top-20 h-[34rem] w-auto max-w-none" />
        </div>
        <div className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full bg-primary-strong/60 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hero-foreground/20 bg-hero-foreground/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-highlight">
              <span className="size-1.5 rounded-full bg-highlight" /> Guia gratuito · Plano prático de 7 dias
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
              Agenda cheia, sem viver ao telefone.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-hero-foreground/85 sm:text-xl">
              Organiza as tuas reservas, reduz mensagens dispersas e percebe o que deves automatizar — sem complicar o teu dia.
            </p>
            <ul className="mt-8 grid gap-3 text-base text-hero-foreground/90 sm:grid-cols-3 sm:gap-4">
              {["Diagnóstico rápido", "Checklist essencial", "Plano de 7 dias"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-highlight text-ink"><Check className="size-3.5" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-start gap-4 lg:hidden">
              <Button asChild variant="campaign" size="xl" className="w-full sm:w-auto">
                <a href="#formulario">Quero o guia gratuito <ArrowRight /></a>
              </Button>
              <p className="text-sm text-hero-foreground/75">PDF gratuito · Acesso imediato · Sem spam</p>
            </div>
          </div>

          {/* Cartão do formulário com a capa do guia a espreitar */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
            <div className="absolute -top-8 -right-3 z-0 hidden w-32 rotate-[8deg] sm:block lg:top-6 lg:-right-14 lg:w-40" aria-hidden="true">
              <GuideCover compact />
            </div>
            <div
              id="formulario"
              ref={formRef}
              className="relative z-10 scroll-mt-8 rounded-xl bg-surface-elevated p-6 text-foreground shadow-form ring-1 ring-ink/5 sm:p-8"
            >
              {status === "success" ? (
                <div className="flex min-h-[430px] flex-col justify-center text-center" aria-live="polite">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-7" /></span>
                  <h2 className="mt-6 font-display text-3xl font-semibold">O guia já é teu.</h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Guardámos os teus dados com segurança. Podes descarregar o guia agora.</p>
                  <Button asChild variant="campaign" size="lg" className="mt-7 w-full">
                    <a href={guideAsset.url} download>Descarregar o guia <ArrowDown /></a>
                  </Button>
                  <p className="mt-5 text-xs leading-5 text-muted-foreground">Próximo passo: começa pelo diagnóstico rápido na primeira parte do guia.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">Recebe o guia grátis</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">Começa a organizar a agenda hoje.</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">Preenche os dados e acede de imediato ao PDF.</p>
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold">Nome completo</label>
                      <input id="fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={120} className={fieldClass} placeholder="O teu nome" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email <span className="font-normal text-muted-foreground">— onde recebes o guia</span></label>
                      <input id="email" name="email" type="email" autoComplete="email" required maxLength={255} className={fieldClass} placeholder="nome@empresa.pt" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Telefone</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} pattern="[+()0-9\s-]+" className={fieldClass} placeholder="+351 9XX XXX XXX" />
                    </div>
                    <div className="absolute -left-[10000px]" aria-hidden="true">
                      <label htmlFor="company">Empresa</label><input id="company" name="company" tabIndex={-1} autoComplete="off" />
                    </div>
                    <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted-foreground">
                      <input name="consent" type="checkbox" required className="mt-1 size-4 accent-primary" />
                      <span>Autorizo a Grow Digital a guardar os meus dados para enviar o guia e comunicações relacionadas, de acordo com a <a href="/privacidade" target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2">Política de Privacidade</a>. Posso retirar o consentimento a qualquer momento.</span>
                    </label>
                    {status === "error" && <p role="alert" className="text-sm font-medium text-destructive">{message}</p>}
                    <Button type="submit" variant="campaign" size="xl" className="w-full" disabled={status === "sending"}>
                      {status === "sending" ? "A preparar o guia…" : "Quero o guia gratuito"}<ArrowRight />
                    </Button>
                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground"><ShieldCheck className="size-3.5 text-success" /> Sem spam. Os teus dados ficam protegidos.</p>
                    <p className="text-center text-[11px] leading-4 text-muted-foreground">Depois do guia, envio-te alguns emails curtos com dicas práticas.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Barra de confiança ───────── */}
      <section className="border-b border-border bg-muted/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
          <TrustItem icon={<Clock3 />} title="Feito para quem atende clientes" text="Ações simples, pensadas para caber no teu dia." />
          <TrustItem icon={<Phone />} title="Menos dependência do telefone" text="Um processo claro para cada pedido de marcação." />
          <TrustItem icon={<Mail />} title="Suporte direto, sem intermediários" text="Falas com quem desenvolve, do início ao fim." />
        </div>
      </section>

      {/* ───────── Problema: antes / depois ───────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">O problema não é falta de esforço</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">É um processo que depende demasiado de ti.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Quando as marcações chegam por telefone, WhatsApp e Instagram, é fácil deixar pedidos sem resposta, esquecer confirmações ou perder tempo entre clientes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <BeforePanel />
          <AfterPanel />
        </div>
      </section>

      {/* ───────── O que inclui o guia ───────── */}
      <section id="guia" className="scroll-mt-4 bg-muted/55 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">O que vais encontrar no guia</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">Um plano simples, do caos à agenda organizada.</h2>
            </div>
            <Button asChild variant="campaign" size="lg" className="hidden lg:inline-flex">
              <a href="#formulario">Receber o guia <ArrowRight /></a>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <GuidePage kind="diagnostico" />
            <GuidePage kind="checklist" />
            <GuidePage kind="plano" />
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <Benefit number="01" title="Encontra as falhas" text="Mapeia os pontos onde os pedidos ficam esquecidos." />
            <Benefit number="02" title="Define o essencial" text="Organiza canais, regras, confirmações e lembretes." />
            <Benefit number="03" title="Age durante 7 dias" text="Segue uma tarefa pequena e concreta por dia." />
            <Benefit number="04" title="Decide com clareza" text="Percebe quando faz sentido automatizar a agenda." />
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <Button asChild variant="campaign" size="xl">
              <a href="#formulario">Quero o guia gratuito <ArrowRight /></a>
            </Button>
            <p className="text-sm text-muted-foreground">Leva 1 minuto. O PDF chega de imediato.</p>
          </div>
        </div>
      </section>

      {/* ───────── Para quem é ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Para quem é</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">Este guia é para ti se…</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border-2 border-primary bg-surface-elevated p-7 shadow-card sm:p-9">
            <p className="font-semibold text-primary">✓ É para ti se</p>
            <ul className="mt-5 space-y-4">
              {[
                "Recebes marcações por telefone, WhatsApp e Instagram ao mesmo tempo.",
                "Interrompes atendimentos para responder a pedidos de reserva.",
                "Já perdeste clientes por responder tarde ou esquecer uma confirmação.",
                "Queres automatizar, mas não sabes por onde começar.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-base leading-7">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" strokeWidth={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-7 sm:p-9">
            <p className="font-semibold text-muted-foreground">✕ Não é para ti se</p>
            <ul className="mt-5 space-y-4">
              {[
                "Já tens um sistema de reservas online a funcionar sem falhas.",
                "Procuras uma solução técnica complexa, sem mudar processos.",
                "Recebes muito poucas marcações por semana.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-base leading-7 text-muted-foreground">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-border text-muted-foreground"><X className="size-3" strokeWidth={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── Quem está por trás + testemunho ───────── */}
      <section className="bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center lg:flex-col lg:items-start">
            {/* Substituir por uma foto real: <img src="..." alt="Jesica, Grow Digital" className="size-36 rounded-2xl object-cover" /> */}
            <div className="relative size-32 shrink-0 sm:size-36">
              <div className="absolute inset-0 rotate-6 rounded-2xl bg-highlight" />
              <div className="relative flex size-full items-center justify-center rounded-2xl bg-primary"><LogoMark alt="Grow Digital" className="h-20 w-auto sm:h-24" /></div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-highlight">Quem está por trás</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl">Olá, sou a Jesica.</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-ink-foreground/75">
                Na Grow Digital desenvolvo sistemas de reservas para negócios que atendem clientes. Escrevi este guia com o que é preciso organizar <em>antes</em> de automatizar — para que a tecnologia resolva o problema certo.
              </p>
            </div>
          </div>

          <figure className="relative rounded-2xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-8 sm:p-10">
            <span className="absolute -top-7 left-8 font-display text-8xl leading-none text-highlight" aria-hidden="true">“</span>
            <blockquote className="font-display text-2xl leading-relaxed sm:text-3xl">
              A Jesica entregou o nosso motor de reservas no prazo e com atenção a cada pormenor. A plataforma ficou exatamente como precisávamos.
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {/* Substituir pela foto ou logótipo da Grace Viajes */}
              <span className="flex size-12 items-center justify-center rounded-full bg-highlight text-sm font-bold text-ink">GV</span>
              <span>
                <span className="block font-semibold">Fundadora, Grace Viajes</span>
                <span className="mt-0.5 block text-sm text-ink-foreground/60">Cliente Grow Digital · Portugal</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Perguntas frequentes</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">Antes de descarregar</h2>
        </div>
        <div className="mt-12 divide-y divide-border rounded-xl border border-border bg-surface-elevated">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
                {f.q}
                <ChevronDown className="faq-chevron size-5 shrink-0 text-primary transition-transform" />
              </summary>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────── CTA final ───────── */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-hero px-6 py-16 text-center text-hero-foreground sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-primary-strong/70 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-wide text-highlight">Pronto para começar?</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">A tua agenda pode ser mais simples.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-hero-foreground/85">Recebe o guia gratuito e dá o primeiro passo para um processo de marcações mais claro.</p>
            <Button asChild variant="campaign" size="xl" className="mt-9">
              <a href="#formulario">Quero o guia gratuito <ArrowRight /></a>
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-hero-foreground/75"><ShieldCheck className="size-4" /> Gratuito · Sem spam · Cancelas quando quiseres</p>
          </div>
        </div>
      </section>

      <LegalFooter />

      {/* ───────── CTA fixo em mobile ───────── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${showStickyCta ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!showStickyCta}
      >
        <Button asChild variant="campaign" size="lg" className="w-full">
          <a href="#formulario" tabIndex={showStickyCta ? 0 : -1}>Quero o guia gratuito <ArrowRight /></a>
        </Button>
      </div>
    </main>
  );
}

/* ───────────────────────── Componentes ───────────────────────── */

function Wordmark() {
  return (
    <a href="/" className="flex items-center" aria-label="Grow Digital">
      <Logo className="h-12 w-auto sm:h-16" />
    </a>
  );
}

function GuideCover({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative aspect-[.707] overflow-hidden rounded-md bg-ink text-ink-foreground shadow-guide ring-1 ring-hero-foreground/20 ${compact ? "p-3.5" : "p-8"}`}>
      <div className="absolute inset-x-0 top-0 h-1.5 bg-highlight" />
      <LogoMark className={compact ? "mt-1 h-5 w-auto" : "mt-4 h-12 w-auto"} />
      <p className={`font-bold uppercase text-highlight ${compact ? "mt-1.5 text-[0.5rem]" : "mt-5 text-xs"}`}>Guia prático</p>
      <p className={`font-display leading-tight font-semibold ${compact ? "mt-1.5 text-sm" : "mt-4 text-4xl"}`}>Agenda cheia, sem viver ao telefone</p>
      <p className={`text-ink-foreground/70 ${compact ? "mt-2 text-[0.5rem] leading-3" : "mt-6 text-sm leading-6"}`}>Diagnóstico, checklist e plano de 7 dias.</p>
      <span className={`absolute font-bold text-ink-foreground/60 ${compact ? "bottom-2.5 left-3.5 text-[0.45rem]" : "bottom-8 left-8 text-xs"}`}>GROW DIGITAL · 2026</span>
      <span className={`absolute rounded-full bg-highlight font-bold text-ink ${compact ? "right-2.5 bottom-2 px-1.5 py-0.5 text-[0.45rem]" : "right-6 bottom-6 px-3 py-1 text-xs"}`}>GRÁTIS</span>
    </div>
  );
}

function BeforePanel() {
  const notifs = [
    { icon: <MessageCircle />, app: "WhatsApp", text: "Olá! Têm vaga amanhã de manhã?", time: "09:12", color: "text-success" },
    { icon: <PhoneMissed />, app: "Chamada perdida", text: "+351 9•• ••• 214", time: "09:40", color: "text-alert" },
    { icon: <AtSign />, app: "Instagram", text: "Ainda dá para sábado?", time: "10:05", color: "text-primary" },
    { icon: <MessageCircle />, app: "WhatsApp", text: "Pode confirmar a minha hora?", time: "10:31", color: "text-success" },
    { icon: <PhoneMissed />, app: "Chamadas perdidas (3)", text: "Número desconhecido", time: "11:02", color: "text-alert" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-alert/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-alert">Antes</span>
        <span className="text-sm text-muted-foreground">Pedidos espalhados por 3 canais</span>
      </div>
      <div className="mx-auto mt-7 max-w-sm rounded-[2rem] border-[6px] border-ink bg-muted p-3 shadow-guide">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-ink/80" />
        <div className="relative space-y-2">
          <span className="absolute -top-4 -right-2 z-10 rounded-full bg-alert px-2.5 py-1 text-[0.7rem] font-bold text-white shadow">12 por responder</span>
          {notifs.map((n, i) => (
            <div key={i} className="notif-in flex items-start gap-3 rounded-xl bg-surface-elevated p-3 shadow-sm" style={{ animationDelay: `${i * 90}ms` }}>
              <span className={`mt-0.5 [&_svg]:size-4 ${n.color}`}>{n.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2 text-[0.7rem] font-semibold text-muted-foreground"><span>{n.app}</span><span>{n.time}</span></div>
                <p className="truncate text-sm text-foreground">{n.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-7 space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-alert" /> Pedidos esquecidos entre atendimentos</li>
        <li className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-alert" /> Confirmações feitas de memória</li>
      </ul>
    </div>
  );
}

function AfterPanel() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const slots: { day: number; row: number; label: string; tone: string }[] = [
    { day: 0, row: 0, label: "10:00 · Ana", tone: "bg-primary-soft text-primary-strong" },
    { day: 0, row: 2, label: "14:30 · Rui", tone: "bg-highlight/40 text-ink" },
    { day: 1, row: 1, label: "11:00 · Marta", tone: "bg-highlight/40 text-ink" },
    { day: 2, row: 0, label: "09:30 · João", tone: "bg-primary-soft text-primary-strong" },
    { day: 2, row: 3, label: "16:00 · Inês", tone: "bg-primary-soft text-primary-strong" },
    { day: 3, row: 1, label: "10:30 · Sofia", tone: "bg-primary-soft text-primary-strong" },
    { day: 3, row: 2, label: "15:00 · Pedro", tone: "bg-highlight/40 text-ink" },
    { day: 4, row: 0, label: "09:00 · Clara", tone: "bg-highlight/40 text-ink" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-surface-elevated p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">Depois</span>
        <span className="text-sm text-muted-foreground">Um só processo, tudo à vista</span>
      </div>
      <div className="mt-7 rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold"><CalendarCheck className="size-4 text-primary" /> Esta semana</p>
          <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-[0.7rem] font-semibold text-success">8 confirmadas</span>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {days.map((d, di) => (
            <div key={d} className="space-y-1.5">
              <p className="text-center text-[0.7rem] font-semibold text-muted-foreground">{d}</p>
              {[0, 1, 2, 3].map((row) => {
                const s = slots.find((x) => x.day === di && x.row === row);
                return s ? (
                  <div key={row} className={`h-11 rounded-md px-1.5 py-1 text-[0.6rem] leading-tight font-semibold sm:text-[0.65rem] ${s.tone}`}>
                    {s.label}
                    <Check className="mt-0.5 size-3" strokeWidth={3} />
                  </div>
                ) : (
                  <div key={row} className="h-11 rounded-md border border-dashed border-border" />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <BellRing className="size-3.5 text-primary" /> Lembretes enviados para as marcações de amanhã
        </div>
      </div>
      <ul className="mt-7 space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Cada pedido segue o mesmo caminho</li>
        <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Confirmações e lembretes com regra definida</li>
      </ul>
    </div>
  );
}

function GuidePage({ kind }: { kind: "diagnostico" | "checklist" | "plano" }) {
  const meta = {
    diagnostico: { step: "Parte 1", title: "Diagnóstico rápido", text: "Avalia o teu processo atual e mapeia os pontos onde se perdem reservas.", icon: <Clock3 /> },
    checklist: { step: "Parte 2", title: "Checklist essencial", text: "Organiza canais, horários, confirmações e lembretes — e decide quando faz sentido automatizar.", icon: <ListChecks /> },
    plano: { step: "Parte 3", title: "Plano de 7 dias", text: "Uma tarefa curta por dia para pôr tudo em prática sem parar o negócio.", icon: <CalendarCheck /> },
  }[kind];

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[1/1.1] overflow-hidden rounded-xl border border-border bg-surface-elevated p-5 shadow-card transition duration-300 group-hover:-translate-y-1.5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-wide text-primary">{meta.step}</span>
          <span className="text-[0.6rem] font-semibold text-muted-foreground">Agenda cheia · Grow Digital</span>
        </div>
        <p className="mt-4 font-display text-xl font-semibold">{meta.title}</p>

        {kind === "diagnostico" && (
          <div className="mt-4 space-y-3">
            {[
              ["Pedidos por WhatsApp", "w-4/5"],
              ["Chamadas perdidas", "w-3/5"],
              ["Mensagens no Instagram", "w-2/5"],
              ["Confirmações esquecidas", "w-1/3"],
            ].map(([label, w]) => (
              <div key={label}>
                <p className="text-[0.7rem] text-muted-foreground">{label}</p>
                <div className="mt-1 h-2 rounded-full bg-muted"><div className={`h-2 rounded-full bg-primary ${w}`} /></div>
              </div>
            ))}
          </div>
        )}

        {kind === "checklist" && (
          <ul className="mt-4 space-y-2.5">
            {["Canais de marcação", "Horários e disponibilidade", "Confirmações", "Lembretes", "Quando automatizar"].map((t, i) => (
              <li key={t} className="flex items-center gap-2 text-[0.75rem]">
                <span className={`flex size-4 items-center justify-center rounded border ${i < 3 ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>
                  {i < 3 && <Check className="size-3" strokeWidth={3} />}
                </span>
                {t}
              </li>
            ))}
          </ul>
        )}

        {kind === "plano" && (
          <div className="mt-4 grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div key={d} className={`flex aspect-square items-center justify-center rounded-md text-[0.7rem] font-bold ${d <= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {d}
              </div>
            ))}
            <div className="col-span-7 mt-3 space-y-2">
              {["w-4/5", "w-3/5", "w-2/3"].map((w, i) => (
                <div key={w} className="flex items-center gap-2 rounded-md bg-muted px-2 py-2 text-[0.7rem] font-semibold">
                  <Check className="size-3 text-success" strokeWidth={3} />Dia {i + 1}
                  <span className={`h-1.5 rounded-full bg-border ${w}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary [&_svg]:size-4">{meta.icon}</span>
        <div>
          <h3 className="text-base font-semibold">{meta.title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{meta.text}</p>
        </div>
      </div>
    </article>
  );
}

function TrustItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-primary [&_svg]:size-5">{icon}</span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function Benefit({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="border-t-2 border-primary pt-4">
      <span className="text-xs font-bold text-primary">{number}</span>
      <h3 className="mt-2 text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
