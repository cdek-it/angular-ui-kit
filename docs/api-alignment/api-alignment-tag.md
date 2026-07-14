# tag

Angular: `src/lib/components/tag` — `ExtraTagComponent`  
Figma-узлов: 1 — [Tag](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=21-1238)

## Для разработчиков (Angular API)

**`ExtraTagComponent`** (`extra-tag`, `src/lib/components/tag/tag.component.ts`)

- Inputs:
  - `@Input() value = ''`
  - `@Input() severity: ExtraTagSeverity = 'primary'`
  - `@Input() rounded = false`
  - `@Input() icon = ''`

## Соответствие по Figma-узлам

### Tag  ·  Figma nodeId `21:1238`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=21-1238)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-tag` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-tag` (TEXT), default `Tag`
- `severity` (VARIANT): info | success | warning | danger | secondary | primary, default `primary`
- `rounded` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `rounded` (Figma) ↔ `rounded` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraTagSeverity` | именование совпадает; значения: info \| success \| warning \| danger \| secondary \| primary; дефолт совпадает: `primary` |
