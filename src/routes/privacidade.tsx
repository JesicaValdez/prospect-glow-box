import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Clock, FileText, Mail, MapPin, Shield, Users } from "lucide-react";

import { Box, Callout, CheckItem, LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Grow Digital" },
      { name: "description", content: "Política de privacidade da Grow Digital. Como recolhemos, utilizamos e protegemos os seus dados pessoais." },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Privacy,
});

const sections: LegalSection[] = [
  {
    icon: Users,
    title: "1. Responsável pelo tratamento de dados",
    content: (
      <div className="space-y-3">
        <p>A responsável pelo tratamento dos teus dados pessoais é:</p>
        <Box className="space-y-1.5">
          <p><strong>Jesica Valdez</strong></p>
          <p>Prestadora de serviços digitais independente</p>
          <p>Localização: Portugal</p>
          <p className="flex items-center gap-2"><Mail className="size-4 text-primary" /> Email de contacto: <a className="text-primary underline-offset-4 hover:underline" href="mailto:jesica.valddez@gmail.com">jesica.valddez@gmail.com</a></p>
        </Box>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "2. Que dados recolhemos",
    content: (
      <div className="space-y-3">
        <p>Recolhemos apenas os dados que tu nos forneces voluntariamente, nomeadamente:</p>
        <div className="grid gap-3">
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Dados de identificação:</strong> nome e apelido</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Dados de contacto:</strong> endereço de email, número de telefone ou WhatsApp</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Dados de navegação:</strong> cookies técnicos e, se aplicável, dados de análise de tráfego (ver secção 7)</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Dados de faturação:</strong> processados diretamente pelo Stripe ou Mercado Pago — não armazenamos dados de cartão de crédito nos nossos sistemas</CheckItem>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "3. Para que utilizamos os teus dados",
    content: (
      <div className="space-y-3">
        <p>Os teus dados são utilizados exclusivamente para:</p>
        <div className="grid gap-2">
          <CheckItem icon={CheckCircle}>Enviar o guia gratuito que pediste e comunicações relacionadas, quando dás o teu consentimento no formulário</CheckItem>
          <CheckItem icon={CheckCircle}>Responder às tuas mensagens e pedidos de consulta</CheckItem>
          <CheckItem icon={CheckCircle}>Entregar os serviços ou produtos digitais que adquiriste</CheckItem>
          <CheckItem icon={CheckCircle}>Processar pagamentos (através de plataformas externas certificadas)</CheckItem>
          <CheckItem icon={CheckCircle}>Enviar comunicações relacionadas com o serviço contratado</CheckItem>
          <CheckItem icon={CheckCircle}>Melhorar a experiência do nosso site</CheckItem>
        </div>
        <Callout tone="success">
          <AlertCircle className="mr-2 inline size-4" />
          Não utilizamos os teus dados para fins publicitários de terceiros. Não vendemos dados pessoais a ninguém.
        </Callout>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "4. Base legal para o tratamento",
    content: (
      <div className="space-y-3">
        <p>O tratamento dos teus dados pessoais assenta nas seguintes bases legais previstas no RGPD:</p>
        <div className="space-y-3">
          <p className="border-l-4 border-primary pl-4"><strong>Execução de contrato (Art. 6.º, n.º 1, al. b):</strong> quando os dados são necessários para prestar o serviço que solicitaste</p>
          <p className="border-l-4 border-primary pl-4"><strong>Consentimento (Art. 6.º, n.º 1, al. a):</strong> quando preencheste um formulário ou iniciaste contacto voluntariamente</p>
          <p className="border-l-4 border-primary pl-4"><strong>Interesses legítimos (Art. 6.º, n.º 1, al. f):</strong> para manter a segurança do site e melhorar os nossos serviços</p>
        </div>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "5. Durante quanto tempo conservamos os dados",
    content: (
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-muted">
              <th className="border-b border-border p-3 text-left">Tipo de dado</th>
              <th className="border-b border-border p-3 text-left">Prazo de conservação</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b border-border p-3">Dados de contacto (formulários)</td><td className="border-b border-border p-3">12 meses após o último contacto</td></tr>
            <tr className="bg-muted/50"><td className="border-b border-border p-3">Dados de clientes com contrato ativo</td><td className="border-b border-border p-3">Durante a vigência do serviço + 3 anos</td></tr>
            <tr><td className="border-b border-border p-3">Dados de faturação</td><td className="border-b border-border p-3">10 anos (obrigação legal fiscal)</td></tr>
            <tr className="bg-muted/50"><td className="p-3">Dados de navegação / cookies analíticos</td><td className="p-3">Máximo 13 meses</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    icon: Users,
    title: "6. Com quem partilhamos os teus dados",
    content: (
      <div className="space-y-3">
        <p>Os teus dados podem ser partilhados com os seguintes prestadores de serviços, exclusivamente para a finalidade indicada:</p>
        <div className="grid gap-3">
          <Box><strong>Lovable (alojamento desta página e armazenamento dos contactos do formulário)</strong></Box>
          <Box><strong>Stripe (processamento de pagamentos)</strong></Box>
          <Box><strong>Mercado Pago (processamento de pagamentos)</strong></Box>
          <Box><strong>Vercel (alojamento do site)</strong></Box>
          <Box><strong>WhatsApp / Meta (quando inicias contacto via WhatsApp)</strong></Box>
        </div>
        <p className="text-sm text-muted-foreground">
          Todos os subcontratantes estão sujeitos a obrigações de confidencialidade. Não transferimos dados para países fora do Espaço Económico Europeu sem garantias adequadas.
        </p>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "7. Cookies",
    content: (
      <div className="space-y-3">
        <p>O nosso site utiliza cookies. Existem dois tipos:</p>
        <div className="grid gap-3">
          <div className="flex items-start gap-3"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-success" /><div><strong>Cookies essenciais</strong> — necessários para o funcionamento básico do site. Não requerem consentimento.</div></div>
          <div className="flex items-start gap-3"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" /><div><strong>Cookies analíticos</strong> — utilizados para compreender como os visitantes interagem com o site (ex: Google Analytics, se aplicável). Só são ativados com o teu consentimento.</div></div>
        </div>
        <Callout>Podes gerir ou desativar os cookies nas definições do teu navegador a qualquer momento.</Callout>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "8. Os teus direitos",
    content: (
      <div className="space-y-3">
        <p>Ao abrigo do RGPD, tens os seguintes direitos:</p>
        <div className="grid gap-3">
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito de acesso</strong> — saber que dados temos sobre ti</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito de retificação</strong> — corrigir dados inexatos</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito ao apagamento</strong> — solicitar a eliminação dos teus dados ("direito a ser esquecido")</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito à portabilidade</strong> — receber os teus dados num formato legível por máquina</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito de oposição</strong> — opor-te ao tratamento dos teus dados</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito de limitação</strong> — solicitar a suspensão do tratamento em determinadas circunstâncias</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Direito de retirar o consentimento</strong> — a qualquer momento, sem que isso afete o tratamento já realizado</CheckItem>
        </div>
        <Callout>
          Para exerceres qualquer um destes direitos, envia um email para <strong>jesica.valddez@gmail.com</strong> com o assunto "Direitos RGPD". Respondemos no prazo máximo de 30 dias.
        </Callout>
      </div>
    ),
  },
  {
    icon: AlertCircle,
    title: "9. Direito de apresentar reclamação",
    content: (
      <div className="space-y-3">
        <p>Se considerares que o tratamento dos teus dados viola o RGPD, tens o direito de apresentar reclamação à autoridade de controlo portuguesa:</p>
        <Box className="space-y-1.5">
          <p><strong>CNPD — Comissão Nacional de Proteção de Dados</strong></p>
          <p>Site: <a className="text-primary underline-offset-4 hover:underline" href="https://www.cnpd.pt" target="_blank" rel="noreferrer">www.cnpd.pt</a></p>
          <p>Email: geral@cnpd.pt</p>
        </Box>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "10. Alterações a esta política",
    content: (
      <p>Podemos atualizar esta Política de Privacidade periodicamente. A data de "última atualização" no topo do documento indica quando foi revista pela última vez. Recomendamos que a consultes regularmente.</p>
    ),
  },
  {
    icon: Mail,
    title: "11. Contacto",
    content: (
      <div className="space-y-3">
        <p>Para qualquer questão relacionada com a privacidade dos teus dados:</p>
        <div className="space-y-3 rounded-lg border border-primary/20 bg-primary-soft/40 p-6">
          <p className="flex items-center gap-3 font-medium"><Mail className="size-5 text-primary" /> jesica.valddez@gmail.com</p>
          <p className="flex items-center gap-3 font-medium"><MapPin className="size-5 text-primary" /> Portugal</p>
        </div>
      </div>
    ),
  },
];

function Privacy() {
  return (
    <LegalPage
      icon={Shield}
      title="Política de Privacidade"
      updated="setembro de 2026"
      footerNote="Esta política foi atualizada pela última vez em setembro de 2026 e está em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD)."
      sections={sections}
    />
  );
}
