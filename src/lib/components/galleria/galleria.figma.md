---
component: ExtraGalleria
selector: extra-galleria
import:
  symbol: ExtraGalleriaComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1200:385'
  componentKey: '11b7fe5571d386f90ed9e309c8214d0bf95aec53'
  name: '<Galleria>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraGalleriaComponent` — галерея изображений с полосой превью (thumbnails) и полноэкранным просмотром (lightbox): крупное активное изображение со стрелками prev/next, подписью (caption), индикаторами и опциональным autoplay-слайдшоу. Оборачивает PrimeNG `p-galleria` и принимает коллекцию изображений через `@Input() value`, а содержимое каждого слайда задаётся структурными директивами-шаблонами.

Компонент соответствует Figma-компоненту `<Galleria>` (nodeId `1200:385`, библиотека «UI Kit (DS) v2.0»). В отличие от `Carousel` (лента любого контента без lightbox и полосы превью) и `Image` (показ одного изображения), Galleria управляет коллекцией изображений с навигацией и увеличением.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `ExtraGalleriaItem[]` | `[]` | Коллекция изображений (`itemImageSrc`, `thumbnailImageSrc?`, `alt?`, `title?`, `description?`) |
| `numVisible` | `number` | `3` | Количество одновременно видимых миниатюр в полосе превью |
| `showItemNavigators` | `boolean` | `false` | Показывать стрелки prev/next у активного изображения — соответствует Figma-свойству `show-button-nav` |
| `showItemNavigatorsOnHover` | `boolean` | `false` | Показывать стрелки навигации только при наведении |
| `showThumbnails` | `boolean` | `true` | Показывать полосу миниатюр — соответствует Figma-свойству `show-container-thumbnail` |
| `showThumbnailNavigators` | `boolean` | `true` | Показывать стрелки прокрутки полосы миниатюр — соответствует Figma-свойству `show-button-thumbnail` |
| `showIndicators` | `boolean` | `false` | Показывать индикаторы текущего слайда — соответствует Figma-свойству `show-Indicators` |
| `showIndicatorsOnItem` | `boolean` | `false` | Накладывать индикаторы поверх изображения, а не под ним |
| `circular` | `boolean` | `false` | Циклический переход от последнего слайда к первому |
| `autoPlay` | `boolean` | `false` | Автоматическое воспроизведение слайдшоу |
| `transitionInterval` | `number` | `4000` | Интервал смены изображений в мс (действует при `autoPlay`) |
| `fullScreen` | `boolean` | `false` | Полноэкранный режим (lightbox) — соответствует Figma-варианту `mask=true` |
| `[(visible)]` | `boolean` | `false` | Двусторонняя привязка видимости в полноэкранном режиме — `[visible]` открывает lightbox, `(visibleChange)` реагирует на закрытие |
| `containerClass` | `string \| undefined` | `undefined` | Дополнительный CSS-класс на контейнере галереи |
| `containerStyle` | `Record<string, string> \| undefined` | `undefined` | Inline-стили контейнера галереи |
| `responsiveOptions` | `any[] \| undefined` | `undefined` | Адаптивная конфигурация `numVisible` по брейкпоинтам |

> `activeIndexChange` — `@Output() EventEmitter<number>` (смена активного слайда); `visibleChange` — `@Output() EventEmitter<boolean>`. Используйте синтаксис `[(visible)]` для двусторонней привязки в полноэкранном режиме.

## Variants

### Default (навигация и индикаторы без миниатюр)

Figma: `<Galleria>`, mask=false, orientation-image=horizontal — nodeId `1200:384`

```html
<extra-galleria
  [value]="images"
  [numVisible]="5"
  [showItemNavigators]="true"
  [showIndicators]="true"
  [showThumbnails]="false"
  [circular]="true"
>
  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>
</extra-galleria>
```

### С миниатюрами (thumbnails)

Figma: `<Galleria>`, show-container-thumbnail=true — nodeId `1200:384`

```html
<extra-galleria
  [value]="images"
  [numVisible]="5"
  [showItemNavigators]="true"
  [showThumbnails]="true"
  [circular]="true"
>
  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>
  <ng-template extraGalleriaThumbnail let-item>
    <img [src]="item.thumbnailImageSrc" [alt]="item.alt" />
  </ng-template>
</extra-galleria>
```

### С индикаторами (indicators)

Figma: `<Galleria>`, show-container-Indicator=true, show-Indicators=true — nodeId `1200:384`

```html
<extra-galleria
  [value]="images"
  [showItemNavigators]="true"
  [showThumbnails]="false"
  [showIndicators]="true"
  [circular]="true"
>
  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>
</extra-galleria>
```

