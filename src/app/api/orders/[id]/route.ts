// src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { orderRepository } from '@/repositories/order.repository';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

type Params = { params: { id: string } };

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
});

// GET /api/orders/:id — protegido (admin)
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const order = await orderRepository.findById(parseInt(params.id));
    if (!order) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch (err) {
    console.error('[GET /api/orders/:id]', err);
    return NextResponse.json({ error: 'Erro ao buscar pedido' }, { status: 500 });
  }
}

// PATCH /api/orders/:id — atualizar status (admin)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body  = await req.json();
    const parse = updateStatusSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
    }

    const order = await orderRepository.updateStatus(
      parseInt(params.id),
      parse.data.status as OrderStatus,
    );

    return NextResponse.json({ data: order });
  } catch (err) {
    console.error('[PATCH /api/orders/:id]', err);
    return NextResponse.json({ error: 'Erro ao atualizar pedido' }, { status: 500 });
  }
}