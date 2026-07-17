---
component: ExtraTooltipDirective
selector: '[extra-tooltip]'
import:
  symbol: ExtraTooltipDirective
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '24:1369'
  componentKey: '82ea6ac996902209774a682f0bf448bc307261e6'
  name: '<Tooltip>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraTooltipDirective` — атрибутная директива для показа короткой текстовой подсказки у хост-элемента при наведении или фокусе. Подсказка содержит только текст, не интерактивна и применяется к любому элементу через селектор `[extra-tooltip]` (например к `extra-button`, `input` или `span`).

Директива соответствует Figma-компоненту `<Tooltip>` (nodeId `24:1369`) из библиотеки UI Kit (DS) v2.0. В отличие от `Popover` (интерактивная панель по клику) и `Message` (постоянный helper-текст), tooltip предназначен для некритичной поясняющей информации и плохо работает на touch-устройствах.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `tooltip` | `string \| undefined` | `undefined` | Текст подсказки — соответствует Figma-свойству `text-tooltip` |
| `position` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | Позиция подсказки относительно хост-элемента — соответствует Figma-свойству `position` (варианты `top`, `botton`, `left`, `right`) |
| `event` | `'hover' \| 'focus' \| 'both'` | `'hover'` | Событие, по которому показывается подсказка |
| `showDelay` | `number \| undefined` | `undefined` | Задержка перед появлением, мс |
| `hideDelay` | `number \| undefined` | `undefined` | Задержка перед скрытием, мс |
| `disabled` | `boolean` | `false` | Отключает подсказку |

## Variants

### Default (подсказка справа при наведении)

Figma: `<Tooltip>`, position=right — nodeId `24:1365`

```html
<extra-button extra-tooltip="Это текст подсказки" label="Наведи на меня"></extra-button>
```

### Position top (подсказка сверху)

Figma: `<Tooltip>`, position=top — nodeId `24:1368`

```html
<extra-button extra-tooltip="Подсказка сверху" position="top" label="Сверху"></extra-button>
```

### Position bottom (подсказка снизу)

Figma: `<Tooltip>`, position=botton — nodeId `24:1366`

```html
<extra-button extra-tooltip="Подсказка снизу" position="bottom" label="Снизу"></extra-button>
```

### Position left (подсказка слева)

Figma: `<Tooltip>`, position=left — nodeId `24:1367`

```html
<extra-button extra-tooltip="Подсказка слева" position="left" label="Слева"></extra-button>
```

### Показ по фокусу (event=focus)

Figma: `<Tooltip>` (общий компонент; событие задаётся в коде)

```html
<input type="text" extra-tooltip="Введите ваше имя" event="focus" placeholder="Кликни для фокуса" />
```

### С задержкой появления (showDelay)

Figma: `<Tooltip>` (общий компонент; задержка задаётся в коде)

```html
<extra-button
  extra-tooltip="Подсказка с задержкой 1с"
  [showDelay]="1000"
  label="Задержка появления (1с)"
></extra-button>
```

### Отключённая подсказка (disabled)

Figma: `<Tooltip>` (общий компонент; отключение задаётся в коде)

```html
<span extra-tooltip="Не покажется" [disabled]="true">Текст без подсказки</span>
```

## Slots

Не используются. Текст подсказки передаётся через `@Input() tooltip`; директива применяется к существующему хост-элементу.

## Related

- [ExtraButton](../button/button.figma.md) — частый хост-элемент для подсказки
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены подсказки

## Do / Don't

**Do:**
- Применяйте подсказку к icon-only кнопкам и неоднозначным иконкам для пояснения действия
- Используйте `position` для размещения подсказки там, где она не перекрывает важный контент
- Задавайте `[showDelay]` для элементов, по которым курсор часто проходит транзитом

**Don't:**
- Не размещайте в подсказке интерактивный контент (ссылки, кнопки, формы) — для этого используйте `Popover`
- Не передавайте критичную информацию только через tooltip — на touch-устройствах нет hover
- Не дублируйте в подсказке текст, который уже виден на форме
