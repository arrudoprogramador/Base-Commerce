// src/components/store/Features.tsx
import { storeConfig } from '../../../config/store.config';

export function Features() {
  const { sections, colors } = storeConfig;

  // Se não houver features configuradas, não renderiza a seção
  if (!sections.features?.length) return null;

  return (
    <section
      className="border-y"
      style={{ borderColor: colors.surfaceBorder }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <span className="text-2xl">{feature.icon}</span>
              <p className="font-semibold text-sm" style={{ color: colors.foreground }}>
                {feature.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}