---
component: ExtraCard
selector: extra-card
import:
  symbol: ExtraCardComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1213:4134'
  componentKey: '55dc631832ae2e7da5810b95b0537584bf146f60'
  name: '<Card>'
status: stable
updated: '2026-09-29'
---

## Overview

`ExtraCardComponent` — контейнер-поверхность для группировки связанного контента и действий вокруг одной темы или объекта; визуально отделяет блок от фона как единое целое. Оборачивает PrimeNG `p-card` и добавляет типизированные пропсы заголовка/подзаголовка и режим тени.

Компонент соответствует Figma-компоненту `<Card>` (nodeId `1213:4134`, библиотека «UI Kit (DS) v2.1»). Слоты `header`/`footer` — собственная директива `extraCardTemplate` (не протекает PrimeNG `pTemplate` в публичное API); `content` — обычный `<ng-content>`.

## Props mapping

| Свойство   | Тип       | По умолчанию | Описание                                                                               |
| ---------- | --------- | ------------ | -------------------------------------------------------------------------------------- |
| `title`    | `string`  | `''`         | Заголовок карточки — соответствует Figma-свойству `text-title`                         |
| `subtitle` | `string`  | `''`         | Подзаголовок карточки — соответствует Figma-свойству `text-caption`                    |
| `overlay`  | `boolean` | `false`      | Тень вокруг карточки (`shadow-md`) — соответствует Figma-варианту `overlay=true/false` |

## Variants

### Overlay false (плоская карточка)

Figma: `<Card>`, overlay=false — nodeId `1213:4135`

```html
<extra-card title="Заголовок" subtitle="Подзаголовок">
  <p class="text-sm">Контент карточки.</p>
</extra-card>
```

### Overlay true (карточка с тенью)

Figma: `<Card>`, overlay=true — nodeId `1156:4676`

```html
<extra-card title="Заголовок" subtitle="Подзаголовок" [overlay]="true">
  <p class="text-sm">Контент карточки с тенью.</p>
</extra-card>
```

### С изображением в шапке (header)

Figma: `<Card>`, show-header=true

```html
<extra-card title="Заголовок" subtitle="Подзаголовок">
  <ng-template extraCardTemplate="header">
    <img alt="Заголовок" src="assets/cover.jpg" class="w-full" />
  </ng-template>
  <p class="text-sm">Контент карточки с изображением в шапке.</p>
</extra-card>
```

### С действием в футере (footer)

Figma: `<Card>`, show-footer=true

```html
<extra-card title="Заголовок">
  <p class="text-sm">Контент карточки.</p>
  <ng-template extraCardTemplate="footer">
    <extra-button label="Действие" size="small" [fluid]="true"></extra-button>
  </ng-template>
</extra-card>
```

```ts
import { ExtraCardComponent, ExtraCardTemplateDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
```

## Slots

| Слот           | Синтаксис                                  | Figma-свойство                         | Описание                                         |
| -------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------------------ |
| Шапка (header) | `<ng-template extraCardTemplate="header">` | `show-header`                          | Изображение или произвольный блок над заголовком |
| Тело (content) | обычный `<ng-content>`, без обёртки        | `change-layout-body`                   | Основное содержимое карточки                     |
| Футер (footer) | `<ng-template extraCardTemplate="footer">` | `change-layout-footer` / `show-footer` | Кнопки действий и прочий контент нижней части    |

Заголовок и подзаголовок задаются не слотами, а пропсами `title` и `subtitle` (Figma: `text-title`, `text-caption`).

## Related

- [Button](../button/button.figma.md) — кнопки действий в футере карточки
- [Dialog](../dialog/dialog.figma.md) — модальный контейнер; в отличие от Card прерывает workflow
- [Токены](../../figma-code-connect/tokens.md) — токены поверхности, тени и скругления
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Используйте карточку для группировки контента одной темы (header / media / body / footer).
- Задавайте `[overlay]="true"`, когда карточку нужно визуально приподнять над фоном (grid/list превью).
- Передавайте заголовок и подзаголовок через `title` и `subtitle`, а не вёрсткой внутри `content`.
- Размещайте кнопки действий в слоте `footer`, используя [Button](../button/button.figma.md).

**Don't:**

- Не используйте Card вместо `Dialog` для модальных сценариев — Card не прерывает workflow.
- Не применяйте Card как зону-секцию без выделенной поверхности (для этого подходит Panel).
- Не размещайте в Card критичные уведомления или табличные данные.
- Не инлайньте значения тени и скругления — используйте [токены](../../figma-code-connect/tokens.md).
