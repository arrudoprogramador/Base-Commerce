export type ProductSizes = {
  P:  boolean;
  M:  boolean;
  G:  boolean;
  GG: boolean;
};

export type Product = {
  id:          number;
  name:        string;
  description: string | null;
  price:       number;
  stock:       number;
  imageUrl:    string | null;
  active:      boolean;
  sizes:       ProductSizes | null;
  categoryId:  number;
  category:    Category;
  createdAt:   string;
  updatedAt:   string;
};

// ── Categoria ────────────────────────────────────────────────
export type Category = {
  id:   number;
  name: string;
  slug: string;
};

// ── Carrinho ─────────────────────────────────────────────────
export type CartItem = {
  productId: number;
  name:      string;
  price:     number;
  imageUrl:  string | null;
  quantity:  number;
  size:      string | null;
};

// ── Pedido ───────────────────────────────────────────────────
export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type Order = {
  id:              number;
  customerName:    string;
  customerEmail:   string;
  customerPhone:   string;
  total:           number;
  status:          OrderStatus;
  paymentMethod:   string;
  paymentId:       string | null;
  shippingCep:     string | null;
  shippingAddress: ShippingAddress | null;
  shippingCost:    number | null;
  items:           OrderItem[];
  createdAt:       string;
  updatedAt:       string;
};

export type OrderItem = {
  id:        number;
  quantity:  number;
  unitPrice: number;
  size:      string | null;
  product:   Pick<Product, 'id' | 'name' | 'imageUrl'>;
};

export type ShippingAddress = {
  cep:          string;
  logradouro:   string;
  numero:       string;
  complemento?: string;
  bairro:       string;
  localidade:   string;
  uf:           string;
};

// ── Pagamento ────────────────────────────────────────────────
export type PixPayment = {
  paymentId:    number;
  pedidoId:     number;
  qrCode:       string;
  qrCodeBase64: string;
  expiracao:    string;
  total:        number;
};

export type PaymentStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled';

// ── API Response ─────────────────────────────────────────────
export type ApiResponse<T> = {
  data:    T;
  message?: string;
};

export type ApiError = {
  error:   string;
  details?: string;
};