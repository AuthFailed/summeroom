import './styles/main.css';
import { renderPlants, renderPots, renderSocialLinks } from './lib/render';
import { observeFadeIns } from './lib/observer';
import { addToCart, updateBadge } from './lib/cart';
import { showToast } from './lib/toast';
import { loadCatalog, type ResolvedCatalog } from './lib/catalog';
import type { PlantCategory } from './data/plants';

type Filter = PlantCategory | 'all';

let currentCatalog: ResolvedCatalog | null = null;

function wireFilters(): void {
  const filters = document.querySelectorAll<HTMLButtonElement>('.filter');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (currentCatalog) {
        renderPlants(currentCatalog, (btn.dataset.filter as Filter) ?? 'all');
      }
    });
  });
}

function wireCartDelegation(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const btn = target.closest<HTMLButtonElement>('.add-btn, .mini-btn');
    if (!btn) return;
    if (btn.disabled) return;
    const name = btn.dataset.name;
    const productId = btn.dataset.id || null;
    const priceRub = Number(btn.dataset.price ?? 0);
    if (!name) return;
    addToCart(btn, name, { productId, priceRub });
  });
}

function wireHeroCta(): void {
  document.querySelectorAll<HTMLElement>('[data-scroll-to]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetId = el.dataset.scrollTo;
      if (!targetId) return;
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function wireSubscribeForm(): void {
  const form = document.querySelector<HTMLFormElement>('.sub-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Подписка оформлена ✦');
    form.reset();
  });
}

function wireCartBtn(): void {
  const cartBtn = document.querySelector<HTMLAnchorElement | HTMLButtonElement>(
    '[data-cart-link]'
  );
  cartBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/checkout.html';
  });
}

async function init(): Promise<void> {
  currentCatalog = await loadCatalog();
  renderPlants(currentCatalog);
  renderPots(currentCatalog);
  renderSocialLinks(currentCatalog.social);
  observeFadeIns();
  updateBadge();
}

wireFilters();
wireCartDelegation();
wireHeroCta();
wireSubscribeForm();
wireCartBtn();
void init();
