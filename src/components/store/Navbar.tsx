// src/components/store/Navbar.tsx
'use client';

import Link from 'next/link';
import { storeConfig } from '../../../config/store.config';
import { useCartStore } from '@/features/cart/cart.store';
import { useState } from 'react';

export function Navbar() {
  const totalItems = useCartStore(s => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{ borderBottom: `1px solid var(--muted-border)` }}
      className="sticky top-0 z-50 backdrop-blur-md"
      // background semitransparente sobre a cor de fundo da loja
      // 90% de opacidade para manter o efeito glassmorphism
    >
      <div
        style={{ backgroundColor: `${storeConfig.colors.background}e6` }}
        className="absolute inset-0"
        aria-hidden
      />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo / Nome */}
        <Link href="/" className="flex items-center gap-2 focus-ring rounded">
          {storeConfig.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={storeConfig.logoUrl}
              alt={storeConfig.name}
              className="h-8 w-auto"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : null}
          <span
            className="font-black text-xl tracking-tight"
            style={{ color: 'var(--fg)' }}
          >
            {storeConfig.name}
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#produtos"
            className="text-sm font-medium transition-colors focus-ring rounded"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Produtos
          </Link>
          <Link
            href={`https://wa.me/${storeConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors focus-ring rounded"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Contato
          </Link>
        </div>

        {/* Carrinho */}
        <div className="flex items-center gap-3">
          <button
            aria-label={`Carrinho — ${totalItems} item(s)`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors focus-ring"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Menu mobile */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full focus-ring"
            style={{ color: 'var(--muted)' }}
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6 6 18M6 6l12 12"/>
                : <path d="M3 12h18M3 6h18M3 18h18"/>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile expandido */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 z-40 border-t px-4 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: storeConfig.colors.surface,
            borderColor: 'var(--muted-border)',
          }}
        >
          <Link href="#produtos" className="text-sm font-medium" style={{ color: 'var(--fg)' }} onClick={() => setMenuOpen(false)}>
            Produtos
          </Link>
          <Link href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
            Contato
          </Link>
        </div>
      )}
    </header>
  );
}