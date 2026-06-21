import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity:  z.number().int().positive('Quantidade deve ser maior que zero'),
  size:      z.string().optional(),
});

export const shippingSchema = z.object({
  cep:         z.string().regex(/^\d{8}$/, 'CEP inválido'),
  logradouro:  z.string(),
  numero:      z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro:      z.string(),
  localidade:  z.string(),
  uf:          z.string().length(2),
});

export const createOrderSchema = z.object({
  customerName:    z.string().min(2, 'Nome muito curto'),
  customerEmail:   z.string().email('E-mail inválido'),
  customerPhone:   z.string().min(10, 'Telefone inválido'),
  paymentMethod:   z.enum(['pix', 'cartao']),
  shippingAddress: shippingSchema,
  shippingCost:    z.number().min(0),
  items:           z.array(orderItemSchema).min(1, 'Pedido sem itens'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;