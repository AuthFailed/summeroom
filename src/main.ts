import './styles/main.css';
import { renderPlants, renderPots } from './lib/render';
import { observeFadeIns } from './lib/observer';
import { addToCart } from './lib/cart';
import { showToast } from './lib/toast';
import type { PlantCategory } from './data/plants';

type Filter = PlantCategory | 'all';

function wireFilters(): void {
  const filters = document.querySelectorAll<HTMLButtonElement>('.filter');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlants((btn.dataset.filter as Filter) ?? 'all');
    });
  });
}

function wireCartDelegation(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const btn = target.closest<HTMLButtonElement>('.add-btn, .mini-btn');
    if (!btn) return;
    const name = btn.dataset.name;
    if (!name) return;
    addToCart(btn, name);
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

renderPlants();
renderPots();
observeFadeIns();
wireFilters();
wireCartDelegation();
wireHeroCta();
wireSubscribeForm();
