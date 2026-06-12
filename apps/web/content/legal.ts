/**
 * Legal documents — Privacy Policy + Cookie Policy (BR/EN/IT).
 *
 * Vivem aqui (e não nos dicionários flat br/en/it.ts) por serem documentos
 * estruturados; a paridade trilíngue é garantida pelo tipo Record<Lang, LegalDoc>.
 *
 * ⚠️ Revisão jurídica pendente (decisão de publicar é do Woney):
 *   - transferência internacional (Vercel/Google, EUA) — cláusulas/salvaguardas
 *   - designação formal de encarregado (LGPD art. 41) — hoje aponta hello@
 *   - prazos de retenção de e-mail
 */

import type { Lang } from './index'

export interface LegalSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface LegalDoc {
  /** Palavra de impacto do h1 (Gotham) */
  title: string
  /** eyebrow mono, sem o prefixo "//" */
  eyebrow: string
  updated: string
  intro: string
  sections: LegalSection[]
  related: { href: string; label: string }
}

/* ──────────────────────────── Privacidade ──────────────────────────── */

export const privacy: Record<Lang, LegalDoc> = {
  br: {
    title: 'Privacidade',
    eyebrow: 'legal',
    updated: 'atualizada em 11 de junho de 2026',
    intro:
      'A regra da casa é simples: este site não coleta, não rastreia e não vende dados pessoais. Esta política explica, em detalhe, o pouco que acontece quando você nos visita.',
    sections: [
      {
        heading: 'Quem somos',
        paragraphs: [
          'O bicofino.com é mantido pela Bicofino Group S.A. ("Bicofino"), com sede na Av. Pedroso de Morais, 1619 — Pinheiros, São Paulo/SP, 05019-001, Brasil. Para qualquer assunto de privacidade, o contato é hello@bicofino.com.',
        ],
      },
      {
        heading: 'O que coletamos: nada',
        paragraphs: [
          'Este site não tem formulários ativos, não cria contas, não usa ferramentas de analytics, publicidade ou rastreamento. Enquanto você navega, nenhum dado pessoal é coletado nem enviado aos nossos servidores.',
          'Os campos da área Club são demonstrativos: o que for digitado neles não é transmitido nem armazenado em lugar nenhum.',
        ],
      },
      {
        heading: 'Preferências no seu navegador',
        paragraphs: [
          'Guardamos três preferências no armazenamento local (localStorage) do seu navegador: o idioma escolhido, o tema (claro ou escuro) e o registro de que você dispensou o nosso aviso. Elas ficam só no seu dispositivo, nunca nos são enviadas e não identificam você. Os detalhes estão na Política de Cookies.',
        ],
      },
      {
        heading: 'Registros de infraestrutura',
        paragraphs: [
          'O site é hospedado pela Vercel Inc. (Estados Unidos). Como em qualquer servidor web, a infraestrutura processa de forma transitória o endereço IP e dados técnicos da conexão para entregar as páginas e proteger o serviço contra abuso. Esses registros pertencem à operação da infraestrutura e não são usados pela Bicofino para identificar visitantes.',
        ],
      },
      {
        heading: 'Se você nos escreve',
        paragraphs: [
          'Se você nos enviar um e-mail (hello@bicofino.com), trataremos seu endereço, seu nome e o conteúdo da mensagem exclusivamente para responder. A base legal é o legítimo interesse e, quando aplicável, o procedimento preliminar a pedido do titular (LGPD, art. 7º). As mensagens ficam na nossa caixa de e-mail (Google Workspace) pelo tempo necessário à conversa.',
        ],
      },
      {
        heading: 'Compartilhamento',
        paragraphs: [
          'Não vendemos nem compartilhamos dados pessoais com terceiros para fins de marketing. Os únicos operadores envolvidos são os provedores de infraestrutura citados acima — hospedagem (Vercel) e e-mail (Google Workspace).',
        ],
      },
      {
        heading: 'Seus direitos',
        paragraphs: [
          'A Lei Geral de Proteção de Dados (LGPD, art. 18) garante a você confirmação de tratamento, acesso, correção, anonimização, eliminação, portabilidade, informação sobre compartilhamento e revogação de consentimento. Para exercê-los, escreva para hello@bicofino.com.',
          'Se você está na União Europeia (incluindo a Itália), o GDPR (arts. 15–22) garante direitos equivalentes — inclusive o de reclamar à autoridade local: na Itália, o Garante per la Protezione dei Dati Personali; no Brasil, a ANPD.',
        ],
      },
      {
        heading: 'Crianças e adolescentes',
        paragraphs: [
          'Este é um site institucional, não direcionado a menores de idade. Não coletamos conscientemente dados de crianças ou adolescentes.',
        ],
      },
      {
        heading: 'Mudanças nesta política',
        paragraphs: [
          'Se um dia o site passar a coletar algo — um formulário de contato, por exemplo — esta política será atualizada antes, com a data revista no topo.',
        ],
      },
    ],
    related: { href: '/cookies', label: 'Política de Cookies' },
  },

  en: {
    title: 'Privacy',
    eyebrow: 'legal',
    updated: 'last updated June 11, 2026',
    intro:
      'The house rule is simple: this site does not collect, track, or sell personal data. This policy explains, in detail, the little that does happen when you visit.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          'bicofino.com is maintained by Bicofino Group S.A. ("Bicofino"), headquartered at Av. Pedroso de Morais, 1619 — Pinheiros, São Paulo/SP, 05019-001, Brazil. For any privacy matter, reach us at hello@bicofino.com.',
        ],
      },
      {
        heading: 'What we collect: nothing',
        paragraphs: [
          'This site has no active forms, creates no accounts, and uses no analytics, advertising, or tracking tools. While you browse, no personal data is collected or sent to our servers.',
          'The fields in the Club area are for demonstration only: whatever you type there is neither transmitted nor stored anywhere.',
        ],
      },
      {
        heading: 'Preferences in your browser',
        paragraphs: [
          'We keep three preferences in your browser’s local storage (localStorage): your chosen language, the theme (light or dark), and the record that you dismissed our notice. They stay on your device only, are never sent to us, and do not identify you. Details are in the Cookie Policy.',
        ],
      },
      {
        heading: 'Infrastructure logs',
        paragraphs: [
          'The site is hosted by Vercel Inc. (United States). As with any web server, the infrastructure transiently processes your IP address and technical connection data to deliver pages and protect the service against abuse. These logs exist to run the infrastructure and are not used by Bicofino to identify visitors.',
        ],
      },
      {
        heading: 'If you write to us',
        paragraphs: [
          'If you email us (hello@bicofino.com), we will process your address, your name, and the content of your message exclusively to reply. The legal basis is legitimate interest and, where applicable, pre-contractual steps taken at your request (GDPR, art. 6; LGPD, art. 7). Messages remain in our mailbox (Google Workspace) for as long as the conversation requires.',
        ],
      },
      {
        heading: 'Sharing',
        paragraphs: [
          'We do not sell or share personal data with third parties for marketing purposes. The only processors involved are the infrastructure providers named above — hosting (Vercel) and email (Google Workspace).',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Brazil’s General Data Protection Law (LGPD, art. 18) grants you confirmation of processing, access, rectification, anonymization, erasure, portability, information about sharing, and withdrawal of consent. To exercise them, write to hello@bicofino.com.',
          'If you are in the European Union (including Italy), the GDPR (arts. 15–22) grants equivalent rights — including lodging a complaint with your local authority: in Italy, the Garante per la Protezione dei Dati Personali; in Brazil, the ANPD.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'This is an institutional website, not directed at minors. We do not knowingly collect data from children or teenagers.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If the site ever starts collecting anything — a contact form, for instance — this policy will be updated beforehand, with the date revised at the top.',
        ],
      },
    ],
    related: { href: '/cookies', label: 'Cookie Policy' },
  },

  it: {
    title: 'Privacy',
    eyebrow: 'legale',
    updated: 'aggiornata l’11 giugno 2026',
    intro:
      'La regola della casa è semplice: questo sito non raccoglie, non traccia e non vende dati personali. Questa informativa spiega, nel dettaglio, il poco che accade quando ci visitate.',
    sections: [
      {
        heading: 'Chi siamo',
        paragraphs: [
          'bicofino.com è gestito da Bicofino Group S.A. ("Bicofino"), con sede in Av. Pedroso de Morais, 1619 — Pinheiros, San Paolo/SP, 05019-001, Brasile. Per qualsiasi questione relativa alla privacy: hello@bicofino.com.',
        ],
      },
      {
        heading: 'Cosa raccogliamo: nulla',
        paragraphs: [
          'Questo sito non ha moduli attivi, non crea account e non utilizza strumenti di analisi, pubblicità o tracciamento. Durante la navigazione, nessun dato personale viene raccolto né inviato ai nostri server.',
          'I campi dell’area Club sono a scopo dimostrativo: ciò che vi viene digitato non viene trasmesso né memorizzato da nessuna parte.',
        ],
      },
      {
        heading: 'Preferenze nel vostro browser',
        paragraphs: [
          'Conserviamo tre preferenze nella memoria locale (localStorage) del vostro browser: la lingua scelta, il tema (chiaro o scuro) e la conferma che avete chiuso il nostro avviso. Restano solo sul vostro dispositivo, non ci vengono mai inviate e non vi identificano. I dettagli sono nell’Informativa sui cookie.',
        ],
      },
      {
        heading: 'Registri di infrastruttura',
        paragraphs: [
          'Il sito è ospitato da Vercel Inc. (Stati Uniti). Come per qualsiasi server web, l’infrastruttura tratta in modo transitorio l’indirizzo IP e i dati tecnici della connessione per consegnare le pagine e proteggere il servizio da abusi. Tali registri riguardano la gestione dell’infrastruttura e non vengono utilizzati da Bicofino per identificare i visitatori.',
        ],
      },
      {
        heading: 'Se ci scrivete',
        paragraphs: [
          'Se ci inviate un’e-mail (hello@bicofino.com), tratteremo il vostro indirizzo, il vostro nome e il contenuto del messaggio esclusivamente per rispondervi. La base giuridica è il legittimo interesse e, ove applicabile, l’esecuzione di misure precontrattuali adottate su vostra richiesta (GDPR, art. 6). I messaggi restano nella nostra casella di posta (Google Workspace) per il tempo necessario alla conversazione.',
        ],
      },
      {
        heading: 'Condivisione',
        paragraphs: [
          'Non vendiamo né condividiamo dati personali con terzi per finalità di marketing. Gli unici responsabili del trattamento coinvolti sono i fornitori di infrastruttura sopra indicati — hosting (Vercel) ed e-mail (Google Workspace).',
        ],
      },
      {
        heading: 'I vostri diritti',
        paragraphs: [
          'Il GDPR (artt. 15–22) vi garantisce accesso, rettifica, cancellazione, limitazione, portabilità e opposizione, oltre al diritto di proporre reclamo all’autorità di controllo: in Italia, il Garante per la Protezione dei Dati Personali. Per esercitarli: hello@bicofino.com.',
          'La legge brasiliana sulla protezione dei dati (LGPD, art. 18) garantisce diritti equivalenti; l’autorità brasiliana è l’ANPD.',
        ],
      },
      {
        heading: 'Minori',
        paragraphs: [
          'Questo è un sito istituzionale, non rivolto ai minori. Non raccogliamo consapevolmente dati di bambini o adolescenti.',
        ],
      },
      {
        heading: 'Modifiche a questa informativa',
        paragraphs: [
          'Se un giorno il sito iniziasse a raccogliere qualcosa — un modulo di contatto, ad esempio — questa informativa sarà aggiornata prima, con la data rivista in alto.',
        ],
      },
    ],
    related: { href: '/cookies', label: 'Informativa sui cookie' },
  },
}

