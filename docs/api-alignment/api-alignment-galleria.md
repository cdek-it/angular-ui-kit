# galleria

Angular: `src/lib/components/galleria` — `ExtraGalleriaComponent`  
Figma-узлов: 5 — [Galleria](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1200-385), [Galleria.Indicator](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1199-190), [Galleria.ThumbnailImage](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1202-1138), [Galleria.NavigatorButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1199-189), [Galleria.ThumbnailButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1202-56)

## Для разработчиков (Angular API)

**`ExtraGalleriaComponent`** (`extra-galleria`, `src/lib/components/galleria/galleria.component.ts`)

- Inputs:
  - `@Input() value: ExtraGalleriaItem[] = []`
  - `@Input() numVisible = 3`
  - `@Input() showItemNavigators = false`
  - `@Input() showItemNavigatorsOnHover = false`
  - `@Input() showThumbnails = true`
  - `@Input() showThumbnailNavigators = true`
  - `@Input() showIndicators = false`
  - `@Input() showIndicatorsOnItem = false`
  - `@Input() circular = false`
  - `@Input() autoPlay = false`
  - `@Input() transitionInterval = 4000`
  - `@Input() fullScreen = false`
  - `@Input() visible = false`
  - `@Input() containerClass: string | undefined = undefined`
  - `@Input() containerStyle: Record<string, string> | undefined = undefined`
  - `@Input() responsiveOptions: any[] | undefined = undefined`
- Outputs:
  - `@Output() activeIndexChange: number`
  - `@Output() visibleChange: boolean`
- Слоты (ng-template):
  - `@ContentChild(ExtraGalleriaItemDirective, read: TemplateRef) itemTemplate`
  - `@ContentChild(ExtraGalleriaThumbnailDirective, read: TemplateRef) thumbnailTemplate`
  - `@ContentChild(ExtraGalleriaCaptionDirective, read: TemplateRef) captionTemplate`
  - `@ContentChild(ExtraGalleriaIndicatorDirective, read: TemplateRef) indicatorTemplate`
  - `@ContentChild(ExtraGalleriaHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraGalleriaFooterDirective, read: TemplateRef) footerTemplate`

- Директивы:
  - `ExtraGalleriaItemDirective` (`[extraGalleriaItem]`)
  - `ExtraGalleriaThumbnailDirective` (`[extraGalleriaThumbnail]`)
  - `ExtraGalleriaCaptionDirective` (`[extraGalleriaCaption]`)
  - `ExtraGalleriaIndicatorDirective` (`[extraGalleriaIndicator]`)
  - `ExtraGalleriaHeaderDirective` (`[extraGalleriaHeader]`)
  - `ExtraGalleriaFooterDirective` (`[extraGalleriaFooter]`)

## Соответствие по Figma-узлам

### Galleria  ·  Figma nodeId `1200:385`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1200-385)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-indicators` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-thumbnail` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaThumbnailDirective)` → `thumbnailTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaCaptionDirective)` → `captionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaIndicatorDirective)` → `indicatorTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `show-button-nav` (BOOLEAN), default `True`
- `↳ show-caption` (BOOLEAN), default `True`
- `↳ change-layout-indicators` (INSTANCE_SWAP), default `13110:38261`
- `show-container-indicator` (BOOLEAN), default `True`
- `↳ show-indicators` (BOOLEAN), default `True`
- `show-container-thumbnail` (BOOLEAN), default `True`
- `↳ show-button-thumbnail` (BOOLEAN), default `True`
- `↳ change-layout-thumbnail` (INSTANCE_SWAP), default `13110:35196`
- `show-title` (BOOLEAN), default `True`
- `mask` (VARIANT): false | true, default `false`
- `orientation-image` (VARIANT): horizontal | vertical, default `horizontal`
- `position` (VARIANT): bottom | left, default `bottom`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `↳ show-indicators` (Figma) ↔ `showIndicators` (Angular) | boolean | именование отличается (Figma `↳ show-indicators` — kebab, Angular `showIndicators` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |

### Galleria.Indicator  ·  Figma nodeId `1199:190`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1199-190)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaThumbnailDirective)` → `thumbnailTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaCaptionDirective)` → `captionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaIndicatorDirective)` → `indicatorTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): background | active | hover, default `background`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Galleria.ThumbnailImage  ·  Figma nodeId `1202:1138`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1202-1138)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaThumbnailDirective)` → `thumbnailTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaCaptionDirective)` → `captionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaIndicatorDirective)` → `indicatorTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): hover | default, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Galleria.NavigatorButton  ·  Figma nodeId `1199:189`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1199-189)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaThumbnailDirective)` → `thumbnailTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaCaptionDirective)` → `captionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaIndicatorDirective)` → `indicatorTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `change-icon` (INSTANCE_SWAP), default `428:1959`
- `state` (VARIANT): default | hover | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Galleria.ThumbnailButton  ·  Figma nodeId `1202:56`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1202-56)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaThumbnailDirective)` → `thumbnailTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaCaptionDirective)` → `captionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaIndicatorDirective)` → `indicatorTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraGalleriaFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `change-icon` (INSTANCE_SWAP), default `428:1959`
- `state` (VARIANT): default | hover | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
