# button

Angular: `src/lib/components/button` — `ExtraButtonComponent`  
Figma-узлов: 7 — [Button.Base](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=160-5223), [Button.Danger](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=162-5457), [Button.Info](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-9674), [Button.Success](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-8209), [Button.Warning](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-6741), [_❌Button.Badge](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=205-1453), [_Button](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=14456-3003)

## Для разработчиков (Angular API)

**`ExtraButtonComponent`** (`extra-button`, `src/lib/components/button/button.component.ts`)

- Inputs:
  - `@Input() label = 'Button'`
  - `@Input() variant: ExtraButtonVariant = 'primary'`
  - `@Input() severity: ExtraButtonSeverity = null`
  - `@Input() size: ExtraButtonSize = 'base'`
  - `@Input() rounded = false`
  - `@Input() iconPosition: ExtraButtonIconPosition = null`
  - `@Input() iconOnly = false`
  - `@Input() icon = ''`
  - `@Input() disabled = false`
  - `@Input() loading = false`
  - `@Input() badge = ''`
  - `@Input() badgeSeverity: ExtraBadgeSeverity = null`
  - `@Input() showBadge = false`
  - `@Input() fluid = false`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() autofocus = false`
  - `@Input() tabindex: number | undefined = undefined`
  - `@Input() text = false`

## Соответствие по Figma-узлам

### Button.Base  ·  Figma nodeId `160:5223`  ·  Button  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=160-5223)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1975`
- `text-button` (TEXT), default `Button`
- `variant` (VARIANT): primary | secondary | tertiary | text | link, default `primary`
- `state` (VARIANT): default | focus | hover | active | disabled | loading, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `rounded` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | prefix | postfix, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `icon-position` (Figma) ↔ `iconPosition` (Angular) | enum / `ExtraButtonIconPosition` | именование отличается (Figma `icon-position` — kebab, Angular `iconPosition` — camelCase); значения: null \| prefix \| postfix; дефолт совпадает: `null` |
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
| `variant` (Figma) ↔ `variant` (Angular) | enum / `ExtraButtonVariant` | именование совпадает; значения: primary \| secondary \| tertiary \| text \| link; дефолт совпадает: `primary` |

### Button.Danger  ·  Figma nodeId `162:5457`  ·  Button  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=162-5457)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1983`
- `text-button` (TEXT), default `Button`
- `variant` (VARIANT): basic | outlined | text, default `basic`
- `state` (VARIANT): default | focus | hover | active | disabled | loading, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `rounded` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | prefix | postfix, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `icon-position` (Figma) ↔ `iconPosition` (Angular) | enum / `ExtraButtonIconPosition` | именование отличается (Figma `icon-position` — kebab, Angular `iconPosition` — camelCase); значения: null \| prefix \| postfix; дефолт совпадает: `null` |
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
| `variant` (Figma) ↔ `variant` (Angular) | enum / `ExtraButtonVariant` | именование совпадает; значения: basic \| outlined \| text; ⚠️ дефолт отличается: Figma `basic` ↔ Angular `primary` |

### Button.Info  ·  Figma nodeId `429:9674`  ·  Button  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-9674)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1973`
- `text-button` (TEXT), default `Button`
- `variant` (VARIANT): basic | outlined | text, default `basic`
- `state` (VARIANT): default | focus | hover | active | disabled | loading, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `rounded` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | prefix | postfix, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `icon-position` (Figma) ↔ `iconPosition` (Angular) | enum / `ExtraButtonIconPosition` | именование отличается (Figma `icon-position` — kebab, Angular `iconPosition` — camelCase); значения: null \| prefix \| postfix; дефолт совпадает: `null` |
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
| `variant` (Figma) ↔ `variant` (Angular) | enum / `ExtraButtonVariant` | именование совпадает; значения: basic \| outlined \| text; ⚠️ дефолт отличается: Figma `basic` ↔ Angular `primary` |

### Button.Success  ·  Figma nodeId `429:8209`  ·  Button  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-8209)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1987`
- `text-button` (TEXT), default `Button`
- `variant` (VARIANT): basic | outlined | text, default `basic`
- `state` (VARIANT): default | focus | hover | active | disabled | loading, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `rounded` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | prefix | postfix, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `icon-position` (Figma) ↔ `iconPosition` (Angular) | enum / `ExtraButtonIconPosition` | именование отличается (Figma `icon-position` — kebab, Angular `iconPosition` — camelCase); значения: null \| prefix \| postfix; дефолт совпадает: `null` |
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
| `variant` (Figma) ↔ `variant` (Angular) | enum / `ExtraButtonVariant` | именование совпадает; значения: basic \| outlined \| text; ⚠️ дефолт отличается: Figma `basic` ↔ Angular `primary` |

### Button.Warning  ·  Figma nodeId `429:6741`  ·  Button  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=429-6741)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1977`
- `text-button` (TEXT), default `Button`
- `variant` (VARIANT): basic | outlined | text, default `basic`
- `state` (VARIANT): default | focus | hover | active | disabled | loading, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `rounded` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | prefix | postfix, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `icon-position` (Figma) ↔ `iconPosition` (Angular) | enum / `ExtraButtonIconPosition` | именование отличается (Figma `icon-position` — kebab, Angular `iconPosition` — camelCase); значения: null \| prefix \| postfix; дефолт совпадает: `null` |
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
| `variant` (Figma) ↔ `variant` (Angular) | enum / `ExtraButtonVariant` | именование совпадает; значения: basic \| outlined \| text; ⚠️ дефолт отличается: Figma `basic` ↔ Angular `primary` |

### _❌Button.Badge  ·  Figma nodeId `205:1453`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=205-1453)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `dot-badge` (VARIANT): false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |

### _Button  ·  Figma nodeId `14456:3003`  ·  Develop  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=14456-3003)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
