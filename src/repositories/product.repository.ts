// src/repositories/product.repository.ts
import { prisma } from '@/lib/prisma';

export const productRepository = {

  findAll(params?: { categorySlug?: string; active?: boolean }) {
    return prisma.product.findMany({
      where: {
        active:   params?.active ?? true,
        category: params?.categorySlug
          ? { slug: params.categorySlug }
          : undefined,
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  findById(id: number) {
    return prisma.product.findUnique({
      where:   { id },
      include: { category: true },
    });
  },

  create(data: {
    name: string; description?: string; price: number;
    stock: number; imageUrl?: string; sizes?: object;
    categoryId: number;
  }) {
    return prisma.product.create({ data, include: { category: true } });
  },

  update(id: number, data: Partial<{
    name: string; description: string; price: number;
    stock: number; imageUrl: string; active: boolean;
    sizes: object; categoryId: number;
  }>) {
    return prisma.product.update({
      where:   { id },
      data,
      include: { category: true },
    });
  },

  delete(id: number) {
    return prisma.product.update({
      where: { id },
      data:  { active: false }, // soft delete
    });
  },

  decrementStock(id: number, quantity: number) {
    return prisma.product.update({
      where: { id },
      data:  { stock: { decrement: quantity } },
    });
  },
};