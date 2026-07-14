# timeline

Angular: `src/lib/components/timeline` — `ExtraTimelineComponent`  
Figma-узлов: 4 — [Timeline](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-3325), [Timeline.ItemHorizontal](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-2017), [Timeline.ItemVertical](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-1500), [Timeline.Marker](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1080-771)

## Для разработчиков (Angular API)

**`ExtraTimelineComponent`** (`extra-timeline`, `src/lib/components/timeline/timeline.component.ts`)

- Inputs:
  - `@Input() value: any[] = []`
  - `@Input() align: 'left' | 'right' | 'alternate' | 'top' | 'bottom' = 'left'`
  - `@Input() layout: 'vertical' | 'horizontal' = 'vertical'`
  - `@Input() showCaption: boolean = true`
  - `@Input() line: ExtraTimelineLine = 'solid'`
  - `@Input() icon = ''`
  - `@Input() markerColor = ''`
- Слоты (ng-template):
  - `@ContentChild(ExtraTimelineContentDirective, read: TemplateRef) contentTemplate`
  - `@ContentChild(ExtraTimelineOppositeDirective, read: TemplateRef) oppositeTemplate`
  - `@ContentChild(ExtraTimelineMarkerDirective, read: TemplateRef) markerTemplate`

- Директивы:
  - `ExtraTimelineContentDirective` (`[extraTimelineContent]`)
  - `ExtraTimelineOppositeDirective` (`[extraTimelineOpposite]`)
  - `ExtraTimelineMarkerDirective` (`[extraTimelineMarker]`)

## Соответствие по Figma-узлам

### Timeline  ·  Figma nodeId `1090:3325`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-3325)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout-vertical` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-horizontal` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineContentDirective)` → `contentTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineOppositeDirective)` → `oppositeTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineMarkerDirective)` → `markerTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout-vertical` (INSTANCE_SWAP), default `13110:36319`
- `change-layout-horizontal` (INSTANCE_SWAP), default `13110:38261`
- `layout` (VARIANT): horizontal | vertical, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `layout` (Figma) ↔ `layout` (Angular) | enum / `'vertical' \| 'horizontal'` | именование совпадает; значения: horizontal \| vertical; ⚠️ дефолт отличается: Figma `horizontal` ↔ Angular `vertical` |

### Timeline.ItemHorizontal  ·  Figma nodeId `1090:2017`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-2017)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineContentDirective)` → `contentTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineOppositeDirective)` → `oppositeTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineMarkerDirective)` → `markerTemplate` |

#### Для дизайнеров (Figma API)

- `show-caption` (BOOLEAN), default `True`
- `align` (VARIANT): opposite | top | bottom, default `opposite`
- `line` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `align` (Figma) ↔ `align` (Angular) | enum / `'left' \| 'right' \| 'alternate' \| 'top' \| 'bottom'` | именование совпадает; значения: opposite \| top \| bottom; ⚠️ дефолт отличается: Figma `opposite` ↔ Angular `left` |
| `line` (Figma) ↔ `line` (Angular) | enum / `ExtraTimelineLine` | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `true` ↔ Angular `solid` |
| `show-caption` (Figma) ↔ `showCaption` (Angular) | boolean / `boolean` | именование отличается (Figma `show-caption` — kebab, Angular `showCaption` — camelCase); дефолт совпадает: `true` |

### Timeline.ItemVertical  ·  Figma nodeId `1090:1500`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1090-1500)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineContentDirective)` → `contentTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineOppositeDirective)` → `oppositeTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineMarkerDirective)` → `markerTemplate` |

#### Для дизайнеров (Figma API)

- `show-caption` (BOOLEAN), default `True`
- `align` (VARIANT): opposite | left | right, default `opposite`
- `line` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `align` (Figma) ↔ `align` (Angular) | enum / `'left' \| 'right' \| 'alternate' \| 'top' \| 'bottom'` | именование совпадает; значения: opposite \| left \| right; ⚠️ дефолт отличается: Figma `opposite` ↔ Angular `left` |
| `line` (Figma) ↔ `line` (Angular) | enum / `ExtraTimelineLine` | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `true` ↔ Angular `solid` |
| `show-caption` (Figma) ↔ `showCaption` (Angular) | boolean / `boolean` | именование отличается (Figma `show-caption` — kebab, Angular `showCaption` — camelCase); дефолт совпадает: `true` |

### Timeline.Marker  ·  Figma nodeId `1080:771`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1080-771)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineContentDirective)` → `contentTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineOppositeDirective)` → `oppositeTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraTimelineMarkerDirective)` → `markerTemplate` |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1987`
- `color` (VARIANT): primary | green | orange | red | purple | blue | gray, default `primary`
- `icon` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon` (Figma) ↔ `icon` (Angular) | enum | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `false` ↔ Angular `` |
