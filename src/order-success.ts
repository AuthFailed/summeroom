import './styles/main.css';
import { fetchOrderStatus } from './lib/api';

const priceFmt = new Intl.NumberFormat('ru-RU');

const STATUS_LABEL: Record<string, string> = {
  pending_payment: 'Ожидает оплаты',
  new: 'Новый',
  confirmed: 'Подтверждён',
  paid: 'Оплачен',
  shipped: 'Отправлен',
  done: 'Завершён',
  cancelled: 'Отменён',
};

const params = new URLSearchParams(window.location.search);
const orderNumber = params.get('o');

const title = document.getElementById('title')!;
const desc = document.getElementById('desc')!;
const spinner = document.getElementById('spinner')!;
const details = document.getElementById('details')!;
const actions = document.getElementById('actions')!;

if (!orderNumber) {
  title.textContent = 'Не удалось найти заказ';
  desc.textContent = 'Проверьте ссылку из письма или обратитесь в поддержку.';
  spinner.hidden = true;
} else {
  document.getElementById('orderNumber')!.textContent = orderNumber;
  let attempts = 0;
  const MAX_ATTEMPTS = 20;

  async function poll(): Promise<void> {
    attempts += 1;
    try {
      const s = await fetchOrderStatus(orderNumber!);
      document.getElementById('orderTotal')!.textContent = `${priceFmt.format(s.total_rub)} ₽`;
      document.getElementById('orderStatus')!.textContent =
        STATUS_LABEL[s.status] ?? s.status;
      details.hidden = false;

      if (s.status === 'paid' || s.status === 'shipped' || s.status === 'done') {
        title.textContent = 'Оплачено! Спасибо ✦';
        desc.textContent = 'Мы свяжемся с вами в ближайшее время по поводу доставки. Чек по 54-ФЗ отправлен на email.';
        spinner.hidden = true;
        actions.hidden = false;
        return;
      }
      if (s.status === 'cancelled') {
        title.textContent = 'Платёж не прошёл';
        desc.innerHTML = 'Если вы видите это по ошибке — <a href="/checkout.html">попробуйте ещё раз</a>.';
        spinner.hidden = true;
        actions.hidden = false;
        return;
      }
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(poll, 2000);
      } else {
        title.textContent = 'Обрабатываем платёж';
        desc.textContent = 'ЮKassa подтверждает оплату. Мы пришлём письмо, как только всё будет готово.';
        spinner.hidden = true;
        actions.hidden = false;
      }
    } catch {
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(poll, 3000);
        return;
      }
      title.textContent = 'Не удалось получить статус';
      desc.textContent = 'Попробуйте обновить страницу через несколько минут.';
      spinner.hidden = true;
    }
  }

  void poll();
}
