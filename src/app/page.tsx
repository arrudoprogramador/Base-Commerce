import { Navbar } from '@/components/store/Navbar'
import { Hero } from '@/components/store/Hero'
import { Features } from '@/components/store/Features'

import { storeConfig } from '../../config/store.config'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <Hero />

      <Features />

      <section
        id="produtos"
        className="container mx-auto px-4 py-16"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            {storeConfig.sections.catalogTitle}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {storeConfig.sections.catalogSubtitle}
          </p>
        </div>

        
      </section>
    </main>
  )
}