import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export const orderRepository = {

  findAll() {
    return prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },

  findById(id: number) {
    return prisma.order.findUnique({
      where:   { id },
      include: { items: { include: { product: true } } },
    });
  },

  findByPaymentId(paymentId: string) {
    return prisma.order.findFirst({
      where:   { paymentId },
      include: { items: { include: { product: true } } },
    });
  },

  create(data: {
    customerName:    string;
    customerEmail:   string;
    customerPhone:   string;
    total:           number;
    paymentMethod:   string;
    shippingCep?:    string;
    shippingAddress?: object;
    shippingCost?:   number;
    items: {
      productId: number;
      quantity:  number;
      unitPrice: number;
      size?:     string;
    }[];
  }) {
    const { items, ...orderData } = data;
    return prisma.order.create({
      data: {
        ...orderData,
        items: { create: items },
      },
      include: { items: { include: { product: true } } },
    });
  },

  updateStatus(id: number, status: OrderStatus, paymentId?: string) {
    return prisma.order.update({
      where: { id },
      data:  { status, ...(paymentId && { paymentId }) },
    });
  },
};