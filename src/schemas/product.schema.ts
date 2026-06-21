// src/schemas/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
  name:        z.string().min(2, 'Nome muito curto').max(100),
  description: z.string().max(500).optional(),
  price:       z.number().positive('Preço deve ser positivo'),
  stock:       z.number().int().min(0, 'Estoque não pode ser negativo'),
  imageUrl:    z.string().url('URL inválida').optional().or(z.literal('')),
  categoryId:  z.number().int().positive('Categoria obrigatória'),
  active:      z.boolean().default(true),
  sizes: z.object({
    P:  z.boolean(),
    M:  z.boolean(),
    G:  z.boolean(),
    GG: z.boolean(),
  }).optional(),
});

export const productUpdateSchema = productSchema.partial();

export type ProductInput  = z.infer<typeof productSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;