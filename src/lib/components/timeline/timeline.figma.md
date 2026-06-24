---
component: ExtraTimeline
selector: extra-timeline
import:
  symbol: ExtraTimelineComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1090:3325'
  componentKey: '333455156cc12cb69676f82e164038b8b1174f64'
  name: '<Timeline>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraTimeline` — компонент для визуализации последовательности событий в хронологическом порядке: ось с маркерами-точками, коннекторами-линиями, основным и опциональным противоположным контентом (дата/время). Компонент data-driven: события передаются массивом через `@Input() value`, а отрисовка содержимого, противоположной стороны и маркера настраивается через контент-шаблоны. Оборачивает PrimeNG `p-timeline`.

Компонент соответствует Figma-компоненту `<Timeline>` (nodeId `1090:3325`) из библиотеки UI Kit (DS) v2.0. В отличие от `Stepper` (управление прохождением wizard) и `Steps` (прогресс по этапам задачи), `Timeline` отображает ленту уже произошедших или запланированных событий и не управляет процессом.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `any[]` | `[]` | Массив событий для отображения; каждое событие доступно в контент-шаблонах через контекст `let-event` |
| `align` | `'left' \| 'right' \| 'alternate' \| 'top' \| 'bottom'` | `'left'` | Положение контента относительно оси; для вертикального layout — `left`/`right`/`alternate`, для горизонтального — `top`/`bottom`/`alternate` |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Ориентация ленты — соответствует Figma-свойству `layout` (варианты `vertical`, `horizontal`) |
| `showCaption` | `boolean` | `true` | Показывать ли противоположный (caption) контент; при `false` слот `extraTimelineOpposite` не отрисовывается |
| `line` | `'solid' \| 'dashed' \| 'dotted' \| 'none'` | `'solid'` | Стиль коннектора-линии между маркерами |
| `icon` | `string` | `''` | CSS-класс иконки маркера по умолчанию (например `'pi pi-check'`); доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `markerColor` | `string` | `''` | Цвет маркера; задаётся токеном, см. [tokens.md](../../figma-code-connect/tokens.md) |

## Variants

### Vertical (вертикальная ось, по умолчанию)

Figma: `<Timeline>`, layout=vertical — nodeId `1090:3317`

```html
<extra-timeline [value]="events">
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
</extra-timeline>
```

### Horizontal (горизонтальная ось)

Figma: `<Timeline>`, layout=horizontal — nodeId `1090:3318`

```html
<extra-timeline [value]="events" layout="horizontal" align="top">
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
</extra-timeline>
```

### Alternate (контент по обе стороны оси)

Figma: `<Timeline>` (общий компонент; чередование задаётся в коде через `align`)

```html
<extra-timeline [value]="events" align="alternate">
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
</extra-timeline>
```

### С противоположным контентом (caption)

Figma: `<Timeline>` (противоположная сторона — дата/время)

```html
<extra-timeline [value]="events">
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
  <ng-template extraTimelineOpposite let-event>{{ event.caption }}</ng-template>
</extra-timeline>
```

### С кастомным маркером

Figma: `<Timeline>` (маркер задаётся в коде через шаблон или `icon`)

```html
<extra-timeline [value]="events" icon="pi pi-check">
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
  <ng-template extraTimelineMarker let-event>
    <span class="custom-marker"><i [class]="event.icon"></i></span>
  </ng-template>
</extra-timeline>
```

## Slots

Содержимое проектируется через контент-директивы, применяемые к `<ng-template>` внутри компонента; каждый шаблон получает текущее событие через контекст `let-event`:

- **`extraTimelineContent`** — основной контент события. Если не задан, выводится строковое значение события.
- **`extraTimelineOpposite`** — контент с противоположной стороны оси (дата/время). Отрисовывается только при `showCaption=true`.
- **`extraTimelineMarker`** — кастомный маркер события. Если не задан, используется маркер по умолчанию с иконкой из `@Input() icon`.

## Related

- [ExtraButton](../button/button.figma.md) — кнопки действий рядом с лентой событий
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки маркеров (`pi pi-*`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены маркера и линии
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `layout="vertical"` для длинных хронологий и историй изменений; `layout="horizontal"` — для коротких этапов на широком экране
- Передавайте дату/время через `extraTimelineOpposite` как вторичный контент
- Задавайте `align="alternate"` для симметричного размещения контента по обе стороны оси
- Используйте `extraTimelineMarker` или `icon` для персонализации маркера по типу события — см. [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте `Timeline` для управления прохождением процесса — для wizard применяйте `Stepper`, для прогресса по задаче — `Steps`
- Не задавайте вертикальные значения `align` (`left`/`right`) при `layout="horizontal"` — используйте `top`/`bottom`
- Не инлайньте цвет маркера напрямую — задавайте `markerColor` токеном из [tokens.md](../../figma-code-connect/tokens.md)
- Не дублируйте основной контент в `extraTimelineOpposite` — противоположная сторона предназначена для вторичной информации