/* ──────────────────────────── Cookies ──────────────────────────── */

export const cookies: Record<Lang, LegalDoc> = {
  br: {
    title: 'Cookies',
    eyebrow: 'legal',
    updated: 'atualizada em 11 de junho de 2026',
    intro:
      'Resposta curta: este site não usa nenhum cookie. Nem de rastreamento, nem de publicidade, nem "essencial". O que existe são três preferências guardadas no seu navegador — e elas nunca saem de lá.',
    sections: [
      {
        heading: 'Cookies: zero',
        paragraphs: [
          'Não gravamos cookies no seu navegador. Não há cookie de sessão, de analytics (Google Analytics, Meta Pixel e afins) nem de publicidade. Por isso você não vê um banner de consentimento para aceitar ou recusar: não há o que recusar.',
        ],
      },
      {
        heading: 'O que guardamos (localStorage)',
        paragraphs: [
          'Usamos o armazenamento local do navegador (localStorage) para três preferências:',
        ],
        list: [
          'bf-lang — o idioma escolhido (BR, EN ou IT). Dura até você limpar os dados do navegador.',
          'bf-theme — o tema, claro ou escuro. Idem.',
          'bf-notice — o registro de que você já viu o nosso aviso, para não repeti-lo. Idem.',
        ],
      },
      {
        heading: 'localStorage não é cookie',
        paragraphs: [
          'Diferente de um cookie, o conteúdo do localStorage fica apenas no seu dispositivo e não é enviado a servidor nenhum a cada visita. Essas preferências não identificam você e não são acessíveis a terceiros.',
        ],
      },
      {
        heading: 'Terceiros: nenhum',
        paragraphs: [
          'Fontes, vídeos e imagens são servidos pelo nosso próprio domínio. Nenhuma requisição é feita a serviços de terceiros e nenhum conteúdo embutido instala cookies por tabela.',
        ],
      },
      {
        heading: 'Como limpar',
        paragraphs: [
          'Basta apagar os dados de navegação do bicofino.com nas configurações do seu navegador. O site volta ao padrão: português e tema do sistema.',
        ],
      },
      {
        heading: 'Dúvidas',
        paragraphs: ['Escreva para hello@bicofino.com.'],
      },
    ],
    related: { href: '/privacidade', label: 'Política de Privacidade' },
  },

  en: {
    title: 'Cookies',
    eyebrow: 'legal',
    updated: 'last updated June 11, 2026',
    intro:
      'Short answer: this site uses no cookies at all. No tracking, no advertising, not even "essential" ones. All that exists are three preferences kept in your browser — and they never leave it.',
    sections: [
      {
        heading: 'Cookies: zero',
        paragraphs: [
          'We do not set cookies in your browser. There are no session cookies, no analytics cookies (Google Analytics, Meta Pixel, and the like), no advertising cookies. That is why you see no consent banner asking you to accept or refuse: there is nothing to refuse.',
        ],
      },
      {
        heading: 'What we keep (localStorage)',
        paragraphs: [
          'We use the browser’s local storage (localStorage) for three preferences:',
        ],
        list: [
          'bf-lang — your chosen language (BR, EN, or IT). Lasts until you clear your browser data.',
          'bf-theme — the theme, light or dark. Same duration.',
          'bf-notice — the record that you have seen our notice, so we don’t repeat it. Same duration.',
        ],
      },
      {
        heading: 'localStorage is not a cookie',
        paragraphs: [
          'Unlike a cookie, localStorage content stays on your device only and is not sent to any server on each visit. These preferences do not identify you and are not accessible to third parties.',
        ],
      },
      {
        heading: 'Third parties: none',
        paragraphs: [
          'Fonts, videos, and images are served from our own domain. No requests are made to third-party services, and no embedded content sets cookies indirectly.',
        ],
      },
      {
        heading: 'How to clear',
        paragraphs: [
          'Simply delete the browsing data for bicofino.com in your browser settings. The site returns to its defaults: Portuguese and your system theme.',
        ],
      },
      {
        heading: 'Questions',
        paragraphs: ['Write to hello@bicofino.com.'],
      },
    ],
    related: { href: '/privacidade', label: 'Privacy Policy' },
  },

  it: {
    title: 'Cookie',
    eyebrow: 'legale',
    updated: 'aggiornata l’11 giugno 2026',
    intro:
      'Risposta breve: questo sito non utilizza alcun cookie. Né di tracciamento, né pubblicitari, nemmeno quelli "essenziali". Esistono solo tre preferenze conservate nel vostro browser — e non lo lasciano mai.',
    sections: [
      {
        heading: 'Cookie: zero',
        paragraphs: [
          'Non salviamo cookie nel vostro browser. Non ci sono cookie di sessione, di analisi (Google Analytics, Meta Pixel e simili) né pubblicitari. Per questo non vedete un banner di consenso da accettare o rifiutare: non c’è nulla da rifiutare.',
        ],
      },
      {
        heading: 'Cosa conserviamo (localStorage)',
        paragraphs: [
          'Utilizziamo la memoria locale del browser (localStorage) per tre preferenze:',
        ],
        list: [
          'bf-lang — la lingua scelta (BR, EN o IT). Resta finché non cancellate i dati del browser.',
          'bf-theme — il tema, chiaro o scuro. Stessa durata.',
          'bf-notice — la conferma che avete già visto il nostro avviso, per non ripeterlo. Stessa durata.',
        ],
      },
      {
        heading: 'localStorage non è un cookie',
        paragraphs: [
          'A differenza di un cookie, il contenuto del localStorage resta solo sul vostro dispositivo e non viene inviato ad alcun server a ogni visita. Queste preferenze non vi identificano e non sono accessibili a terzi.',
        ],
      },
      {
        heading: 'Terze parti: nessuna',
        paragraphs: [
          'Font, video e immagini sono serviti dal nostro stesso dominio. Nessuna richiesta viene effettuata verso servizi di terzi e nessun contenuto incorporato installa cookie indirettamente.',
        ],
      },
      {
        heading: 'Come cancellare',
        paragraphs: [
          'È sufficiente eliminare i dati di navigazione di bicofino.com nelle impostazioni del browser. Il sito torna alle impostazioni predefinite: portoghese e tema di sistema.',
        ],
      },
      {
        heading: 'Domande',
        paragraphs: ['Scrivete a hello@bicofino.com.'],
      },
    ],
    related: { href: '/privacidade', label: 'Informativa sulla privacy' },
  },
}
