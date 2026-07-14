# badge

Angular: `src/lib/components/badge` — `ExtraBadgeComponent`  
Figma-узлов: 1 — [Badge](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=21-1193)

## Для разработчиков (Angular API)

**`ExtraBadgeComponent`** (`extra-badge`, `src/lib/components/badge/badge.component.ts`)

- Inputs:
  - `@Input() value: string | number = ''`
  - `@Input() severity: ExtraBadgeSeverity = 'primary'`
  - `@Input() size: ExtraBadgeSize = 'base'`

## Соответствие по Figma-узлам

### Badge  ·  Figma nodeId `21:1193`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=21-1193)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-badge` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `text-badge` (TEXT), default `Badge`
- `severity` (VARIANT): primary | info | success | warning | danger, default `primary`
- `dot` (VARIANT): false | true, default `false`
- `size` (VARIANT): base | large | xlarge, default `base`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraBadgeSeverity` | именование совпадает; значения: primary \| info \| success \| warning \| danger; дефолт совпадает: `primary` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraBadgeSize` | именование совпадает; значения: base \| large \| xlarge; дефолт совпадает: `base` |
