# Image

Обёртка над PrimeNG Image: изображение с предпросмотром (маска, тулбар, зум, поворот).

> **Эталон Figma отсутствует.** Компонент добавлен как обёртка над `p-image`; токены `components.image`
> собраны из семантического уровня и не сверяются с макетом. Подробности — `src/lib/components/image/image.figma.md`.

## Импорт

```typescript
import { ExtraImageComponent } from '@cdek-it/angular-ui-kit/components/image';
```

## Входы

| Вход | Тип | По умолчанию | Описание |
|---|---|---|---|
| `src` | `string` | — (обязательный) | URL изображения |
| `alt` | `string` | `''` | Альтернативный текст |
| `width` | `string` | `undefined` | Ширина (как HTML-атрибут) |
| `height` | `string` | `undefined` | Высота (как HTML-атрибут) |
| `preview` | `boolean` | `false` | Предпросмотр по клику |
| `imageClass` | `string` | `undefined` | CSS-класс изображения |
| `styleClass` | `string` | `undefined` | CSS-класс корневого элемента |

## Пример

```html
<extra-image src="assets/photo.jpg" alt="Фото" [preview]="true"></extra-image>
```

## Слоты панели предпросмотра

Иконки кнопок тулбара заменяются шаблонами `extraImageTemplate`:

| Слот | Кнопка |
|---|---|
| `rotateRightIcon` | поворот вправо |
| `rotateLeftIcon` | поворот влево |
| `zoomOutIcon` | уменьшить |
| `zoomInIcon` | увеличить |
| `closeIcon` | закрыть |

```html
<extra-image src="assets/photo.jpg" alt="Фото" [preview]="true">
  <ng-template extraImageTemplate="closeIcon"><i class="ti ti-x"></i></ng-template>
</extra-image>
```

Шаблоны импортируются через `ExtraImageTemplateDirective` из `@cdek-it/angular-ui-kit/components/image`.

## Доступность

`alt` обязателен по смыслу: без него изображение озвучивается как декоративное.
