// config/store.config.ts
// ============================================================
// PERSONALIZE AQUI — toda a identidade visual e textual da loja
// vem deste arquivo. Ao reutilizar a plataforma para outro
// cliente, altere apenas este arquivo.
// ============================================================

export const storeConfig = {

  // ── Identidade ──────────────────────────────────────────────
  name:        'Eleven Store',
  tagline:     'Camisas esportivas originais',
  description: 'As melhores camisas do seu time, entregue na sua porta.',
  logoUrl:     '/logo.png',        // null para usar o nome como texto

  // ── Contato ─────────────────────────────────────────────────
  whatsapp:    '5511916169179',
  email:       'contato@elevenstore.com.br',

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    headline:    'Vista a camisa do seu time.',
    subheadline: 'Camisas esportivas originais com entrega rápida para todo o Brasil.',
    ctaLabel:    'Ver produtos',
    ctaHref:     '#produtos',
    badge:       'Frete grátis acima de R$ 299',
    // Imagem de destaque no hero (produto ou banner)
    imageUrl:    '/hero-produto.png',
    imageAlt:    'Camisa esportiva em destaque',
  },

  // ── Paleta de cores ─────────────────────────────────────────
  // Altere aqui para mudar toda a identidade visual
  colors: {
    accent:          '#22c55e',   // cor principal (botões, destaques)
    accentHover:     '#16a34a',   // hover da cor principal
    accentForeground:'#000000',   // texto sobre a cor principal
    background:      '#0a0a0a',   // fundo da página
    surface:         '#111111',   // cards e superfícies elevadas
    surfaceBorder:   '#1f1f1f',   // bordas dos cards
    foreground:      '#fafafa',   // texto principal
    muted:           '#888888',   // texto secundário
    mutedBorder:     '#2a2a2a',   // bordas secundárias
  },

  // ── Tipografia ──────────────────────────────────────────────
  fonts: {
    // Google Fonts — altere o nome e a URL abaixo
    displayFamily: "'Inter', sans-serif",
    bodyFamily:    "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  },

  // ── Seções da home ──────────────────────────────────────────
  sections: {
    // Seção de diferenciais abaixo do hero
    features: [
      { icon: '⚡', title: 'Entrega rápida',    description: 'Envio em até 24h para todo o Brasil' },
      { icon: '✅', title: 'Produto original',  description: 'Garantia de autenticidade em todos os itens' },
      { icon: '🔄', title: 'Troca fácil',       description: '7 dias para troca sem burocracia' },
      { icon: '🔒', title: 'Pagamento seguro',  description: 'PIX, cartão e boleto com total segurança' },
    ],

    // Título das seções do catálogo
    catalogTitle:     'Nosso Catálogo',
    catalogSubtitle:  'Encontre a camisa do seu time favorito',
    featuredTitle:    'Destaques da semana',
  },

  // ── Footer ──────────────────────────────────────────────────
  footer: {
    copyright: '© 2025 Eleven Store. Todos os direitos reservados.',
    links: [
      { label: 'Sobre',         href: '/sobre'         },
      { label: 'Contato',       href: '/contato'       },
      { label: 'Trocas',        href: '/trocas'        },
      { label: 'Privacidade',   href: '/privacidade'   },
    ],
  },

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    title:       'Eleven Store — Camisas Esportivas Originais',
    description: 'Compre camisas esportivas originais com entrega rápida para todo o Brasil. PIX, cartão e parcelamento.',
    ogImage:     '/og-image.png',
    siteUrl:     process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // ── Pagamento ───────────────────────────────────────────────
  currency:       'BRL',
  currencySymbol: 'R$',

  // ── Frete ───────────────────────────────────────────────────
  freeShippingAbove: 299, // null para desativar frete grátis
  cepOrigem:         '08460157',

} as const;

export type StoreConfig = typeof storeConfig;