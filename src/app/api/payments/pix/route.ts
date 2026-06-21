// src/app/api/payments/pix/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mpPayment } from '@/lib/mercadopago';
import { orderRepository } from '@/repositories/order.repository';
import { z } from 'zod';

const pixSchema = z.object({
  orderId: z.number().int().positive(),
});

// POST /api/payments/pix
export async function POST(req: NextRequest) {
  try {
    const body  = await req.json();
    const parse = pixSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json({ error: 'orderId inválido' }, { status: 400 });
    }

    const order = await orderRepository.findById(parse.data.orderId);

    if (!order) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    if (order.status !== 'PENDING') {
      return NextResponse.json({ error: 'Pedido já processado' }, { status: 400 });
    }

    // ── Criar pagamento no Mercado Pago ───────────────────────
    const expiracao = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const payment = await mpPayment.create({
      body: {
        transaction_amount: Number(order.total),
        description:        `Pedido #${order.id}`,
        payment_method_id:  'pix',
        payer: {
          email:      order.customerEmail,
          first_name: order.customerName.split(' ')[0],
          last_name:  order.customerName.split(' ').slice(1).join(' ') || '-',
        },
        external_reference: String(order.id),
        date_of_expiration: expiracao,
        ...(process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') && {
          notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`,
        }),
      },
    });

    const pix = payment.point_of_interaction?.transaction_data;

    if (!pix?.qr_code) {
      return NextResponse.json(
        { error: 'QR Code não retornado pelo Mercado Pago' },
        { status: 502 },
      );
    }

    // Salva o paymentId no pedido
    await orderRepository.updateStatus(order.id, 'PENDING', String(payment.id));

    return NextResponse.json({
      data: {
        paymentId:    payment.id,
        orderId:      order.id,
        qrCode:       pix.qr_code,
        qrCodeBase64: pix.qr_code_base64,
        expiracao,
        total:        Number(order.total),
      },
    });
  } catch (err) {
    console.error('[POST /api/payments/pix]', err);
    return NextResponse.json({ error: 'Erro ao gerar PIX' }, { status: 500 });
  }
}