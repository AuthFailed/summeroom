import './styles/main.css';
import { createOrder } from './lib/api';
import { cartTotal, clearCart, getCart, removeItem, setQty, updateBadge } from './lib/cart';

const priceFmt = new Intl.NumberFormat('ru-RU');

function render(): void {
  const items = getCart();
  const empty = document.getElementById('cartEmpty')!;
  const table = document.getElementById('cartTable') as HTMLTableElement;
  const form = document.getElementById('checkoutForm') as HTMLFormElement;
  const tbody = table.querySelector('tbody')!;
  const totalEl = document.getElementById('cartTotal')!;

  if (items.length === 0) {
    empty.hidden = false;
    table.hidden = true;
    form.hidden = true;
    updateBadge(items);
    return;
  }

  empty.hidden = true;
  table.hidden = false;
  form.hidden = false;

  tbody.innerHTML = items
    .map(
      (i) => `
      <tr data-id="${i.product_id}">
        <td>${i.name}</td>
        <td>${priceFmt.format(i.price_rub)} ₽</td>
        <td>
          <input type="number" min="1" max="99" value="${i.qty}" data-qty />
        </td>
        <td>${priceFmt.format(i.price_rub * i.qty)} ₽</td>
        <td><button type="button" class="btn-ghost" data-remove aria-label="Удалить">×</button></td>
      </tr>
    `
    )
    .join('');

  totalEl.textContent = `${priceFmt.format(cartTotal(items))} ₽`;
  updateBadge(items);
}

document.addEventListener('input', (e) => {
  const t = e.target as HTMLInputElement;
  if (!(t instanceof HTMLInputElement)) return;
  if (!t.hasAttribute('data-qty')) return;
  const tr = t.closest('tr[data-id]');
  if (!tr) return;
  const id = tr.getAttribute('data-id')!;
  const qty = Math.max(1, Math.min(99, Number(t.value) || 1));
  t.value = String(qty);
  setQty(id, qty);
  render();
});

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (!t.matches('[data-remove]')) return;
  const tr = t.closest('tr[data-id]');
  if (!tr) return;
  removeItem(tr.getAttribute('data-id')!);
  render();
});

const form = document.getElementById('checkoutForm') as HTMLFormElement;
const errEl = document.getElementById('checkoutError')!;
const payBtn = document.getElementById('payBtn') as HTMLButtonElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errEl.hidden = true;
  const items = getCart();
  if (items.length === 0) return;

  const fd = new FormData(form);
  const name = String(fd.get('name') ?? '').trim();
  const phone = String(fd.get('phone') ?? '').trim();
  const email = String(fd.get('email') ?? '').trim();
  const address = String(fd.get('address') ?? '').trim() || null;
  const comment = String(fd.get('comment') ?? '').trim() || null;
  const consent = fd.get('consent') === 'on';
  const website = String(fd.get('website') ?? '');

  if (!name || !phone || !email || !consent) {
    errEl.textContent = 'Заполните все обязательные поля и подтвердите согласие.';
    errEl.hidden = false;
    return;
  }

  payBtn.disabled = true;
  payBtn.textContent = 'Создаём заказ…';
  try {
    const resp = await createOrder({
      items: items.map((i) => ({ product_id: i.product_id, qty: i.qty })),
      customer: { name, phone, email },
      delivery_address: address,
      comment,
      consent: true,
      website,
    });
    clearCart();
    window.location.href = resp.confirmation_url;
  } catch (e) {
    errEl.textContent = (e as Error).message || 'Не удалось создать заказ. Попробуйте позже.';
    errEl.hidden = false;
    payBtn.disabled = false;
    payBtn.textContent = 'Оплатить через ЮKassa';
  }
});

render();
