# carousel

Angular: `src/lib/components/carousel` — `ExtraCarouselComponent`  
Figma-узлов: 2 — [Carousel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1187-1633), [Carousel.Indicator](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1187-1404)

## Для разработчиков (Angular API)

**`ExtraCarouselComponent`** (`extra-carousel`, `src/lib/components/carousel/carousel.component.ts`)

- Inputs:
  - `@Input() value: any[] = []`
  - `@Input() numVisible = 1`
  - `@Input() numScroll = 1`
  - `@Input() circular = false`
  - `@Input() orientation: ExtraCarouselOrientation = 'horizontal'`
  - `@Input() autoplayInterval = 0`
  - `@Input() showIndicators = true`
  - `@Input() showNavigators = true`
  - `@Input() page = 0`
  - `@Input() responsiveOptions: ExtraCarouselResponsiveOptions[] | undefined`
  - `@Input() verticalViewPortHeight = '300px'`
- Outputs:
  - `@Output() onPage: ExtraCarouselPageEvent`
- Слоты (ng-template):
  - `@ContentChild(ExtraCarouselItemDirective, read: TemplateRef) itemTemplate`
  - `@ContentChild(ExtraCarouselHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraCarouselFooterDirective, read: TemplateRef) footerTemplate`

- Директивы:
  - `ExtraCarouselItemDirective` (`[extraCarouselItem]`)
  - `ExtraCarouselHeaderDirective` (`[extraCarouselHeader]`)
  - `ExtraCarouselFooterDirective` (`[extraCarouselFooter]`)

## Соответствие по Figma-узлам

### Carousel  ·  Figma nodeId `1187:1633`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1187-1633)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout-content` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-indicators` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout-content` (INSTANCE_SWAP), default `13110:38261`
- `↳ change-layout-indicators` (INSTANCE_SWAP), default `13110:38261`
- `show-button-nav` (BOOLEAN), default `True`
- `show-indicators` (BOOLEAN), default `True`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `show-indicators` (Figma) ↔ `showIndicators` (Angular) | boolean | именование отличается (Figma `show-indicators` — kebab, Angular `showIndicators` — camelCase); дефолт совпадает: `true` |

### Carousel.Indicator  ·  Figma nodeId `1187:1404`  ·  Media  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1187-1404)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselItemDirective)` → `itemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraCarouselFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
