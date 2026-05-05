# InputNumber Component — Design Spec

**Date:** 2026-04-16  
**Branch:** `form.inputnumber` (to be created)  
**Reference:** [Vue InputNumber](https://github.com/cdek-it/vue-ui-kit/tree/form.InputNumber/src/plugins/prime/stories/Form/InputNumber)

---

## Overview

Angular wrapper component for PrimeNG `InputNumber`, following the same patterns as `InputTextComponent`. Provides a styled numeric input with optional increment/decrement buttons, currency formatting, and min/max/step constraints. Integrates with Angular Forms via `ControlValueAccessor`.

---

## File Structure

```
src/lib/components/inputnumber/
  inputnumber.component.ts

src/prime-preset/tokens/components/
  inputnumber.ts                          ← new CSS override file

src/prime-preset/
  map-tokens.ts                           ← add inputnumber CSS

src/stories/components/inputnumber/
  inputnumber.stories.ts
  examples/
    inputnumber-float-label.component.ts
    inputnumber-currency.component.ts
    inputnumber-minmax.component.ts
```

---

## Component API (`InputNumberComponent`)

**Selector:** `input-number`  
**Standalone:** yes  
**CVA value type:** `number | null`

### Inputs

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля |
| `placeholder` | `string` | `''` | Подсказка при пустом поле |
| `disabled` | `boolean` | `false` | Отключает взаимодействие |
| `readonly` | `boolean` | `false` | Только для чтения |
| `invalid` | `boolean` | `false` | Невалидное состояние |
| `showButtons` | `boolean` | `true` | Показывать кнопки +/− |
| `buttonLayout` | `'horizontal' \| 'vertical' \| 'stacked'` | `'horizontal'` | Расположение кнопок |
| `mode` | `'decimal' \| 'currency'` | `'decimal'` | Режим отображения |
| `currency` | `string` | `'RUB'` | Код валюты (ISO 4217) при `mode="currency"` |
| `locale` | `string` | `'ru-RU'` | Локаль форматирования |
| `prefix` | `string \| undefined` | `undefined` | Префикс перед значением |
| `suffix` | `string \| undefined` | `undefined` | Суффикс после значения |
| `min` | `number \| undefined` | `undefined` | Минимальное значение |
| `max` | `number \| undefined` | `undefined` | Максимальное значение |
| `step` | `number` | `1` | Шаг изменения |
| `minFractionDigits` | `number` | `0` | Мин. знаков после запятой |
| `maxFractionDigits` | `number` | `20` | Макс. знаков после запятой |
| `fluid` | `boolean` | `false` | Растягивает на всю ширину |

### Size mapping

| `size` | `pSize` (PrimeNG) | CSS class |
|---|---|---|
| `'small'` | `'small'` | — |
| `'base'` | `undefined` | — |
| `'large'` | `'large'` | — |
| `'xlarge'` | `'large'` | `p-inputnumber-xlg` (on host) |

The `p-inputnumber-xlg` class is applied via `[ngClass]` on the `p-inputnumber` element so CSS cascade can target `.p-inputnumber-xlg .p-inputnumber-input`.

### Icons

Increment button: `<i class="ti ti-plus"></i>` via `#incrementicon` ng-template.  
Decrement button: `<i class="ti ti-minus"></i>` via `#decrementicon` ng-template.

### CVA

- `writeValue(v: number | null)` — stores to `modelValue`
- `registerOnChange` / `registerOnTouched` — standard
- `setDisabledState` — sets `disabled`
- `onValueChange(v: number | null)` — called on PrimeNG `(onInput)` event, calls `_onChange`

---

## CSS Overrides (`src/prime-preset/tokens/components/inputnumber.ts`)

```typescript
export const inputnumberCss = ({ dt }) => `
  .p-inputnumber-button {
    border-width: ${dt('inputnumber.extend.borderWidth')};
  }

  .p-inputnumber-horizontal .p-inputnumber-button {
    min-height: ${dt('inputnumber.extend.extButton.height')};
  }

  .p-inputnumber-horizontal:has(.p-inputnumber-input:disabled) .p-inputnumber-button {
    background: ${dt('inputtext.root.disabledBackground')};
    color: ${dt('inputtext.root.disabledColor')};
  }

  .p-inputnumber.p-inputnumber-xlg .p-inputnumber-input {
    font-size: ${dt('inputtext.extend.extXlg.fontSize')};
    padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
  }
`;
```

---

## map-tokens.ts

Add import and entry:

```typescript
import { inputnumberCss } from './tokens/components/inputnumber';

// in components:
inputnumber: {
  ...(tokens.components.inputnumber as unknown as ComponentsDesignTokens['inputnumber']),
  css: inputnumberCss,
},
```

---

## Stories

### `inputnumber.stories.ts`

- `meta`: `title: 'Components/Form/InputNumber'`, `component: InputNumberComponent`, `tags: ['autodocs']`
- `argTypes`: all props from API table above
- `args`: defaults from API table
- `Default` story: dynamic template built from args (same pattern as InputText Default)
- Re-exports: `FloatLabel`, `Currency`, `MinMax`

### `examples/inputnumber-float-label.component.ts`

Uses native `p-inputnumber` (not the wrapper) as direct child of `p-floatlabel variant="in"`, because PrimeNG FloatLabel CSS relies on sibling selectors that don't work through wrapper components. Shows `showButtons`, `buttonLayout="horizontal"`, Tabler icon templates. `controls: { disable: true }`.

### `examples/inputnumber-currency.component.ts`

Pure `StoryObj` (no `@Component`), `render: (args) => ({ props: { ...args, value: null }, template })`. Args preset: `mode: 'currency'`, `currency: 'RUB'`, `locale: 'ru-RU'`. All other props bound through Controls.

### `examples/inputnumber-minmax.component.ts`

Pure `StoryObj`. Args preset: `min: 0`, `max: 100`, `step: 1`. Shows constraint behaviour.

---

## Constraints

- No `styles: [...]` in Angular `@Component` decorator — use `const styles = ''` (webpack base64 path bug)
- Storybook story layout: Tailwind classes only, no inline `style="..."`
- Float label: always use native `p-inputnumber` directly — never the wrapper component — inside `p-floatlabel`
- Default story must build template dynamically from args so the code snippet updates with Controls
- `source.code` in float-label example should not include the outer `<div class="pt-6">` wrapper
