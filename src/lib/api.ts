import type { Plant } from '../data/plants';
import type { Pot } from '../data/pots';

const FALLBACK_BASE = '';
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? FALLBACK_BASE).replace(/\/$/, '');

export interface ApiImage {
  id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ApiProduct {
  id: string;
  type: 'plant' | 'pot';
  slug: string;
  code: string | null;
  name: string;
  latin_name: string | null;
  description: string | null;
  price_rub: number;
  attrs: Record<string, unknown>;
  is_visible: boolean;
  stock: number;
  sort_order: number;
  images: ApiImage[];
}

export interface SocialMap {
  telegram?: string;
  instagram?: string;
  pinterest?: string;
  youtube?: string;
  vk?: string;
}

export interface CatalogResponse {
  plants: ApiProduct[];
  pots: ApiProduct[];
  social: SocialMap;
  updated_at: string;
}

export async function fetchCatalog(signal?: AbortSignal): Promise<CatalogResponse> {
  const resp = await fetch(`${API_BASE}/api/public/catalog`, {
    signal,
    credentials: 'omit',
    headers: { accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`catalog ${resp.status}`);
  return (await resp.json()) as CatalogResponse;
}

export interface CreateOrderBody {
  items: Array<{ product_id: string; qty: number }>;
  customer: { name: string; phone: string; email: string };
  delivery_address?: string | null;
  comment?: string | null;
  consent: boolean;
  website?: string;
}

export interface CreateOrderResponse {
  order_number: string;
  total_rub: number;
  confirmation_url: string;
}

export async function createOrder(body: CreateOrderBody): Promise<CreateOrderResponse> {
  const resp = await fetch(`${API_BASE}/api/public/orders`, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    let detail = `order ${resp.status}`;
    try {
      const j = await resp.json();
      if (typeof j.detail === 'string') detail = j.detail;
    } catch {}
    throw new Error(detail);
  }
  return (await resp.json()) as CreateOrderResponse;
}

export interface OrderStatus {
  number: string;
  status: string;
  payment_status: string | null;
  total_rub: number;
}

export async function fetchOrderStatus(number: string): Promise<OrderStatus> {
  const resp = await fetch(`${API_BASE}/api/public/orders/${encodeURIComponent(number)}`, {
    credentials: 'omit',
    headers: { accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`status ${resp.status}`);
  return (await resp.json()) as OrderStatus;
}

export function apiProductToPlant(p: ApiProduct): Plant {
  const a = p.attrs as Record<string, unknown>;
  return {
    name: p.name,
    latin: p.latin_name ?? '',
    price: p.price_rub,
    category: (a.category as Plant['category']) ?? 'easy',
    tag: (a.tag as string) ?? '',
    light: (a.light as string) ?? '',
    water: (a.water as string) ?? '',
    level: (a.level as string) ?? '',
    leafColor: (a.leafColor as string) ?? '#4e6847',
    spotColor: (a.spotColor as string | null) ?? null,
    stripes: a.stripes as boolean | undefined,
    vertical: a.vertical as boolean | undefined,
    fern: a.fern as boolean | undefined,
    veins: a.veins as boolean | undefined,
    small: a.small as boolean | undefined,
  };
}

export function apiProductToPot(p: ApiProduct): Pot {
  const a = p.attrs as Record<string, unknown>;
  return {
    code: p.code ?? '',
    name: p.name,
    nameItalic: (a.nameItalic as boolean) ?? false,
    shape: (a.shape as Pot['shape']) ?? 'wave',
    colorA: (a.colorA as string) ?? '#b8542e',
    colorB: (a.colorB as string) ?? '#e8e1ce',
    size: (a.size as string) ?? '',
    height: (a.height as string) ?? '',
    material: (a.material as string) ?? '',
    price: p.price_rub,
  };
}

export { API_BASE };
