# card

Angular: `src/lib/components/card` — `ExtraCardComponent`  
Figma-узлов: 1 — [Card](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1213-4134)

## Для разработчиков (Angular API)

**`ExtraCardComponent`** (`extra-card`, `src/lib/components/card/card.component.ts`)

- Inputs:
  - `@Input() title = ''`
  - `@Input() subtitle = ''`
  - `@Input() overlay = false`
- Слоты (ng-template):
  - `@ContentChild(PrimeTemplate) templates`

## Соответствие по Figma-узлам

### Card  ·  Figma nodeId `1213:4134`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1213-4134)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-footer` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-img` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-title` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-caption` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(PrimeTemplate)` → `templates` |

#### Для дизайнеров (Figma API)

- `↳ change-layout-footer` (INSTANCE_SWAP), default `13110:31679`
- `show-footer` (BOOLEAN), default `True`
- `change-layout-body` (INSTANCE_SWAP), default `13110:31679`
- `↳ change-img` (INSTANCE_SWAP), default `13110:31679`
- `show-caption` (BOOLEAN), default `True`
- `show-header` (BOOLEAN), default `True`
- `text-title` (TEXT), default `Title`
- `text-caption` (TEXT), default `Caption`
- `overlay` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `overlay` (Figma) ↔ `overlay` (Angular) | enum | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
