// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const categorias = await Promise.all([
    prisma.category.upsert({ where: { slug: 'nacional' }, update: {}, create: { name: 'Nacional', slug: 'nacional' } }),
    prisma.category.upsert({ where: { slug: 'europeu' },  update: {}, create: { name: 'Europeu',  slug: 'europeu'  } }),
    prisma.category.upsert({ where: { slug: 'retro' },    update: {}, create: { name: 'Retrô',    slug: 'retro'    } }),
    prisma.category.upsert({ where: { slug: 'selecao' },  update: {}, create: { name: 'Seleção',  slug: 'selecao'  } }),
  ]);
  console.log(`✅ ${categorias.length} categorias`);

  const produtos = await Promise.all([
    prisma.product.upsert({
      where: { id: 1 }, update: {},
      create: {
        name: 'Flamengo I 2024/25', description: 'Camisa oficial do Mengão.',
        price: 189.90, stock: 50, active: true,
        sizes: { P: true, M: true, G: true, GG: false },
        categoryId: categorias[0].id,
      },
    }),
    prisma.product.upsert({
      where: { id: 2 }, update: {},
      create: {
        name: 'Real Madrid Home 24/25', description: 'A camisa dos Galácticos.',
        price: 249.90, stock: 30, active: true,
        sizes: { P: true, M: true, G: false, GG: true },
        categoryId: categorias[1].id,
      },
    }),
    prisma.product.upsert({
      where: { id: 3 }, update: {},
      create: {
        name: 'Brasil Copa 2022 Retrô', description: 'Edição Copa do Qatar.',
        price: 219.90, stock: 20, active: true,
        sizes: { P: true, M: false, G: true, GG: false },
        categoryId: categorias[3].id,
      },
    }),
  ]);
  console.log(`✅ ${produtos.length} produtos`);

  const hash  = await bcrypt.hash('admin123', 12);
  const admin = await prisma.admin.upsert({
    where:  { email: 'admin@loja.com' },
    update: {},
    create: { name: 'Administrador', email: 'admin@loja.com', passwordHash: hash },
  });
  console.log(`✅ Admin: ${admin.email} / senha: admin123`);
  console.log('🎉 Seed concluído!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());