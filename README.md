# angular-ui-kit

`angular-ui-kit` — это полноценная библиотека UI-компонентов и сервисов для Angular с готовыми стилями, storybook для демонстрации и документацией.
Библиотека позволяет быстро и удобно добавлять готовые фирменные компоненты CDEK в приложения.

## Использование

1. Установите пакет `@cdek-it/angular-ui-kit`

```shell
npm install @cdek-it/angular-ui-kit
```

2. Подключите провайдеры в ваш angular-проект. Важно: для корректной работы стилей необходимо использовать `provideExtraThemes()` в списке провайдеров, например:

```ts
import { provideExtraThemes } from '@cdek-it/angular-ui-kit';
import { provideBrowserGlobalErrorListeners } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(BrowserModule),
    provideExtraThemes(),
  ]
};
```

`provideExtraThemes()` необходим для правильной интеграции стилей библиотеки в приложение.

## Пример использования компонентов

Ниже простой пример использования входящих в библиотеку компонентов (вариант — `extra-button` и `extra-tag`). Вставьте в шаблон компонента или story:

```html
<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px">
  <extra-button label="hello"></extra-button>
  <extra-button label="hello" [rounded]="true"></extra-button>
  <extra-button label="hello" [text]="true"></extra-button>
  <extra-tag [value]="'tag content'"></extra-tag>
</div>
```

Примечание: Нужно добавить импорт соответствующего модуля/компонентов библиотеки в ваш модуль или компонент. Пример для standalone-компонента (используется `imports` в декораторе):

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraButtonComponent, ExtraTagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    ExtraButtonComponent,
    CommonModule,
    ExtraTagComponent,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px">
      <extra-button label="hello"></extra-button>
      <extra-button label="hello" [rounded]="true"></extra-button>
      <extra-button label="hello" [text]="true"></extra-button>
      <extra-tag [value]="'tag content'"></extra-tag>
    </div>
  `
})
export class AppExample {}
```

## Tailwind: цвета и тема из кита

Кит публикует готовую Tailwind-тему, **сгенерированную из своих дизайн-токенов** (`tokens.json` —
тот же источник, что и тема PrimeNG). Это значит: обновили палитру в ките → consumer'у достаточно
bump'нуть версию, чтобы получить новые цвета, согласованные с компонентами `extra-*`.

Генерация: `npm run generate:tailwind` (входит в `build:lib`). Артефакты: `tailwind/theme.css`
(Tailwind v4 CSS-first `@theme`) и `tailwind/preset.cjs` (JS-пресет).

### Подключение (новый, простой способ)

**Tailwind v4 (CSS-first)** — одна строка в `styles.scss`:

```scss
@use "tailwindcss";
@use "@cdek-it/angular-ui-kit/tailwind";
```

После этого доступны утилиты, согласованные с китом: `bg-primary`, `text-danger`, `bg-surface-ground`,
`border-surface-border`, `text-text-muted`, `font-heading`, `rounded-200` и т.д. Semantic-цвета
(`primary`, `surface-ground`, `text` и др.) ссылаются на runtime-переменные PrimeNG (`--p-*`) и
**трекают `provideExtraThemes()`**; оттенки палитры — статический слепок (их runtime-имена
нестандартны, поэтому зафиксированы в ките).

**Tailwind v4 (`@config`) / v3 (JS-пресет)** — `tailwind.config.js`:

```js
const uiKit = require('@cdek-it/angular-ui-kit/tailwind/preset');
module.exports = {
  presets: [uiKit],
  content: ['./index.html', './src/**/*.{html,ts}'],
};
```

### Прежний способ

Можно не использовать пресет кита и задавать палитру самостоятельно в `tailwind.config.js` /
`styles.scss` (например, мостом legacy-переменных → `--p-*`). Кит ничего не навязывает —
публикация темы **аддитивна**.

---

## Используемые технологии и связанные зависимости

---
*<span style="color: gray; font-size: 10px;">используйте в своём проекте</span>*
- Angular 20
- PrimeNG 20
- tailwindcss 3
- @tabler/icons-webfont 3
- Node 20
- ESlint
- Prettier
---

- Storybook 10

Важно: на данный момент компоненты библиотеки не работают без Zone.js. Убедитесь, что ваше приложение использует zone (Zone.js должен быть подключён). В большинстве стандартных Angular-приложений Zone.js подключён по умолчанию.

## Структура проекта

- `src/app` - базовое angular-приложение. Может использоваться как плейграунд для разработки и отладки.
- `src/stories` - набор story с компонентами для storybook.
- `src/prime-preset` - пресет темы и токены (используется библиотекой для совместимости с PrimeNG).
- `src/lib` - исходники компонентов и сервисов библиотеки (компоненты, сервисы, модули и публичный API).

## Запуск storybook

1. Установить зависимости

```
npm ci
```

2. Запустить проект

```
npm run storybook
```

3. Открыть в браузере по адресу http://localhost:6006

## Разработка story

1. В директории `src/stories/components` создайте папку с вашим компонентом.
2. Реализуйте story со всеми показанными в figma состояниями компонента. Для референса можно использовать `button`.
3. Убедитесь, что все состояния компонента выглядят верно. Если нет - смотрите раздел "[Правила доработки компонентов](#Правила доработки компонентов)" ниже.
4. Создать pull request в `main`, прикрепить его в задачу. Задачу отдать на ревью разработчикам и дизайнерам.
   В случае замечаний ориентируемся на пункт `3` выше.
