import { plants, type PlantCategory } from '../data/plants';
import { pots } from '../data/pots';
import { createLeafSVG, createPotSVG } from './svg';
import { observeFadeIns } from './observer';

type Filter = PlantCategory | 'all';

const PLUS_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
`;

const priceFormatter = new Intl.NumberFormat('ru-RU');

export function renderPlants(filter: Filter = 'all'): void {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? plants : plants.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map((p, i) => {
      const tagClass = p.category === 'rare' ? 'rare' : p.category === 'easy' ? 'easy' : '';
      const num = String(i + 1).padStart(2, '0');
      return `
        <article class="card fade-in">
          <div class="card-visual">
            <span class="card-tag ${tagClass}">${p.tag}</span>
            <span class="card-num">№ ${num}</span>
            ${createLeafSVG(p)}
          </div>
          <div class="card-body">
            <div>
              <h3 class="card-title">${p.name}</h3>
              <div class="card-latin">${p.latin}</div>
            </div>
            <div class="card-specs">
              <span>☀ ${p.light}</span>
              <span>💧 ${p.water}</span>
              <span>✦ ${p.level}</span>
            </div>
            <div class="card-footer">
              <div class="card-price">${priceFormatter.format(p.price)}<span class="cur"> ₽</span></div>
              <button class="add-btn" data-name="${p.name}" aria-label="Добавить в корзину">
                ${PLUS_ICON}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  observeFadeIns();
}

export function renderPots(): void {
  const grid = document.querySelector<HTMLElement>('.print-grid');
  if (!grid) return;

  grid.innerHTML = pots
    .map(
      (p) => `
      <article class="print-card fade-in">
        <div class="print-visual">
          ${createPotSVG(p)}
        </div>
        <div class="print-code">
          <span>№ ${p.code}</span>
          <span>3D · PLA</span>
        </div>
        <h3 class="print-name">${p.nameItalic ? `<span class="italic">${p.name}</span>` : p.name}</h3>
        <div class="print-meta">
          <span>${p.size}</span>
          <span>${p.height}</span>
          <span>${p.material}</span>
        </div>
        <div class="print-bottom">
          <div class="print-price">${priceFormatter.format(p.price)}<span class="cur"> ₽</span></div>
          <button class="mini-btn" data-name="Кашпо ${p.name}">Заказать</button>
        </div>
      </article>
    `,
    )
    .join('');

  observeFadeIns();
}
