import { NextRequest, NextResponse } from 'next/server';
import { productRepository } from '@/repositories/product.repository';
import { productUpdateSchema } from '@/schemas/product.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

type Params = { params: { id: string } };

// GET /api/products/:id
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const id      = parseInt(params.id);
    const product = await productRepository.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (err) {
    console.error('[GET /api/products/:id]', err);
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

// PUT /api/products/:id — protegido (admin)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const id    = parseInt(params.id);
    const body  = await req.json();
    const parse = productUpdateSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parse.error.flatten() },
        { status: 400 },
      );
    }

    const product = await productRepository.update(id, parse.data);
    return NextResponse.json({ data: product });
  } catch (err) {
    console.error('[PUT /api/products/:id]', err);
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

// DELETE /api/products/:id — protegido (admin) — soft delete
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);
    await productRepository.delete(id);
    return NextResponse.json({ message: 'Produto desativado' });
  } catch (err) {
    console.error('[DELETE /api/products/:id]', err);
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
}