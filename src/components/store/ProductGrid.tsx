// src/components/store/ProductGrid.tsx
'use client';

import { storeConfig } from '../../../config/store.config';
import { ProductCard } from './ProductCard';
import { Product, Category } from '@/types';
import { useState } from 'react';

type Props = {
  products:   Product[];
  categories: Category[];
  title?:     string;
  subtitle?:  string;
};

export function ProductGrid({ products, categories, title, subtitle }: Props) {
  const { colors, sections } = storeConfig;
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filtered = activeCategory === 'todos'
    ? products
    : products.filter(p => p.category?.slug === activeCategory);

  const displayTitle    = title    ?? sections.catalogTitle;
  const displaySubtitle = subtitle ?? sections.catalogSubtitle;

  return (
    <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

      {/* Cabeçalho da seção */}
      <div className="flex flex-col gap-2 mb-10">
        <h2
          className="font-black text-3xl sm:text-4xl tracking-tight"
          style={{ color: colors.foreground }}
        >
          {displayTitle}
        </h2>
        {displaySubtitle && (
          <p className="text-base" style={{ color: colors.muted }}>
            {displaySubtitle}
          </p>
        )}
      </div>

      {/* Filtro de categorias */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {[{ id: 0, name: 'Todos', slug: 'todos' }, ...categories].map(cat => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all focus-ring"
                style={{
                  backgroundColor: isActive ? colors.accent          : 'transparent',
                  color:           isActive ? colors.accentForeground : colors.muted,
                  border:          `1.5px solid ${isActive ? colors.accent : colors.mutedBorder}`,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl border"
          style={{ borderColor: colors.surfaceBorder, color: colors.muted }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-30">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18"/>
          </svg>
          <p className="text-sm">Nenhum produto nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-center text-xs mt-8" style={{ color: colors.muted }}>
        {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>
    </section>
  );
}