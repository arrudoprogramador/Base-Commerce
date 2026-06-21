// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { productRepository } from '@/repositories/product.repository';
import { productSchema } from '@/schemas/product.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/products?category=nacional
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;

    const products = await productRepository.findAll({
      categorySlug: category,
      active: true,
    });

    return NextResponse.json({ data: products });
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

// POST /api/products — protegido (admin)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body  = await req.json();
    const parse = productSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parse.error.flatten() },
        { status: 400 },
      );
    }

    const product = await productRepository.create(parse.data);
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/products]', err);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}