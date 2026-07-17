---
component: ToggleButtonComponent
selector: toggle-button
import:
  symbol: ToggleButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '174:1363'
  componentKey: '19f1388f80113907cee5bc24117e98c7d18eb16c'
  name: '<ToggleButton>'
status: stable
updated: '2026-06-23'
---

## Overview

`ToggleButtonComponent` — кнопка-переключатель с двумя состояниями (нажата / не нажата). Оборачивает PrimeNG `p-togglebutton` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`. Может менять подпись и иконку для включённого и выключенного состояний.

Компонент соответствует Figma-компоненту `<ToggleButton>` (nodeId `174:1363`). Figma-свойство `checked` маппируется на модель значения, а `state`, `size`, `icon-position` и `icon-only` — на Angular-инпуты (см. раздел Props mapping). Не путать с `ToggleSwitch` (свитч настройки, `role=switch`) и `SelectButton` (группа выбора одного из набора).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `onLabel` | `string` | `'Вкл'` | Текст во включённом состоянии — соответствует Figma-свойству `checked=true` |
| `offLabel` | `string` | `'Выкл'` | Текст в выключенном состоянии — соответствует Figma-свойству `checked=false` |
| `onIcon` | `string \| undefined` | `undefined` | CSS-класс иконки во включённом состоянии; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `offIcon` | `string \| undefined` | `undefined` | CSS-класс иконки в выключенном состоянии; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `iconPos` | `'left' \| 'right'` | `'left'` | Позиция иконки — соответствует Figma-свойству `icon-position` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер кнопки — соответствует Figma-свойству `size` |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-свойству `state=disabled` |
| `iconOnly` | `boolean` | `false` | Режим «только иконка» без текста — соответствует Figma-свойству `icon-only` |
| `allowEmpty` | `boolean \| undefined` | `undefined` | Разрешает снимать выбор повторным нажатием |
| `fluid` | `boolean` | `false` | Растяжение кнопки на всю ширину контейнера |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента с меткой для доступности |
| `inputId` | `string \| undefined` | `undefined` | Идентификатор внутреннего элемента; используется для связки с `<label for>` |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |
| `autofocus` | `boolean \| undefined` | `undefined` | Автофокус при монтировании компонента |

Состояние «нажата» (Figma-свойство `checked`) задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. Значение `true` / `false` соответствует `checked=true` / `checked=false` в Figma. Состояния `hover` и `focus` из Figma воспроизводятся браузером при наведении и фокусе и не имеют отдельных инпутов.

## Variants

### Off (выключена, по умолчанию)

Figma: `<ToggleButton>`, state=default, checked=false, icon-only=false

```html
<toggle-button onLabel="Вкл" offLabel="Выкл" [(ngModel)]="isOn"></toggle-button>
```

В реактивных формах эквивалентно:

```html
<toggle-button onLabel="Вкл" offLabel="Выкл" [formControl]="control"></toggle-button>
```

### On (включена)

Figma: `<ToggleButton>`, state=default, checked=true, icon-only=false

```html
<toggle-button onLabel="Вкл" offLabel="Выкл" [(ngModel)]="isOn"></toggle-button>
```

### С иконками (onIcon / offIcon)

Figma: `<ToggleButton>`, icon-position=left, checked=true/false

Классы иконок — из справочника [icons.md](../../figma-code-connect/icons.md).

```html
<toggle-button
  onLabel="Включено"
  offLabel="Выключено"
  onIcon="ti ti-check"
  offIcon="ti ti-x"
  iconPos="left"
  [(ngModel)]="isOn"
></toggle-button>
```

### Иконка справа (icon-position=right)

Figma: `<ToggleButton>`, icon-position=right

```html
<toggle-button
  onLabel="Включено"
  offLabel="Выключено"
  onIcon="ti ti-check"
  offIcon="ti ti-x"
  iconPos="right"
  [(ngModel)]="isOn"
></toggle-button>
```

### Только иконка (icon-only)

Figma: `<ToggleButton>`, icon-only=true, icon-position=null

```html
<toggle-button
  onIcon="ti ti-star-filled"
  offIcon="ti ti-star"
  [iconOnly]="true"
  ariaLabel="В избранное"
  [(ngModel)]="isOn"
></toggle-button>
```

### Размер large

Figma: `<ToggleButton>`, size=large

```html
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
  size="large"
  [(ngModel)]="isOn"
></toggle-button>
```

### Disabled (отключена)

Figma: `<ToggleButton>`, state=disabled

Отключённое состояние задаётся через `[disabled]="true"` либо через `FormControl` в состоянии `disabled`.

```html
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
  [disabled]="true"
  [(ngModel)]="isOn"
></toggle-button>
```

### Fluid (на всю ширину)

Figma: `<ToggleButton>`, size=base

```html
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
  [fluid]="true"
  [(ngModel)]="isOn"
></toggle-button>
```

## Slots

Не используются. Подписи и иконки задаются через `@Input` `onLabel` / `offLabel` / `onIcon` / `offIcon`.

## Related

- [ExtraButton](../button/button.figma.md) — кнопка-действие без двух состояний
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — выбор в форме с похожим маппингом состояния через модель
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`onIcon` / `offIcon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте состояние через модель (`[(ngModel)]`, `formControl` или `formControlName`) — это Figma-свойство `checked`
- Для режима `[iconOnly]="true"` всегда задавайте `ariaLabel` для доступности
- Используйте понятные пары `onLabel` / `offLabel`, отражающие включённое и выключенное состояния
- Для отключения предпочитайте `FormControl` в состоянии `disabled` либо `[disabled]="true"`
- Используйте `[fluid]="true"` в мобильных макетах и формах на всю ширину

**Don't:**
- Не задавайте «нажата» через отдельный атрибут — состояние идёт только через модель
- Не используйте `ToggleButton` для навигации по разделам — для этого есть `Tabs`
- Не подменяйте им `ToggleSwitch` (свитч настройки) или `SelectButton` (выбор из набора)
- Не передавайте `[iconOnly]="true"` без `onIcon` / `offIcon` — кнопка окажется пустой
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
