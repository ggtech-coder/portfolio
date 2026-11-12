// ============================================================
// GG TECH — PORTFÓLIO · Configuração central
// Tudo que aparece no site (contato, projetos, preços) sai daqui.
// Mudou um preço? Troque o número abaixo, salve e pronto.
// ============================================================

const GG = {
  // ---------- CONTATO ----------
  contato: {
    // WhatsApp de atendimento (DDI + DDD + número, só dígitos)
    whatsapp: "5511925196997",
    consultora: "Consultora GG Tech", // TODO: nome de quem atende
    email: "contato@ggtech.com.br", // TODO: e-mail real
    instagram: "", // TODO: ex. "https://instagram.com/ggtech" (vazio = não aparece)
    github: "https://github.com/ggtech-coder",
    cidade: "Vargem Grande Paulista · SP",
  },

  // ---------- CONDIÇÕES COMERCIAIS ----------
  comercial: {
    entrada: 0.5, // 50% para começar, 50% na entrega
    descontoPix: 0.05, // 5% de desconto no Pix à vista
    taxaExpressa: 0.25, // +25% para entrega expressa
    validadeDias: 7, // validade da proposta
    descontosConsultora: [0, 5, 10], // % liberados no modo vendas (?vendas=1)
    vagasRestantes: 3, // vagas para novos projetos neste mês (mantenha o número REAL)
  },

  // ---------- PACOTES BASE ----------
  pacotes: [
    {
      id: "landing",
      nome: "Landing Page",
      preco: 897,
      prazo: "5 dias úteis",
      resumo: "Uma página certeira para vender um serviço ou captar contatos.",
      itens: [
        "Página única com design exclusivo",
        "Botão de WhatsApp e formulário de contato",
        "Perfeita no celular",
        "SEO básico + carregamento rápido",
        "1 rodada de ajustes",
      ],
    },
    {
      id: "site",
      nome: "Site Profissional",
      preco: 1697,
      prazo: "10 dias úteis",
      destaque: "Mais vendido",
      resumo: "O site completo do seu negócio, pronto para aparecer no Google.",
      itens: [
        "Até 5 páginas (início, sobre, serviços, contato…)",
        "Identidade visual feita para a sua marca",
        "WhatsApp, mapa e redes sociais integrados",
        "SEO técnico, sitemap e páginas de LGPD",
        "2 rodadas de ajustes",
      ],
    },
    {
      id: "siteplus",
      nome: "Site + Agendamento",
      preco: 2997,
      prazo: "15 dias úteis",
      resumo: "Site que trabalha sozinho: o cliente agenda e você gerencia tudo.",
      itens: [
        "Tudo do Site Profissional",
        "Agendamento online com horários livres",
        "Painel administrativo para você controlar",
        "Cadastro de serviços, preços e equipe",
        "Treinamento de uso incluso",
      ],
    },
    {
      id: "sistema",
      nome: "Sistema sob Medida",
      preco: 4900,
      aPartir: true,
      prazo: "a partir de 30 dias",
      resumo: "CRM, painel, ERP ou SaaS desenhado para o seu processo.",
      itens: [
        "Levantamento do seu processo, passo a passo",
        "Login, permissões e banco de dados",
        "Painéis, relatórios e gráficos",
        "Integrações (WhatsApp, pagamentos, IA)",
        "Acompanhamento pós-entrega por 30 dias",
      ],
    },
  ],

  // ---------- ADICIONAIS ----------
  // inclusoEm: pacotes em que o item já vem de fábrica (não cobra de novo)
  // quantidade: true = cliente escolhe quantos
  adicionais: [
    { grupo: "Funcionalidades", id: "paginas", nome: "Página extra", preco: 150, quantidade: true, desc: "Cada página além do pacote." },
    { grupo: "Funcionalidades", id: "agenda", nome: "Agendamento online", preco: 650, inclusoEm: ["siteplus"], desc: "Cliente escolhe o horário sozinho, 24h." },
    { grupo: "Funcionalidades", id: "painel", nome: "Painel administrativo", preco: 750, inclusoEm: ["siteplus", "sistema"], desc: "Você mesmo troca textos, fotos e preços." },
    { grupo: "Funcionalidades", id: "pagamento", nome: "Pagamento online", preco: 850, desc: "Pix e cartão direto no site." },
    { grupo: "Funcionalidades", id: "bot", nome: "Robô de WhatsApp", preco: 950, desc: "Responde, qualifica e encaminha clientes." },
    { grupo: "Funcionalidades", id: "ia", nome: "Assistente com IA", preco: 1400, desc: "Chat treinado com as informações do seu negócio." },
    { grupo: "Funcionalidades", id: "area", nome: "Área do cliente", preco: 1100, desc: "Login para clientes, alunos ou pacientes." },
    { grupo: "Funcionalidades", id: "blog", nome: "Blog / novidades", preco: 450, desc: "Publique conteúdo e ganhe espaço no Google." },
    { grupo: "Funcionalidades", id: "idioma", nome: "Segundo idioma", preco: 500, desc: "Site em português + inglês ou espanhol." },

    { grupo: "Conteúdo e marca", id: "logo", nome: "Logo + identidade visual", preco: 490, desc: "Logo, cores e tipografia da marca." },
    { grupo: "Conteúdo e marca", id: "textos", nome: "Textos profissionais", preco: 350, desc: "Copy escrita para convencer e vender." },
    { grupo: "Conteúdo e marca", id: "fotos", nome: "Tratamento de imagens", preco: 200, desc: "Edição das suas fotos + banco de imagens." },

    { grupo: "Divulgação", id: "seo", nome: "SEO local + Google Meu Negócio", preco: 390, desc: "Apareça para quem procura na sua cidade." },
    { grupo: "Divulgação", id: "dominio", nome: "Domínio + e-mail profissional", preco: 220, desc: "seunegocio.com.br e contato@ configurados." },
    { grupo: "Divulgação", id: "pixel", nome: "Rastreamento de conversões", preco: 250, desc: "Analytics e Pixel para medir os anúncios." },
  ],

  // ---------- PLANOS MENSAIS ----------
  planos: [
    { id: "nenhum", nome: "Sem plano mensal", preco: 0, desc: "Entregamos os arquivos e você hospeda onde quiser." },
    { id: "essencial", nome: "Essencial", preco: 89, desc: "Hospedagem, certificado de segurança, backup e monitoramento." },
    { id: "evolucao", nome: "Evolução", preco: 189, destaque: true, desc: "Essencial + até 2h de alterações por mês e relatório de acessos." },
    { id: "parceiro", nome: "Parceiro", preco: 389, desc: "Evolução + até 6h por mês, prioridade no atendimento e SEO contínuo." },
  ],

  // ---------- PROJETOS ----------
  // img: arquivo dentro de assets/projetos/ · tipo: "site" ou "sistema"
  projetos: [
    { tipo: "site", nome: "Coliseu Convenções", segmento: "Eventos", img: "coliseu.jpg", url: "https://ggtech-coder.github.io/coliseu/", desc: "Site de alto impacto para o maior centro de eventos de Alphaville.", tags: ["Institucional", "Animações", "Captação de eventos"] },
    { tipo: "site", nome: "Milena Oliveira Studio", segmento: "Beleza", img: "milena-oliveira-studio.jpg", url: "https://ggtech-coder.github.io/milena-oliveira-studio/", desc: "Cliente escolhe o procedimento, vê os horários livres e agenda sem criar conta.", tags: ["Agendamento online", "Painel admin", "Pagamentos"] },
    { tipo: "site", nome: "Autoescola Rota Certa", segmento: "Educação", img: "auto.jpg", url: "https://ggtech-coder.github.io/auto/", desc: "Site completo com agendamento de aulas, área do aluno e painel da autoescola.", tags: ["Área do aluno", "Agendamento", "Multi-páginas"] },
    { tipo: "site", nome: "BV Pharma", segmento: "Saúde", img: "phfarma.jpg", url: "https://ggtech-coder.github.io/phfarma/", desc: "Farmácia de manipulação com páginas de serviços e atendimento pelo WhatsApp.", tags: ["Institucional", "SEO local", "LGPD"] },
    { tipo: "site", nome: "Andrade & Salles Advocacia", segmento: "Jurídico", img: "adv.jpg", url: "https://ggtech-coder.github.io/adv/", desc: "Presença sóbria e confiável para um escritório especializado em dívidas.", tags: ["Institucional", "Captação de leads"] },
    { tipo: "site", nome: "Sorriso Vida Odontologia", segmento: "Saúde", img: "odonto.jpg", url: "https://ggtech-coder.github.io/odonto/", desc: "Clínica odontológica com foco em agendar avaliações pelo WhatsApp.", tags: ["Clínica", "SEO local"] },
    { tipo: "site", nome: "Essence Estética", segmento: "Estética", img: "estetica.jpg", url: "https://ggtech-coder.github.io/estetica/", desc: "Clínica de estética facial e corporal com visual delicado e direto ao ponto.", tags: ["Clínica", "WhatsApp"] },
    { tipo: "site", nome: "Barbearia Elite", segmento: "Barbearia", img: "barber.jpg", url: "https://ggtech-coder.github.io/barber/", desc: "Site premium com blog, páginas de serviços e agendamento fácil.", tags: ["Blog", "Multi-páginas", "SEO"] },

    { tipo: "sistema", nome: "Débora.ai", segmento: "Imobiliário", img: "cr.jpg", url: "https://ggtech-coder.github.io/cr/", desc: "Gestão comercial para imobiliárias e corretores, com copiloto de inteligência artificial.", tags: ["SaaS", "IA", "CRM"] },
    { tipo: "sistema", nome: "BASE GG", segmento: "Gestão", img: "base.jpg", url: "https://base-ten-coral.vercel.app", desc: "ERP enxuto: leads, propostas, contratos com assinatura eletrônica, cobranças e chamados.", tags: ["ERP", "Assinatura eletrônica", "Financeiro"] },
    { tipo: "sistema", nome: "GG Tech CRM", segmento: "Vendas", img: "crm.jpg", url: "https://ggtech-coder.github.io/crm/", desc: "Funil de vendas com cadastro de clientes e robô de WhatsApp integrado.", tags: ["CRM", "Robô de WhatsApp"] },
    { tipo: "sistema", nome: "FinançasCasal", segmento: "Finanças", img: "finan.jpg", url: "https://ggtech-coder.github.io/finan/", desc: "Aplicativo instalável para o casal controlar gastos, metas e contas.", tags: ["App instalável", "Funciona offline"] },
    { tipo: "sistema", nome: "Relógio de Oração", segmento: "Comunidade", img: "vide.jpg", url: "https://ggtech-coder.github.io/vide/", desc: "Escala de oração para 21 dias de jejum, com inscrição de horários em tempo real.", tags: ["Tempo real", "Inscrições"] },
  ],
};
