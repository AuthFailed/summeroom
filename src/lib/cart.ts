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

let cartCount = 0;

export function addToCart(btn: HTMLButtonElement, name: string): void {
  cartCount++;
  const counter = document.getElementById('cartCount');
  if (counter) counter.textContent = String(cartCount);

  btn.classList.add('added');

  const isIconBtn = btn.classList.contains('add-btn');
  const originalText = btn.textContent?.trim() ?? '';

  if (isIconBtn) {
    btn.innerHTML = CHECK_ICON;
  } else {
    btn.textContent = '✓ добавлено';
  }

  showToast(`${name} — в корзине`);

  window.setTimeout(() => {
    btn.classList.remove('added');
    if (isIconBtn) {
      btn.innerHTML = PLUS_ICON;
    } else {
      btn.textContent = originalText;
    }
  }, 1800);
}
