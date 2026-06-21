// src/app/api/payments/status/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mpPayment } from '@/lib/mercadopago';

type Params = { params: { id: string } };

// GET /api/payments/status/:id
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const paymentId = parseInt(params.id);
    if (isNaN(paymentId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const payment = await mpPayment.get({ id: paymentId });

    return NextResponse.json({
      data: {
        paymentId:   payment.id,
        status:      payment.status,        // pending | approved | rejected
        statusDetail: payment.status_detail,
        orderId:     payment.external_reference,
      },
    });
  } catch (err) {
    console.error('[GET /api/payments/status/:id]', err);
    return NextResponse.json({ error: 'Erro ao consultar pagamento' }, { status: 500 });
  }
}