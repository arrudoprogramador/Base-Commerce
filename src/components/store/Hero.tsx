// src/components/store/Hero.tsx
'use client';

import Link from 'next/link';
import { storeConfig } from '../../../config/store.config';

export function Hero() {
  const { hero, colors, freeShippingAbove, currencySymbol } = storeConfig;

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">

      {/* Gradiente de fundo — accent color com baixa opacidade */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 40%, ${colors.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Grid de ruído sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Coluna esquerda — texto */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            {hero.badge && (
              <div className="inline-flex items-center gap-2 w-fit">
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    color:           colors.accent,
                    borderColor:     `${colors.accent}40`,
                    backgroundColor: `${colors.accent}10`,
                  }}
                >
                  {freeShippingAbove
                    ? `${hero.badge.replace('R$ 299', `${currencySymbol} ${freeShippingAbove}`)}`
                    : hero.badge
                  }
                </span>
              </div>
            )}

            {/* Headline */}
            <h1
              className="font-black leading-[1.0] tracking-tight"
              style={{
                fontSize:   'clamp(2.8rem, 7vw, 6rem)',
                color:      colors.foreground,
                fontFamily: storeConfig.fonts.displayFamily,
              }}
            >
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg leading-relaxed max-w-md"
              style={{ color: colors.muted }}
            >
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 focus-ring"
                style={{
                  backgroundColor: colors.accent,
                  color:           colors.accentForeground,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accentHover)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.accent)}
              >
                {hero.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href={`https://wa.me/${storeConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border transition-all hover:scale-105 active:scale-95 focus-ring"
                style={{
                  color:           colors.foreground,
                  borderColor:     colors.mutedBorder,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = colors.mutedBorder;
                  e.currentTarget.style.color = colors.foreground;
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar no WhatsApp
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t" style={{ borderColor: colors.surfaceBorder }}>
              {[
                { value: '500+', label: 'Produtos vendidos' },
                { value: '4.9★', label: 'Avaliação média'  },
                { value: '24h',  label: 'Envio expresso'   },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-black text-xl" style={{ color: colors.foreground }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita — imagem do produto */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Glow atrás da imagem */}
            <div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: colors.accent }}
              aria-hidden
            />

            {hero.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.imageUrl}
                alt={hero.imageAlt}
                className="relative z-10 max-h-[520px] w-auto object-contain drop-shadow-2xl"
                style={{ transform: 'rotate(3deg)' }}
              />
            ) : (
              // Placeholder quando não há imagem configurada
              <div
                className="relative z-10 w-72 h-96 rounded-2xl flex items-center justify-center border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor:     colors.surfaceBorder,
                }}
              >
                <span style={{ color: colors.muted }} className="text-sm">
                  Imagem do produto
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}