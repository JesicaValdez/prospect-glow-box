/**
 * Logótipos oficiais da Grow Digital (ficheiros em /public).
 * - "white": para fundos roxos/escuros
 * - "purple": para fundos claros
 */
type Tone = "white" | "purple";

export function Logo({ tone = "white", className = "h-12 w-auto" }: { tone?: Tone; className?: string }) {
  return <img src={`/logo-growdigital-${tone}.png`} alt="Grow Digital" width={481} height={174} className={className} />;
}

export function LogoMark({ tone = "white", className = "h-10 w-auto", alt = "" }: { tone?: Tone; className?: string; alt?: string }) {
  return <img src={`/logo-mark-${tone}.png`} alt={alt} aria-hidden={alt ? undefined : true} width={182} height={256} className={className} />;
}
