# blink-schools

Прототип мобильного экрана учебного заведения: профиль универа, выбор корпуса,
списки студентов «кто сейчас в универе», стены корпусов с чатами, комментариями
и реакциями.

## Стек
- React 18 + Vite
- CSS Modules

## Локально
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # прод-сборка в dist/
```

## Деплой
Пуш в `main` автоматически собирает проект и публикует на GitHub Pages
(GitHub Actions, см. `.github/workflows/deploy.yml`).

Живой сайт: https://herftpok.github.io/blink-schools/
