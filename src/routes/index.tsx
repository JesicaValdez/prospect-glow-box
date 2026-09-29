import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, Clock3, Mail, Phone, ShieldCheck } from "lucide-react";

import guideAsset from "@/assets/agenda-cheia.pdf.asset.json";
import logoAsset from "@/assets/logo-growdigital.png.asset.json";
import watermarkAsset from "@/assets/logo-watermark.png.asset.json";
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
  "h-12 w-full rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20";

function Index() {
  const sendLead = useServerFn(submitLead);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <img src={logoAsset.url} alt="Grow Digital" className="h-12 w-auto object-contain object-left mix-blend-screen sm:h-14" />
          <a href="#guia" className="hidden items-center gap-2 text-sm font-semibold text-hero-foreground/80 transition hover:text-hero-foreground sm:flex">
            Ver o que inclui <ArrowDown className="size-4" />
          </a>
        </div>
      </header>

      <section className="relative bg-hero pt-32 text-hero-foreground">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
          <img src={watermarkAsset.url} alt="" className="absolute -right-28 top-16 w-[36rem] max-w-none" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-20 lg:px-12 lg:pb-20">
          <div className="max-w-3xl pb-2">
            <p className="mb-6 text-xs font-bold uppercase text-highlight">Guia gratuito · Plano prático de 7 dias</p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
              Agenda cheia, sem viver ao telefone.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-hero-foreground/78 sm:text-xl">
              Organiza as tuas reservas, reduz mensagens dispersas e percebe o que deves automatizar — sem complicar o teu dia.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-hero-foreground/80">
              <span className="flex items-center gap-2"><Check className="size-4 text-highlight" /> Diagnóstico rápido</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-highlight" /> Checklist essencial</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-highlight" /> Plano de 7 dias</span>
            </div>
          </div>

          <div id="formulario" className="scroll-mt-8 rounded-lg bg-surface-elevated p-6 text-foreground shadow-form sm:p-8">
            {status === "success" ? (
              <div className="flex min-h-[430px] flex-col justify-center text-center" aria-live="polite">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-7" /></span>
                <h2 className="mt-6 font-display text-3xl font-semibold">O guia já é teu.</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Guardámos os teus dados com segurança. Podes descarregar o guia agora.</p>
                <Button asChild variant="campaign" size="lg" className="mt-7 w-full">
                  <a href={guideAsset.url} download>Descarregar o guia <ArrowDown /></a>
                </Button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase text-primary">Recebe o guia</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">Começa a organizar a agenda hoje.</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Preenche os dados para acederes imediatamente ao PDF.</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold">Nome completo</label>
                    <input id="fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={120} className={fieldClass} placeholder="O teu nome" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Telefone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} pattern="[+()0-9\s-]+" className={fieldClass} placeholder="+351 9XX XXX XXX" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required maxLength={255} className={fieldClass} placeholder="nome@empresa.pt" />
                  </div>
                  <div className="absolute -left-[10000px]" aria-hidden="true">
                    <label htmlFor="company">Empresa</label><input id="company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted-foreground">
                    <input name="consent" type="checkbox" required className="mt-1 size-4 accent-primary" />
                    <span>Autorizo a Grow Digital a guardar os meus dados para enviar o guia e comunicações relacionadas. Posso retirar o consentimento a qualquer momento.</span>
                  </label>
                  {status === "error" && <p role="alert" className="text-sm font-medium text-destructive">{message}</p>}
                  <Button type="submit" variant="campaign" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? "A preparar o guia…" : "Quero o guia gratuito"}<ArrowRight />
                  </Button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground"><ShieldCheck className="size-3.5" /> Sem spam. Os teus dados ficam protegidos.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-12">
          <TrustItem icon={<Clock3 />} title="Feito para quem atende clientes" text="Ações simples, pensadas para caber no teu dia." />
          <TrustItem icon={<Phone />} title="Menos dependência do telefone" text="Um processo claro para cada pedido de marcação." />
          <TrustItem icon={<Mail />} title="Aplicação imediata" text="Checklist e plano prático, sem linguagem técnica." />
        </div>
      </section>

      <section id="guia" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div className="relative mx-auto w-full max-w-md px-6">
            <div className="absolute inset-x-0 bottom-0 h-4/5 -rotate-3 rounded-lg bg-primary-soft" />
            <div className="relative aspect-[.707] overflow-hidden rounded-md bg-primary p-8 text-primary-foreground shadow-guide sm:p-10">
              <img src={logoAsset.url} alt="Grow Digital" className="h-20 w-auto object-contain object-left mix-blend-screen" />
              <p className="mt-12 text-xs font-bold uppercase text-highlight">Guia prático</p>
              <p className="mt-4 font-display text-4xl leading-tight font-semibold">Agenda cheia, sem viver ao telefone</p>
              <p className="mt-6 text-sm leading-6 text-primary-foreground/75">Diagnóstico, checklist e plano de 7 dias.</p>
              <span className="absolute bottom-8 left-8 text-xs font-bold text-primary-foreground/65 sm:left-10">GROW DIGITAL · 2026</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-primary">O problema não é falta de esforço</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-semibold sm:text-5xl">É um processo que depende demasiado de ti.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Quando as marcações chegam por telefone, WhatsApp e Instagram, é fácil deixar pedidos sem resposta, esquecer confirmações ou perder tempo entre clientes.</p>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <Benefit number="01" title="Encontra as falhas" text="Mapeia os pontos onde os pedidos ficam esquecidos." />
              <Benefit number="02" title="Define o essencial" text="Organiza canais, regras, confirmações e lembretes." />
              <Benefit number="03" title="Age durante 7 dias" text="Segue uma tarefa pequena e concreta por dia." />
              <Benefit number="04" title="Decide com clareza" text="Percebe quando faz sentido automatizar a agenda." />
            </div>
            <Button asChild variant="campaign" size="lg" className="mt-9"><a href="#formulario">Receber o guia <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-ink-foreground lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 text-center sm:px-8">
          <p className="font-display text-3xl leading-relaxed sm:text-4xl">“A Jesica entregou o nosso motor de reservas no prazo e com atenção a cada pormenor. A plataforma ficou exatamente como precisávamos.”</p>
          <div><p className="font-semibold">Fundadora, Grace Viajes</p><p className="mt-1 text-sm text-ink-foreground/60">Cliente Grow Digital · Portugal</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <p className="text-xs font-bold uppercase text-primary">Pronto para começar?</p>
        <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">A tua agenda pode ser mais simples.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Recebe o guia gratuito e dá o primeiro passo para um processo de marcações mais claro.</p>
        <Button asChild variant="campaign" size="lg" className="mt-8"><a href="#formulario">Quero o guia gratuito <ArrowRight /></a></Button>
      </section>

      <footer className="border-t border-border px-5 py-7 text-center text-xs text-muted-foreground">© 2026 Grow Digital · Estratégia, tecnologia e suporte direto de quem desenvolve.</footer>
    </main>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex gap-3"> <span className="mt-0.5 text-primary [&_svg]:size-5">{icon}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div></div>;
}

function Benefit({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="border-t border-border pt-4"><span className="text-xs font-bold text-primary">{number}</span><h3 className="mt-2 text-base font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>;
}
