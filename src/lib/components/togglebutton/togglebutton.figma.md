---
component: ExtraToggleButton
selector: extra-togglebutton
import:
  symbol: ExtraToggleButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '174:1363'
  componentKey: '19f1388f80113907cee5bc24117e98c7d18eb16c'
  name: '<ToggleButton>'
status: stable
updated: '2026-10-02'
---

## Overview

`ExtraToggleButton` — кнопка-переключатель с двумя состояниями (нажата / не нажата). Оборачивает PrimeNG `p-togglebutton` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

В отличие от PrimeNG-демо с разными подписями на вкл/выкл, в Figma `label`/`icon` — **один** статический текст и одна иконка на обоих состояниях: меняется только цвет/заливка (`checked=true/false`), а не содержимое. Поэтому внутри компонент пробрасывает один и тот же `label`/`icon` одновременно в `onLabel`/`offLabel` и `onIcon`/`offIcon` PrimeNG — отдельных инпутов на разные подписи в публичном API нет.

Компонент соответствует Figma-компоненту `<ToggleButton>` (nodeId `174:1363`). Figma-свойство `checked` маппируется на модель значения, а `state`, `size`, `icon-position` и `icon-only` — на Angular-инпуты (см. раздел Props mapping). Не путать с `ToggleSwitch` (свитч настройки, `role=switch`) и `SelectButton` (группа выбора одного из набора).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст кнопки — один и тот же в обоих состояниях (Figma не меняет текст между `checked=true/false`, только заливку) |
| `icon` | `string` | `''` | CSS-класс иконки (tabler), один и тот же в обоих состояниях; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Позиция иконки — соответствует Figma-свойству `icon-position` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер кнопки — соответствует Figma-свойству `size` |
| `iconOnly` | `boolean` | `false` | Режим «только иконка» без текста — соответствует Figma-свойству `icon-only` |
| `allowEmpty` | `boolean \| undefined` | `undefined` | Разрешает снимать выбор повторным нажатием |
| `fluid` | `boolean` | `false` | Растяжение кнопки на всю ширину контейнера |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента с меткой для доступности |
| `inputId` | `string \| undefined` | `undefined` | Идентификатор внутреннего элемента; используется для связки с `<label for>` |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |
| `autofocus` | `boolean \| undefined` | `undefined` | Автофокус при монтировании компонента |

`allowEmpty`/`fluid`/`ariaLabel`/`ariaLabelledBy`/`inputId`/`tabindex`/`autofocus`/`iconOnly` — полезные
пропы сверх базовой спеки (`docs/components-api/togglebutton.md`), добавлены туда же по итогам
доработки (см. чеклист в корневом `CLAUDE.md`, п.3).

Состояние «нажата» (Figma-свойство `checked`) задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. Значение `true` / `false` соответствует `checked=true` / `checked=false` в Figma. Отключённое состояние (Figma `state=disabled`) задаётся не инпутом, а через форму — `setDisabledState` из `ControlValueAccessor` (как и `invalid`/`disabled` у остальных `extra-*`-полей, см. чеклист, п.5); отдельного `[disabled]` input на компоненте нет. Состояния `hover` и `focus` из Figma воспроизводятся браузером при наведении и фокусе и не имеют отдельных инпутов. Figma не показывает danger/invalid-вариант для этого компонента — `invalid` в спеке/API не заводился.

## Variants

### Off (выключена, по умолчанию)

Figma: `<ToggleButton>`, state=default, checked=false, icon-only=false

```html
<extra-togglebutton label="Подписка" [(ngModel)]="isOn"></extra-togglebutton>
```

В реактивных формах эквивалентно:

```html
<extra-togglebutton label="Подписка" [formControl]="control"></extra-togglebutton>
```

### On (включена)

Figma: `<ToggleButton>`, state=default, checked=true, icon-only=false

```html
<extra-togglebutton label="Подписка" [(ngModel)]="isOn"></extra-togglebutton>
```

### С иконкой

Figma: `<ToggleButton>`, icon-position=left, checked=true/false

Классы иконок — из справочника [icons.md](../../figma-code-connect/icons.md).

```html
<extra-togglebutton label="Избранное" icon="ti ti-star" iconPosition="left" [(ngModel)]="isOn"></extra-togglebutton>
```

### Иконка справа (icon-position=right)

Figma: `<ToggleButton>`, icon-position=right

```html
<extra-togglebutton label="Избранное" icon="ti ti-star" iconPosition="right" [(ngModel)]="isOn"></extra-togglebutton>
```

### Только иконка (icon-only)

Figma: `<ToggleButton>`, icon-only=true, icon-position=null

```html
<extra-togglebutton icon="ti ti-star" [iconOnly]="true" ariaLabel="В избранное" [(ngModel)]="isOn"></extra-togglebutton>
```

### Размер large

Figma: `<ToggleButton>`, size=large

```html
<extra-togglebutton label="Подписка" size="large" [(ngModel)]="isOn"></extra-togglebutton>
```

### Disabled (отключена)

Figma: `<ToggleButton>`, state=disabled

Отключённое состояние задаётся через `FormControl` в состоянии `disabled`, не через `@Input`:

```html
<extra-togglebutton label="Подписка" [formControl]="disabledControl"></extra-togglebutton>
```

### Fluid (на всю ширину)

Figma: `<ToggleButton>`, size=base

```html
<extra-togglebutton label="Подписка" [fluid]="true" [(ngModel)]="isOn"></extra-togglebutton>
```

## Slots

Не используются. Подпись и иконка задаются через `@Input` `label` / `icon`.

## Related

- [ExtraButton](../button/button.figma.md) — кнопка-действие без двух состояний
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — выбор в форме с похожим маппингом состояния через модель
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`icon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте состояние через модель (`[(ngModel)]`, `formControl` или `formControlName`) — это Figma-свойство `checked`
- Для режима `[iconOnly]="true"` всегда задавайте `ariaLabel` для доступности
- Используйте один и тот же `label`, описывающий действие/настройку, а не состояние («Подписка», а не «Вкл»/«Выкл»)
- Для отключения используйте `FormControl` в состоянии `disabled`
- Используйте `[fluid]="true"` в мобильных макетах и формах на всю ширину

**Don't:**
- Не задавайте «нажата» через отдельный атрибут — состояние идёт только через модель
- Не меняйте текст кнопки в зависимости от состояния (нет отдельных `onLabel`/`offLabel` — это осознанно, см. Overview)
- Не используйте `ToggleButton` для навигации по разделам — для этого есть `Tabs`
- Не подменяйте им `ToggleSwitch` (свитч настройки) или `SelectButton` (выбор из набора)
- Не передавайте `[iconOnly]="true"` без `icon` — кнопка окажется пустой
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
