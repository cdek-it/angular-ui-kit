# Technical Context

## Технологический стек

### Frontend Framework
- **Angular 18.2.13** - основной фреймворк
- **TypeScript 5.4.5** - язык разработки
- **RxJS 7.8.1** - реактивное программирование
- **Zone.js 0.14.0** - change detection

### Build System
- **Angular CLI 18.2.19** - инструмент разработки
- **ng-packagr 18.0.0** - сборка Angular библиотеки
- **esbuild 0.23.1** - быстрый бандлер
- **Gulp 5.0.0** - автоматизация задач (CSS processing)

### Styling
- **SASS** - препроцессор стилей
- **PostCSS 8.4.49** - трансформация CSS
- **Autoprefixer 10.4.20** - автопрефиксы
- **Tailwind CSS 3.4.14** - utility-first CSS

### Testing
- **Karma 6.4.2** - test runner
- **Jasmine 4.6.0** - testing framework
- **ChromeHeadless** - headless browser для CI

### Code Quality
- **ESLint 8.57.0** - статический анализ
- **@angular-eslint 18.0.0** - Angular-специфичные правила
- **Prettier 3.0.0** - форматирование кода

### Documentation
- **TypeDoc 0.25.13** - генерация API документации
- **PrismJS 1.29.0** - подсветка синтаксиса в примерах

### DevOps
- **Docker** - контейнеризация
- **GitLab CI** - непрерывная интеграция
- **Kubernetes** - оркестрация
- **Nexus** - приватный npm registry
- **Minio 8.0.5** - S3-совместимое хранилище

## Структура проекта

```
angular-ui-kit-main/
├── src/
│   ├── app/
│   │   ├── components/          # PrimeNG библиотека
│   │   │   ├── button/
│   │   │   ├── dropdown/
│   │   │   └── ...90+ компонентов
│   │   └── showcase/            # Demo приложение
│   └── assets/
├── primeng-sass-theme/          # SASS темы
│   └── themes/
│       ├── ek5/                 # Внутренние темы
│       └── brand/               # Внешние темы
├── builder/                     # Custom Angular builder
├── dist-css/                    # Артефакты CSS
└── api-generator/               # Генератор документации
```

## Процесс сборки

### Development
```bash
npm install
npm start                    # Dev server
npm run watch-themes        # SASS watching
```

### Production
```bash
npm run build:lib           # Сборка библиотеки
npm run build-themes        # Компиляция тем
npm run build              # Сборка showcase
```

### Publishing
```bash
# CSS темы → npm + S3
npm run build-themes
node s3-publish-themes.js
cd dist-css && npm publish

# Библиотека → npm
npm run build:lib
cd dist && npm publish
```

## Зависимости

### Peer Dependencies
- @angular/core: ^17.0.0 || ^18.0.0
- @angular/common: ^17.0.0 || ^18.0.0
- @angular/forms: ^17.0.0 || ^18.0.0
- rxjs: ^6.0.0 || ^7.8.1

### Key Dev Dependencies
- chart.js 4.4.2 - графики
- quill 2.0.2 - rich text editor
- primeicons 7.0.0 - иконки
- xlsx 0.18.5 - экспорт в Excel
- jspdf 2.5.1 - экспорт в PDF

## Текущие проблемы
1. package-lock.json не работает корректно в k8s (упомянуто в README)
2. strict-ssl=false в .npmrc (security risk)
3. Множественные package.json без workspaces
