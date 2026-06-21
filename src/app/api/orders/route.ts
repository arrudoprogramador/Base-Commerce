// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { orderRepository } from '@/repositories/order.repository';
import { productRepository } from '@/repositories/product.repository';
import { createOrderSchema } from '@/schemas/order.schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/orders — protegido (admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const orders = await orderRepository.findAll();
    return NextResponse.json({ data: orders });
  } catch (err) {
    console.error('[GET /api/orders]', err);
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}

// POST /api/orders — público (cliente finalizando compra)
export async function POST(req: NextRequest) {
  try {
    const body  = await req.json();
    const parse = createOrderSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parse.error.flatten() },
        { status: 400 },
      );
    }

    const { items, customerName, customerEmail, customerPhone,
            paymentMethod, shippingAddress, shippingCost } = parse.data;

    // ── Segurança: recalcular total no backend ──────────────────
    // Nunca confiar no valor enviado pelo frontend
    let totalCalculado = 0;
    const itensFinal = [];

    for (const item of items) {
      const product = await productRepository.findById(item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Produto ${item.productId} não encontrado` },
          { status: 400 },
        );
      }

      if (!product.active) {
        return NextResponse.json(
          { error: `Produto "${product.name}" não está disponível` },
          { status: 400 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente para "${product.name}"` },
          { status: 400 },
        );
      }

      const unitPrice = Number(product.price);
      totalCalculado += unitPrice * item.quantity;

      itensFinal.push({
        productId: item.productId,
        quantity:  item.quantity,
        unitPrice,
        size:      item.size,
      });
    }

    // Adiciona frete ao total
    const totalFinal = totalCalculado + (shippingCost || 0);

    const order = await orderRepository.create({
      customerName,
      customerEmail,
      customerPhone,
      total:           totalFinal,
      paymentMethod,
      shippingCep:     shippingAddress.cep,
      shippingAddress: shippingAddress,
      shippingCost:    shippingCost || 0,
      items:           itensFinal,
    });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 });
  }
}