### Полноэкранный режим (fullscreen / lightbox)

Figma: `<Galleria>`, mask=true, orientation-image=horizontal — nodeId `1200:383`

```html
<extra-button label="Открыть галерею" (click)="isOpen = true"></extra-button>

<extra-galleria
  [value]="images"
  [numVisible]="5"
  [showItemNavigators]="true"
  [showThumbnails]="true"
  [circular]="true"
  [fullScreen]="true"
  [(visible)]="isOpen"
>
  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>
  <ng-template extraGalleriaThumbnail let-item>
    <img [src]="item.thumbnailImageSrc" [alt]="item.alt" />
  </ng-template>
</extra-galleria>
```

```ts
import { ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaThumbnailDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

// В компоненте:
isOpen = false;
```

### Автовоспроизведение (autoplay)

Figma: `<Galleria>` (общий компонент; autoplay задаётся в коде)

```html
<extra-galleria
  [value]="images"
  [showItemNavigators]="true"
  [showIndicators]="true"
  [showThumbnails]="false"
  [circular]="true"
  [autoPlay]="true"
  [transitionInterval]="3000"
>
  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>
</extra-galleria>
```

## Slots

Содержимое каждой части галереи проектируется через структурные директивы-шаблоны `ng-template`. Все директивы экспортируются из `@cdek-it/angular-ui-kit`, объявлены как `standalone: true` и добавляются в массив `imports` компонента отдельно от `ExtraGalleriaComponent`.

| Слот | Синтаксис | Контекст | Описание |
|------|-----------|----------|---------|
| Изображение | `<ng-template extraGalleriaItem let-item>` | `$implicit: item` | Шаблон активного (крупного) изображения слайда |
| Миниатюра | `<ng-template extraGalleriaThumbnail let-item>` | `$implicit: item` | Шаблон миниатюры в полосе превью |
| Подпись | `<ng-template extraGalleriaCaption let-item>` | `$implicit: item` | Подпись (caption) к активному изображению — соответствует Figma-свойству `show-caption` |
| Индикатор | `<ng-template extraGalleriaIndicator let-index>` | `$implicit: index` | Кастомный индикатор слайда (требует `[showIndicators]="true"`) |
| Шапка | `<ng-template extraGalleriaHeader>` | — | Содержимое над галереей |
| Подвал | `<ng-template extraGalleriaFooter>` | — | Содержимое под галереей |

Соответствующие директивы: `ExtraGalleriaItemDirective`, `ExtraGalleriaThumbnailDirective`, `ExtraGalleriaCaptionDirective`, `ExtraGalleriaIndicatorDirective`, `ExtraGalleriaHeaderDirective`, `ExtraGalleriaFooterDirective`.

```html
<extra-galleria [value]="images" [showIndicators]="true" [showThumbnails]="false">
  <ng-template extraGalleriaHeader>
    <span class="font-bold">Галерея СДЭК</span>
  </ng-template>

  <ng-template extraGalleriaItem let-item>
    <img [src]="item.itemImageSrc" [alt]="item.alt" />
  </ng-template>

  <ng-template extraGalleriaCaption let-item>
    <h4>{{ item.title }}</h4>
    <p>{{ item.description }}</p>
  </ng-template>

  <ng-template extraGalleriaIndicator let-index>
    <span class="indicator-dot"></span>
  </ng-template>

  <ng-template extraGalleriaFooter>
    <span>Переключайте изображения стрелками</span>
  </ng-template>
</extra-galleria>
```

## Related

- [Button](../button/button.figma.md) — кнопка для открытия галереи в полноэкранном режиме
- [Dialog](../dialog/dialog.figma.md) — альтернативный оверлей для произвольного модального содержимого
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены оверлея, навигации и индикаторов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Всегда задавайте `extraGalleriaItem` — без него активное изображение не отрисуется.
- Заполняйте `thumbnailImageSrc` в элементах `value`, если используете `[showThumbnails]="true"`.
- Управляйте полноэкранным режимом через `[(visible)]` — это сохраняет двустороннюю синхронизацию при закрытии lightbox.
- Указывайте `alt` у каждого изображения для доступности (a11y).

**Don't:**
- Не используйте Galleria для ленты разнородного контента — для этого предназначен `Carousel`.
- Не включайте `[autoPlay]="true"` без `[circular]="true"` — слайдшоу остановится на последнем кадре.
- Не задавайте `[showIndicators]="false"` вместе с шаблоном `extraGalleriaIndicator` — индикаторы не появятся.
- Не подменяйте Galleria компонентом `Image`, когда нужно показать одно изображение без навигации.
