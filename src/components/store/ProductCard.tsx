// src/components/store/ProductCard.tsx
'use client';

import { storeConfig } from '../../../config/store.config';
import { useCartStore } from '@/features/cart/cart.store';
import { Product } from '@/types';
import { useState } from 'react';

type Props = { product: Product };

const SIZES = ['P', 'M', 'G', 'GG'] as const;

export function ProductCard({ product }: Props) {
  const { colors, currencySymbol } = storeConfig;
  const addItem = useCartStore(s => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const hasSizes    = product.sizes && Object.values(product.sizes).some(Boolean);
  const canAdd      = !hasSizes || selectedSize !== null;
  const priceFormatted = Number(product.price).toLocaleString('pt-BR', {
    style:    'currency',
    currency: storeConfig.currency,
  });

  function handleAdd() {
    if (!canAdd) return;
    addItem({
      productId: product.id,
      name:      product.name,
      price:     Number(product.price),
      imageUrl:  product.imageUrl,
      quantity:  1,
      size:      selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: colors.surface,
        borderColor:     colors.surfaceBorder,
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${colors.accent}40`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = colors.surfaceBorder)}
    >
      {/* Imagem */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke={colors.muted} strokeWidth="1" opacity="0.3">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#ef444420', color: '#f87171', border: '1px solid #ef444440' }}>
              Últimas unidades
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#ffffff10', color: colors.muted }}>
              Esgotado
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Categoria */}
        <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: colors.muted }}>
          {product.category?.name}
        </p>

        {/* Nome */}
        <h3 className="font-semibold text-sm leading-snug" style={{ color: colors.foreground }}>
          {product.name}
        </h3>

        {/* Preço */}
        <p className="font-black text-lg" style={{ color: colors.accent }}>
          {priceFormatted}
        </p>

        {/* Seletor de tamanhos */}
        {hasSizes && (
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-wider" style={{ color: colors.muted }}>
              Tamanho {selectedSize && <span style={{ color: colors.accent }}>— {selectedSize}</span>}
            </p>
            <div className="flex gap-1.5">
              {SIZES.map(size => {
                const available = product.sizes?.[size] ?? false;
                const isSelected = selectedSize === size;

                if (!available) {
                  return (
                    <span key={size}
                      className="relative w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center overflow-hidden select-none"
                      style={{ color: colors.mutedBorder, border: `1.5px solid ${colors.surfaceBorder}` }}>
                      {size}
                      <span className="absolute w-[130%] h-px rotate-[-35deg]"
                        style={{ backgroundColor: colors.mutedBorder }} aria-hidden />
                    </span>
                  );
                }

                return (
                  <button key={size}
                    onClick={() => setSelectedSize(isSelected ? null : size)}
                    className="w-9 h-9 rounded-lg text-xs font-semibold transition-all focus-ring"
                    style={{
                      border:          `1.5px solid ${isSelected ? colors.accent : colors.mutedBorder}`,
                      color:           isSelected ? colors.accent : colors.muted,
                      backgroundColor: isSelected ? `${colors.accent}10` : 'transparent',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Botão */}
        <div className="mt-auto pt-1">
          {product.stock === 0 ? (
            <span className="w-full flex items-center justify-center py-2.5 text-xs font-medium rounded-full"
              style={{ color: colors.muted }}>
              Indisponível
            </span>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!canAdd}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold transition-all focus-ring disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: added ? colors.accentHover : colors.accent,
                color:           colors.accentForeground,
              }}
              title={!canAdd && hasSizes ? 'Selecione um tamanho' : undefined}
            >
              {added ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  Adicionado!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  {hasSizes && !selectedSize ? 'Selecione o tamanho' : 'Adicionar ao carrinho'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}