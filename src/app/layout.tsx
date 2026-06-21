// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { storeConfig } from '../../config/store.config';

export const metadata: Metadata = {
  title:       storeConfig.seo.title,
  description: storeConfig.seo.description,
  openGraph: {
    title:       storeConfig.seo.title,
    description: storeConfig.seo.description,
    url:         storeConfig.seo.siteUrl,
    images:      [{ url: storeConfig.seo.ogImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={storeConfig.fonts.googleFontsUrl} rel="stylesheet" />
        {/* CSS variables do store.config injetadas como inline style */}
        <style>{`
          :root {
            --accent:         ${storeConfig.colors.accent};
            --accent-hover:   ${storeConfig.colors.accentHover};
            --accent-fg:      ${storeConfig.colors.accentForeground};
            --bg:             ${storeConfig.colors.background};
            --surface:        ${storeConfig.colors.surface};
            --surface-border: ${storeConfig.colors.surfaceBorder};
            --fg:             ${storeConfig.colors.foreground};
            --muted:          ${storeConfig.colors.muted};
            --muted-border:   ${storeConfig.colors.mutedBorder};
          }
          body {
            font-family: ${storeConfig.fonts.bodyFamily};
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}