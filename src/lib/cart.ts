import { showToast } from './toast';

const PLUS_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
`;

const CHECK_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
`;

export interface CartItem {
  product_id: string;
  name: string;
  price_rub: number;
  qty: number;
}

const STORAGE_KEY = 'sr.cart.v1';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) =>
        typeof i?.product_id === 'string' &&
        typeof i?.name === 'string' &&
        typeof i?.price_rub === 'number' &&
        typeof i?.qty === 'number' &&
        i.qty > 0
    );
  } catch {
    return [];
  }
}

function save(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  updateBadge(items);
}

export function getCart(): CartItem[] {
  return load();
}

export function cartTotal(items: CartItem[] = load()): number {
  return items.reduce((acc, i) => acc + i.price_rub * i.qty, 0);
}

export function setQty(productId: string, qty: number): void {
  const items = load();
  const idx = items.findIndex((i) => i.product_id === productId);
  if (idx === -1) return;
  if (qty <= 0) items.splice(idx, 1);
  else items[idx].qty = qty;
  save(items);
}

export function removeItem(productId: string): void {
  save(load().filter((i) => i.product_id !== productId));
}

export function clearCart(): void {
  save([]);
}

export function updateBadge(items: CartItem[] = load()): void {
  const counter = document.getElementById('cartCount');
  if (!counter) return;
  const total = items.reduce((a, i) => a + i.qty, 0);
  counter.textContent = String(total);
}

export function addToCart(
  btn: HTMLButtonElement,
  name: string,
  opts: { productId: string | null; priceRub: number }
): void {
  if (!opts.productId) {
    showToast('Оформление заказа временно недоступно');
    return;
  }
  const items = load();
  const existing = items.find((i) => i.product_id === opts.productId);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({
      product_id: opts.productId,
      name,
      price_rub: opts.priceRub,
      qty: 1,
    });
  }
  save(items);

  btn.classList.add('added');
  const isIconBtn = btn.classList.contains('add-btn');
  const originalText = btn.textContent?.trim() ?? '';
  if (isIconBtn) btn.innerHTML = CHECK_ICON;
  else btn.textContent = '✓ добавлено';
  showToast(`${name} — в корзине`);

  window.setTimeout(() => {
    btn.classList.remove('added');
    if (isIconBtn) btn.innerHTML = PLUS_ICON;
    else btn.textContent = originalText;
  }, 1800);
}
