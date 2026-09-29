import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, Clock, FileText, Shield, Users, XCircle } from "lucide-react";

import { Box, Bullet, Callout, CheckItem, LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Serviço | Grow Digital" },
      { name: "description", content: "Termos de serviço da Grow Digital. Condições de utilização dos nossos serviços digitais." },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Terms,
});

const sections: LegalSection[] = [
  {
    icon: FileText,
    title: "1. Objeto e Aceitação",
    content: (
      <div className="space-y-3">
        <p>Estes Termos de Serviço regulam a utilização dos serviços prestados por Jesica Valdez, prestadora independente de serviços digitais.</p>
        <p>Ao aceder ou utilizar os nossos serviços, o cliente declara ter lido, compreendido e aceitado estes Termos sem reservas.</p>
        <p>Caso não concorde com estes Termos, não deverá utilizar os nossos serviços.</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "2. Definições",
    content: (
      <div className="grid gap-3">
        <Bullet><strong>"Prestador"</strong> — Jesica Valdez, prestadora de serviços digitais independente</Bullet>
        <Bullet><strong>"Cliente"</strong> — pessoa singular ou coletiva que adquire os serviços</Bullet>
        <Bullet><strong>"Serviços"</strong> — todos os serviços digitais descritos no site, incluindo desenvolvimento web, SEO, sistemas de reservas, entre outros</Bullet>
        <Bullet><strong>"Plataforma"</strong> — site growdigitalbyjesica.com e todos os seus subdomínios</Bullet>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "3. Serviços Prestados",
    content: (
      <div className="space-y-3">
        <p>O Prestador oferece os seguintes tipos de serviços:</p>
        <div className="grid gap-3">
          <Box><h3 className="mb-1 font-semibold">Desenvolvimento Web</h3><p className="text-sm">Criação de sites, landing pages, sistemas de reservas e aplicações web personalizadas</p></Box>
          <Box><h3 className="mb-1 font-semibold">SEO Local</h3><p className="text-sm">Otimização para Google Maps e busca local, com gestão contínua</p></Box>
          <Box><h3 className="mb-1 font-semibold">SaaS Products</h3><p className="text-sm">Soluções como BARBERCO, AURA e MesaFlow com assinatura mensal/anual</p></Box>
        </div>
        <p className="text-sm text-muted-foreground">A descrição detalhada de cada serviço, incluindo preços e funcionalidades, está disponível na secção correspondente do site.</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "4. Obrigações do Cliente",
    content: (
      <div className="space-y-3">
        <p>O Cliente compromete-se a:</p>
        <div className="grid gap-2">
          <CheckItem icon={CheckCircle}>Fornecer informações verdadeiras, completas e atualizadas</CheckItem>
          <CheckItem icon={CheckCircle}>Responder atempadamente aos pedidos de informação ou esclarecimento</CheckItem>
          <CheckItem icon={CheckCircle}>Respeitar os prazos de pagamento acordados</CheckItem>
          <CheckItem icon={CheckCircle}>Utilizar os serviços de acordo com a lei e estes Termos</CheckItem>
          <CheckItem icon={CheckCircle}>Não partilhar credenciais de acesso a sistemas</CheckItem>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "5. Obrigações do Prestador",
    content: (
      <div className="space-y-3">
        <p>O Prestador compromete-se a:</p>
        <div className="grid gap-2">
          <CheckItem icon={CheckCircle}>Prestar os serviços com diligência profissional</CheckItem>
          <CheckItem icon={CheckCircle}>Respeitar os prazos de entrega acordados</CheckItem>
          <CheckItem icon={CheckCircle}>Manter a confidencialidade das informações do Cliente</CheckItem>
          <CheckItem icon={CheckCircle}>Fornecer suporte técnico conforme acordado</CheckItem>
          <CheckItem icon={CheckCircle}>Garantir a conformidade com a legislação aplicável</CheckItem>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "6. Preços e Pagamento",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="mb-1 font-semibold">Serviços One-off</h3>
          <p>Pagamento único na assinatura do serviço. Os preços estão indicados no site e são válidos por 30 dias.</p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Serviços de Assinatura (SaaS)</h3>
          <p>Pagamento mensal ou anual, processado automaticamente no início de cada período.</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>O plano anual inclui 3 meses grátis</li>
            <li>Cancelamento a qualquer momento, sem penalizações</li>
            <li>O serviço mantém-se ativo até ao final do período pago</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Formas de Pagamento</h3>
          <p>Aceitamos pagamentos através de Stripe e Mercado Pago. O Prestador não armazena dados de cartão de crédito.</p>
        </div>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "7. Prazos de Entrega",
    content: (
      <div className="space-y-3">
        <p>Os prazos de entrega são indicados para cada serviço e contam a partir da:</p>
        <div className="grid gap-2">
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Receção de todos os materiais</strong> necessários por parte do Cliente</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Confirmação do pagamento</strong> (quando aplicável)</CheckItem>
          <CheckItem icon={CheckCircle} tone="text-primary"><strong>Aprovação final</strong> de cada fase do projeto</CheckItem>
        </div>
        <Callout tone="warning">
          <AlertTriangle className="mr-2 inline size-4 text-alert" />
          Atrasos na entrega por parte do Cliente podem resultar no prolongamento dos prazos de forma proporcional.
        </Callout>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "8. Propriedade Intelectual",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="mb-1 font-semibold">Direitos do Prestador</h3>
          <p>O Prestador mantém os direitos de propriedade intelectual sobre:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Código fonte e frameworks desenvolvidos</li>
            <li>Metodologias e processos de trabalho</li>
            <li>Conteúdo do site e materiais de marketing</li>
            <li>Templates e sistemas reutilizáveis</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Direitos do Cliente</h3>
          <p>Após pagamento integral, o Cliente adquire:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Direitos de uso exclusivo do site/sistema desenvolvido</li>
            <li>Propriedade sobre conteúdo fornecido pelo Cliente</li>
            <li>Direitos de modificação do sistema final</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: AlertTriangle,
    title: "9. Limitação de Responsabilidade",
    content: (
      <div className="space-y-3">
        <p>O Prestador não é responsável por:</p>
        <div className="grid gap-2">
          <CheckItem icon={XCircle} tone="text-alert">Lucros cessantes ou danos indiretos</CheckItem>
          <CheckItem icon={XCircle} tone="text-alert">Problemas causados por terceiros (hosting, domínios, etc.)</CheckItem>
          <CheckItem icon={XCircle} tone="text-alert">Uso indevido dos serviços por parte do Cliente</CheckItem>
          <CheckItem icon={XCircle} tone="text-alert">Conteúdo fornecido pelo Cliente</CheckItem>
        </div>
        <p className="text-sm text-muted-foreground">A responsabilidade total do Prestador está limitada ao valor pago pelo serviço específico.</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "10. Confidencialidade",
    content: (
      <div className="space-y-3">
        <p>Ambas as partes comprometem-se a manter confidencialidade sobre:</p>
        <div className="grid gap-2">
          <CheckItem icon={CheckCircle}>Informações comerciais e estratégicas</CheckItem>
          <CheckItem icon={CheckCircle}>Dados de clientes e utilizadores</CheckItem>
          <CheckItem icon={CheckCircle}>Processos de negócio e operações</CheckItem>
          <CheckItem icon={CheckCircle}>Informações técnicas e de acesso</CheckItem>
        </div>
        <p>Esta obrigação mantém-se mesmo após o término do contrato.</p>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "11. Suspensão e Rescisão",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="mb-1 font-semibold">Suspensão pelo Prestador</h3>
          <p>O Prestador pode suspender os serviços em caso de:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Não pagamento de faturas</li>
            <li>Violação destes Termos</li>
            <li>Uso indevido ou ilegal dos serviços</li>
            <li>Fornecimento de informações falsas</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Rescisão pelo Cliente</h3>
          <p>O Cliente pode rescindir o contrato a qualquer momento:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Serviços one-off: apenas antes do início do trabalho</li>
            <li>Serviços de assinatura: a qualquer momento, sem penalizações</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "12. Lei Aplicável e Jurisdição",
    content: (
      <div className="space-y-3">
        <p>Estes Termos são regidos pela lei portuguesa.</p>
        <p>Qualquer litígio será submetido aos tribunais judiciais de Portugal.</p>
        <p>Em caso de divergência entre a versão portuguesa e qualquer outra tradução, prevalece a versão portuguesa.</p>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "13. Alterações aos Termos",
    content: (
      <div className="space-y-3">
        <p>O Prestador pode alterar estes Termos a qualquer momento.</p>
        <p>As alterações entram em vigor na data de publicação no site.</p>
        <p>O Cliente será notificado por email com 15 dias de antecedência para alterações significativas.</p>
        <p>A utilização continuada dos serviços após as alterações constitui aceitação das mesmas.</p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "14. Contacto",
    content: (
      <div className="space-y-3">
        <p>Para qualquer questão relacionada com estes Termos:</p>
        <div className="space-y-3 rounded-lg border border-primary/20 bg-primary-soft/40 p-6">
          <p className="flex items-center gap-3 font-medium"><FileText className="size-5 text-primary" /> jesica.valddez@gmail.com</p>
          <p className="flex items-center gap-3 font-medium"><Clock className="size-5 text-primary" /> Resposta em até 48 horas úteis</p>
        </div>
      </div>
    ),
  },
];

function Terms() {
  return (
    <LegalPage
      icon={FileText}
      title="Termos de Serviço"
      updated="abril de 2025"
      footerNote="Estes Termos foram atualizados pela última vez em abril de 2025 e estão em conformidade com a legislação portuguesa e europeia aplicável."
      sections={sections}
    />
  );
}
