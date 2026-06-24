---
component: ExtraCarousel
selector: extra-carousel
import:
  symbol: ExtraCarouselComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1187:1633'
  componentKey: '53d6de43ff6801925f1478d66be13f779ea62f42'
  name: '<Carousel>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraCarousel` — компонент-карусель: прокручиваемая лента слайдов в одном контейнере. Контент сменяется по горизонтали или вертикали, со стрелками навигации prev/next, индикаторами-точками и опциональным autoplay. Оборачивает PrimeNG `p-carousel` и принимает массив данных через `@Input() value`, отрисовывая каждый элемент шаблоном из item-директивы.

Компонент соответствует Figma-компоненту `<Carousel>` (nodeId `1187:1633`) из библиотеки UI Kit (DS) v2.0. В отличие от `Galleria` (галерея изображений с превью-миниатюрами и lightbox) и `Tabs` (переключение разделов без прокрутки), carousel предназначен для просмотра коллекции равноуровневого контента — фото, продуктов, баннеров.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `any[]` | `[]` | Массив данных слайдов; каждый элемент отрисовывается item-шаблоном |
| `numVisible` | `number` | `1` | Количество одновременно видимых слайдов |
| `numScroll` | `number` | `1` | Количество слайдов, прокручиваемых за один шаг |
| `circular` | `boolean` | `false` | Зацикленный показ (после последнего слайда — первый) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Направление прокрутки |
| `autoplayInterval` | `number` | `0` | Интервал автопрокрутки в мс; `0` отключает autoplay |
| `showIndicators` | `boolean` | `true` | Показывать индикаторы-точки — соответствует Figma-свойству `show-indicators` |
| `showNavigators` | `boolean` | `true` | Показывать стрелки prev/next — соответствует Figma-свойству `show-button-nav` |
| `page` | `number` | `0` | Индекс текущей страницы (слайда) |
| `responsiveOptions` | `ExtraCarouselResponsiveOptions[] \| undefined` | `undefined` | Адаптивные настройки `numVisible`/`numScroll` по брейкпоинтам |
| `verticalViewPortHeight` | `string` | `'300px'` | Высота вьюпорта при `orientation="vertical"` |
| `onPage` | `EventEmitter<ExtraCarouselPageEvent>` | — | Событие смены страницы (слайда) |

## Variants

### Default (горизонтальная карусель, один видимый слайд)

Figma: `<Carousel>`, show-button-nav=true, show-indicators=true — nodeId `1187:1633`

```html
<extra-carousel [value]="products">
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
</extra-carousel>
```

### Несколько видимых слайдов (numVisible / numScroll)

Figma: `<Carousel>` (количество видимых слайдов задаётся в коде)

```html
<extra-carousel [value]="products" [numVisible]="3" [numScroll]="3">
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
</extra-carousel>
```

### Вертикальная карусель (orientation=vertical)

Figma: `<Carousel>`, orientation=vertical

```html
<extra-carousel
  [value]="products"
  orientation="vertical"
  verticalViewPortHeight="360px"
>
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
</extra-carousel>
```

### Автопрокрутка с зацикливанием (autoplay + circular)

Figma: `<Carousel>` (autoplay задаётся в коде)

```html
<extra-carousel
  [value]="banners"
  [autoplayInterval]="3000"
  [circular]="true"
>
  <ng-template extraCarouselItem let-banner>
    <img [src]="banner.src" [alt]="banner.alt" />
  </ng-template>
</extra-carousel>
```

### Без стрелок навигации (show-button-nav=false)

Figma: `<Carousel>`, show-button-nav=false

```html
<extra-carousel [value]="products" [showNavigators]="false">
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
</extra-carousel>
```

### Без индикаторов (show-indicators=false)

Figma: `<Carousel>`, show-indicators=false

```html
<extra-carousel [value]="products" [showIndicators]="false">
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
</extra-carousel>
```

## Slots

Содержимое карусели проектируется через структурные директивы на `<ng-template>`:

- **`extraCarouselItem`** (`ExtraCarouselItemDirective`) — обязательный шаблон одного слайда. Контекст `let-data` (`$implicit`) содержит текущий элемент из `value`.
- **`extraCarouselHeader`** (`ExtraCarouselHeaderDirective`) — необязательный шаблон шапки над лентой слайдов.
- **`extraCarouselFooter`** (`ExtraCarouselFooterDirective`) — необязательный шаблон подвала под лентой слайдов.

```html
<extra-carousel [value]="products">
  <ng-template extraCarouselHeader>
    <h3>Рекомендуем</h3>
  </ng-template>
  <ng-template extraCarouselItem let-product>
    <extra-card [title]="product.name"></extra-card>
  </ng-template>
  <ng-template extraCarouselFooter>
    <extra-button variant="text" label="Показать все"></extra-button>
  </ng-template>
</extra-carousel>
```

## Related

- [ExtraButton](../button/button.figma.md) — кнопка для действий в шапке/подвале карусели
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [Токены](../../figma-code-connect/tokens.md) — токены стрелок и индикаторов

## Do / Don't

**Do:**
- Используйте carousel для просмотра коллекции равноуровневого контента (фото, продукты, баннеры)
- Задавайте `[numVisible]` и `[numScroll]` вместе, чтобы прокрутка была кратна числу видимых слайдов
- Для адаптивности задавайте `responsiveOptions` вместо фиксированного `numVisible`
- При `orientation="vertical"` указывайте `verticalViewPortHeight` под высоту слайда

**Don't:**
- Не используйте carousel вместо `Galleria` для галереи изображений с миниатюрами и lightbox
- Не включайте `[autoplayInterval]` для контента, требующего чтения — пользователь не успеет
- Не скрывайте одновременно стрелки и индикаторы — у ленты не останется навигации
- Не размещайте интерактивные формы внутри autoplay-карусели — слайд сменится во время ввода
