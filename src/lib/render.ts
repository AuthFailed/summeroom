import type { PlantCategory } from '../data/plants';
import { createLeafSVG, createPotSVG } from './svg';
import { observeFadeIns } from './observer';
import type { ResolvedCatalog, ResolvedProduct } from './catalog';
import type { Plant } from '../data/plants';
import type { Pot } from '../data/pots';

type Filter = PlantCategory | 'all';

const PLUS_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
`;

const priceFormatter = new Intl.NumberFormat('ru-RU');

function visualFor(p: ResolvedProduct<Plant | Pot>, fallbackSvg: string): string {
  if (p.primaryImageUrl) {
    return `<img class="card-photo" src="${p.primaryImageUrl}" alt="" loading="lazy" />`;
  }
  return fallbackSvg;
}

export function renderPlants(catalog: ResolvedCatalog, filter: Filter = 'all'): void {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const all = catalog.plants;
  const filtered = filter === 'all' ? all : all.filter((p) => p.data.category === filter);

  grid.innerHTML = filtered
    .map((rp, i) => {
      const p = rp.data;
      const tagClass = p.category === 'rare' ? 'rare' : p.category === 'easy' ? 'easy' : '';
      const num = String(i + 1).padStart(2, '0');
      const pid = rp.id ?? '';
      const stockAttr = rp.stock > 0 ? '' : 'disabled';
      return `
        <article class="card fade-in">
          <div class="card-visual">
            <span class="card-tag ${tagClass}">${p.tag}</span>
            <span class="card-num">№ ${num}</span>
            ${visualFor(rp, createLeafSVG(p))}
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
              <button class="add-btn" ${stockAttr} data-name="${p.name}" data-id="${pid}" data-price="${p.price}" aria-label="Добавить в корзину">
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

export function renderPots(catalog: ResolvedCatalog): void {
  const grid = document.querySelector<HTMLElement>('.print-grid');
  if (!grid) return;

  grid.innerHTML = catalog.pots
    .map((rp) => {
      const p = rp.data;
      const pid = rp.id ?? '';
      return `
      <article class="print-card fade-in">
        <div class="print-visual">
          ${visualFor(rp, createPotSVG(p))}
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
          <button class="mini-btn" data-name="Кашпо ${p.name}" data-id="${pid}" data-price="${p.price}">Заказать</button>
        </div>
      </article>
    `;
    })
    .join('');

  observeFadeIns();
}

export function renderSocialLinks(social: ResolvedCatalog['social']): void {
  const mapping: Record<string, string> = {
    telegram: 'Telegram',
    instagram: 'Instagram',
    pinterest: 'Pinterest',
    youtube: 'YouTube',
    vk: 'VK',
  };
  const container = document.querySelector<HTMLElement>('[data-social-list]');
  if (!container) return;
  const entries = Object.entries(mapping).filter(
    ([key]) => typeof (social as Record<string, unknown>)[key] === 'string'
  );
  if (entries.length === 0) return;
  container.innerHTML = entries
    .map(([key, label]) => {
      const url = (social as Record<string, string>)[key];
      return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
    })
    .join('');
}
