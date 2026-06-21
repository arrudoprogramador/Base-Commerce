// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { categoryRepository } from '@/repositories/category.repository';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug deve ser lowercase sem espaços'),
});

// GET /api/categories
export async function GET() {
  try {
    const categories = await categoryRepository.findAll();
    return NextResponse.json({ data: categories });
  } catch (err) {
    console.error('[GET /api/categories]', err);
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
  }
}

// POST /api/categories — protegido (admin)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body  = await req.json();
    const parse = categorySchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parse.error.flatten() },
        { status: 400 },
      );
    }

    const category = await categoryRepository.create(parse.data);
    return NextResponse.json({ data: category }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/categories]', err);
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 });
  }
}