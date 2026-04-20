let timer: number | undefined;

export function showToast(text: string): void {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = text;
  toast.classList.add('show');

  if (timer !== undefined) clearTimeout(timer);
  timer = window.setTimeout(() => toast.classList.remove('show'), 2500);
}
