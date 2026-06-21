// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mpPayment } from '@/lib/mercadopago';
import { orderRepository } from '@/repositories/order.repository';
import { productRepository } from '@/repositories/product.repository';

// POST /api/webhook — Mercado Pago notifica mudança de status
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // MP envia vários tipos — só processamos pagamentos
    if (type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const paymentId = data?.id;
    if (!paymentId) {
      return NextResponse.json({ error: 'payment_id ausente' }, { status: 400 });
    }

    // ── Verificar status real no MP (nunca confiar só no webhook) ──
    const payment = await mpPayment.get({ id: parseInt(paymentId) });

    console.log(`[webhook] payment ${paymentId} — status: ${payment.status} — ref: ${payment.external_reference}`);

    if (payment.status === 'approved') {
      const orderId = parseInt(payment.external_reference || '0');
      if (!orderId) {
        console.error('[webhook] external_reference inválido:', payment.external_reference);
        return NextResponse.json({ ok: true });
      }

      const order = await orderRepository.findById(orderId);
      if (!order) {
        console.error('[webhook] pedido não encontrado:', orderId);
        return NextResponse.json({ ok: true });
      }

      // Evita processar duas vezes
      if (order.status === 'PAID') {
        console.log('[webhook] pedido já estava PAID, ignorando');
        return NextResponse.json({ ok: true });
      }

      // ── Atualiza status do pedido ─────────────────────────────
      await orderRepository.updateStatus(orderId, 'PAID', String(payment.id));

      // ── Decrementa estoque de cada item ───────────────────────
      for (const item of order.items) {
        await productRepository.decrementStock(item.productId, item.quantity);
      }

      console.log(`[webhook] ✅ Pedido #${orderId} marcado como PAID`);
    }

    // MP exige resposta 200 em até 22s, senão retenta
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] erro:', err);
    // Retorna 200 mesmo com erro para MP não retentar indefinidamente
    return NextResponse.json({ ok: true });
  }
}