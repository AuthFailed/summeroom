# Комната лета

[summeroom.ru](https://summeroom.ru) — каталог редких комнатных растений и 3D-печатных кашпо.

**Стек:** Vite 7 · TypeScript 5 · нативный CSS · Lightning CSS.

## Команды

```bash
npm install    # установить зависимости
npm run dev    # dev-сервер с HMR на http://localhost:5173
npm run build  # проверка типов + production-сборка в dist/
npm run preview # локальный предпросмотр production-сборки
```

## Структура

```
.
├── .github/workflows/deploy.yml   # автодеплой на GitHub Pages
├── public/                        # статика, копируется as-is
├── src/
│   ├── data/                      # каталог растений и кашпо
│   ├── lib/                       # SVG-генерация, корзина, тосты, observer
│   ├── styles/main.css            # глобальные стили
│   ├── main.ts                    # точка входа
│   └── vite-env.d.ts              # типы Vite
├── index.html                     # шаблон для Vite
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Деплой

Workflow `.github/workflows/deploy.yml` собирает сайт и публикует `dist/`
на GitHub Pages при каждом push в `main`. Файл `public/CNAME` привязывает
раздачу к домену **summeroom.ru** (копируется в `dist/` автоматически).

Перед первым деплоем:

1. **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain:** `summeroom.ru` + включить **Enforce HTTPS**.
3. В DNS домена добавить записи:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (опц.) `AAAA` на IPv6-адреса GitHub Pages
   - или `CNAME` для `www` → `authfailed.github.io`.
