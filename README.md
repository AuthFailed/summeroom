# Комната лета

Каталог редких комнатных растений и 3D-печатных кашпо.

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

## Деплой на GitHub Pages

Workflow `.github/workflows/deploy.yml` собирает сайт и публикует `dist/`
на GitHub Pages при каждом push в `main`. Переменная `GITHUB_PAGES=true`
подставляет правильный `base` (`/summeroom/`).

Перед первым деплоем в настройках репозитория включите
**Settings → Pages → Source: GitHub Actions**.
