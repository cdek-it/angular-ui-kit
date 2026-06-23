---
component: ExtraDrawer
selector: extra-drawer
import:
  symbol: ExtraDrawerComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '536:340'
  componentKey: '421d78d98d9918b17c1cad294fbedd0ea9747720'
  name: '<Drawer>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraDrawerComponent` — панель, выезжающая от края экрана (слева, справа, сверху или снизу) поверх основного контента. Используется для подзадач с сохранением контекста страницы: создание и редактирование через форму, просмотр деталей рядом со списком, фильтры и дополнительные параметры. Оборачивает PrimeNG `p-drawer` и расширяет его поддержкой структурных директив для кастомного заголовка и футера, а также типизированным свойством `size`.

Компонент соответствует Figma-компоненту `<Drawer>` (nodeId `536:340`, библиотека «UI Kit (DS) v2.0»). По умолчанию drawer модальный (со scrim). В отличие от `ExtraDialogComponent` (центральное модальное окно, прерывающее workflow), drawer крепится к краю экрана и сохраняет рабочий контекст.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `[(visible)]` | `boolean` | `false` | Двусторонняя привязка видимости — `[visible]` открывает панель, `(visibleChange)` реагирует на закрытие крестиком или маской |
| `header` | `string \| undefined` | `undefined` | Строковый заголовок панели — игнорируется, если передан слот `*extraDrawerHeader` |
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Край экрана, от которого выезжает панель — соответствует Figma-варианту `position` |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xlg'` | `'default'` | Размер панели — соответствует Figma-свойству `Modal Size` (ширина для left/right, высота для top/bottom) |
| `modal` | `boolean` | `true` | Блокировать ли фон страницы затемнением — соответствует Figma-варианту `modal=true/false` |
| `fullScreen` | `boolean` | `false` | Растягивать ли панель на весь экран |
| `dismissible` | `boolean` | `true` | Закрывать панель при клике на затемнённый фон |
| `showCloseIcon` | `boolean` | `true` | Отображать ли кнопку закрытия (крестик) |
| `closeOnEscape` | `boolean` | `true` | Закрывать панель по нажатию клавиши Escape |
| `blockScroll` | `boolean` | `true` | Блокировать прокрутку страницы, пока панель открыта |

> `visibleChange` — `@Output() EventEmitter<boolean>`. Используйте синтаксис `[(visible)]` для двусторонней привязки. Дополнительно компонент эмитит `onShow` и `onHide` (`EventEmitter<void>`) при открытии и закрытии.

## Variants

### Right (по умолчанию — выезд справа)

Figma: `<Drawer>`, modal=true, position=right — nodeId `538:343`

```html
<extra-drawer
  header="Детали отправления"
  [(visible)]="isOpen"
>
  <p>Маршрут: Москва → Новосибирск. Трек-номер CDEK-2025-00478312.</p>
</extra-drawer>
```

```ts
import { ExtraDrawerComponent } from '@cdek-it/angular-ui-kit';

// В компоненте:
isOpen = false;
```

### Left (выезд слева)

Figma: `<Drawer>`, modal=true, position=left — nodeId `536:339`

```html
<extra-drawer
  header="Фильтры"
  position="left"
  [(visible)]="isOpen"
>
  <p>Параметры фильтрации списка отправлений.</p>
</extra-drawer>
```

### Top (выезд сверху)

Figma: `<Drawer>`, modal=true, position=top — nodeId `538:404`

```html
<extra-drawer
  header="Уведомления"
  position="top"
  [(visible)]="isOpen"
>
  <p>Системные сообщения и оповещения.</p>
</extra-drawer>
```

### Bottom (выезд снизу)

Figma: `<Drawer>`, modal=true, position=bottom — nodeId `538:495`

```html
<extra-drawer
  header="Действия"
  position="bottom"
  [(visible)]="isOpen"
>
  <p>Дополнительные действия с выбранными отправлениями.</p>
</extra-drawer>
```

### Немодальный (non-modal)

Figma: `<Drawer>`, modal=false, position=right — nodeId `538:356`

Панель не блокирует фон и не показывает затемнение. Пользователь может взаимодействовать с остальным контентом страницы.

```html
<extra-drawer
  header="Подсказка"
  [modal]="false"
  [(visible)]="isOpen"
>
  <p>Эта панель не блокирует основной контент страницы.</p>
</extra-drawer>
```

### С кастомным заголовком и футером

Figma: `<Drawer>`, modal=true, show-header=true, show-footer=true

```html
<extra-drawer [(visible)]="isOpen">
  <ng-template extraDrawerHeader>
    <div class="flex items-center gap-2">
      <span class="font-semibold">Редактирование заявки</span>
    </div>
  </ng-template>

  <p>Форма редактирования заявки на доставку.</p>

  <ng-template extraDrawerFooter>
    <extra-button variant="text" label="Отмена" (click)="isOpen = false"></extra-button>
    <extra-button label="Сохранить" (click)="onSave()"></extra-button>
  </ng-template>
</extra-drawer>
```

```ts
import { ExtraDrawerComponent, ExtraDrawerHeaderDirective, ExtraDrawerFooterDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
```

## Slots

| Слот | Синтаксис | Описание |
|------|-----------|---------|
| Тело (body) | `<ng-content>` | Произвольное содержимое панели — размещается между заголовком и футером |
| Кастомный заголовок | `<ng-template extraDrawerHeader>` | Заменяет строковый проп `header`; импортируйте `ExtraDrawerHeaderDirective` из `'@cdek-it/angular-ui-kit'` |
| Кастомный футер | `<ng-template extraDrawerFooter>` | Кнопки действий и прочий контент нижней части; импортируйте `ExtraDrawerFooterDirective` из `'@cdek-it/angular-ui-kit'` |

Директивы `ExtraDrawerHeaderDirective` и `ExtraDrawerFooterDirective` экспортируются из `@cdek-it/angular-ui-kit` и объявляются как `standalone: true` — добавляйте их в массив `imports` компонента отдельно от `ExtraDrawerComponent`.

## Related

- [Dialog](../dialog/dialog.figma.md) — центральное модальное окно, прерывающее workflow
- [Button](../button/button.figma.md) — кнопки действий в футере панели
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены оверлея и поверхности
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Управляйте видимостью через `[(visible)]` — это сохраняет двустороннюю синхронизацию и корректно эмитит `visibleChange` при закрытии крестиком или маской.
- Используйте drawer для подзадач, где важно сохранить контекст страницы (формы, детали, фильтры).
- Размещайте основное действие и «Отмена» в футере через `*extraDrawerFooter`.
- Используйте `position="right"` для деталей и форм, `position="left"` — для фильтров и навигационных параметров.

**Don't:**
- Не скрывайте панель через `*ngIf` — всегда используйте `[(visible)]`; `*ngIf` уничтожает DOM и теряет состояние формы внутри.
- Не используйте drawer вместо `ExtraDialog` для коротких прерывающих подтверждений — для них предназначен центральный диалог.
- Не смешивайте строковый `header` и `*extraDrawerHeader` одновременно — директива имеет приоритет, и строковый проп будет проигнорирован.
- Не отключайте `closeOnEscape` без явной необходимости — это нарушает доступность (a11y) и ожидания пользователей.
