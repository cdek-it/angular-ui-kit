---
component: ExtraDialog
selector: extra-dialog
import:
  symbol: ExtraDialogComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'HOLKdvQJ8jCLeX17s9d0Yf'
  nodeId: '520:6620'
  componentKey: 'e22e66372cf0eaa8dae30d765325f4ed2b51ca42'
  name: '<Dialog>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraDialogComponent` — модальное диалоговое окно поверх основного контента страницы. Оборачивает PrimeNG `p-dialog` и расширяет его поддержкой структурных директив для кастомного заголовка и футера, а также типизированным свойством `size`.

Компонент соответствует Figma-компоненту `<Dialog>` (nodeId `520:6620`, fileKey `HOLKdvQJ8jCLeX17s9d0Yf`, библиотека «UI Kit (DS) v2.0»). Для программного открытия с произвольным содержимым используйте `ExtraDialogService` (см. Storybook «Dynamic»).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `header` | `string` | `''` | Строковый заголовок окна — игнорируется, если передан слот `*extraDialogHeader` |
| `[(visible)]` | `boolean` | `false` | Двусторонняя привязка видимости — `[visible]` открывает окно, `(visibleChange)` реагирует на закрытие крестиком или маской |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xlg'` | `'default'` | Ширина диалога — соответствует Figma-свойству `Modal Size` (sm → w-20, default/md → w-25, lg → w-30, xlg → w-45) |
| `modal` | `boolean` | `true` | Блокировать ли фон страницы затемнением — соответствует Figma-варианту `modal=true/false` |
| `dismissableMask` | `boolean` | `false` | Закрывать окно при клике на затемнённый фон |
| `closeOnEscape` | `boolean` | `true` | Закрывать окно по нажатию клавиши Escape |
| `showHeader` | `boolean` | `true` | Отображать ли панель заголовка — соответствует Figma-свойству `show-header` |
| `focusOnShow` | `boolean` | `false` | Переводить фокус на первый интерактивный элемент при открытии |
| `appendTo` | `string` | `'body'` | CSS-селектор или `'body'` — куда в DOM монтируется оверлей |

> `visibleChange` — `@Output() EventEmitter<boolean>`. Используйте синтаксис `[(visible)]` для двусторонней привязки.

## Variants

### Default / md (базовый диалог с футером)

Figma: `<Dialog>`, modal=true, size=default — nodeId `520:6572`

```html
<extra-dialog
  header="Подтверждение заявки"
  [(visible)]="isOpen"
>
  <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
  <ng-template extraDialogFooter>
    <extra-button variant="text" label="Отмена" (click)="isOpen = false"></extra-button>
    <extra-button label="Подтвердить" (click)="isOpen = false"></extra-button>
  </ng-template>
</extra-dialog>
```

```ts
import { ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

// В компоненте:
isOpen = false;
```

### Large с кастомным заголовком (extraDialogHeader)

Figma: `<Dialog>`, modal=true, size=lg, show-header=true

```html
<extra-dialog
  size="lg"
  [(visible)]="isOpen"
>
  <ng-template extraDialogHeader>
    <div class="flex items-center gap-2">
      <i class="ti ti-truck-delivery text-primary text-xl"></i>
      <span class="font-semibold">Детали отправления</span>
    </div>
  </ng-template>

  <p>Содержимое диалога с кастомным заголовком. Шаблон заменяет строковый проп <code>header</code>.</p>

  <ng-template extraDialogFooter>
    <extra-button variant="text" label="Закрыть" (click)="isOpen = false"></extra-button>
  </ng-template>
</extra-dialog>
```

```ts
import { ExtraDialogComponent, ExtraDialogHeaderDirective, ExtraDialogFooterDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
```

### С кнопками действий в футере (extraDialogFooter + деструктивное действие)

Figma: `<Dialog>`, modal=true, show-footer=true

```html
<extra-dialog
  header="Удаление записи"
  [(visible)]="isOpen"
>
  <p>Вы уверены, что хотите удалить эту запись? Действие необратимо.</p>
  <ng-template extraDialogFooter>
    <extra-button variant="text" label="Отмена" (click)="isOpen = false"></extra-button>
    <extra-button severity="danger" label="Удалить" (click)="onDelete()"></extra-button>
  </ng-template>
</extra-dialog>
```

```ts
import { ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
```

### Немодальный (non-modal)

Figma: `<Dialog>`, modal=false — nodeId `536:314`

Окно не блокирует фон и не показывает затемнение. Пользователь может взаимодействовать с остальным контентом страницы.

```html
<extra-dialog
  header="Маршрут доставки"
  [modal]="false"
  [(visible)]="isOpen"
>
  <p>Маршрут: Москва → Новосибирск. Это окно не блокирует основной контент.</p>
  <ng-template extraDialogFooter>
    <extra-button variant="text" label="Закрыть" (click)="isOpen = false"></extra-button>
  </ng-template>
</extra-dialog>
```

## Slots

| Слот | Синтаксис | Описание |
|------|-----------|---------|
| Тело (body) | `<ng-content>` | Произвольное содержимое диалога — размещается между заголовком и футером |
| Кастомный заголовок | `<ng-template extraDialogHeader>` | Заменяет строковый проп `header`; импортируйте `ExtraDialogHeaderDirective` из `'@cdek-it/angular-ui-kit'` |
| Кастомный футер | `<ng-template extraDialogFooter>` | Кнопки действий и прочий контент нижней части; импортируйте `ExtraDialogFooterDirective` из `'@cdek-it/angular-ui-kit'` |

Директивы `ExtraDialogHeaderDirective` и `ExtraDialogFooterDirective` экспортируются из `@cdek-it/angular-ui-kit` и объявляются как `standalone: true` — добавляйте их в массив `imports` компонента отдельно от `ExtraDialogComponent`.

## Related

- [Button](../button/button.figma.md) — кнопки действий в футере диалога
- [ConfirmDialog](../confirm-dialog/confirm-dialog.figma.md) — укороченный диалог подтверждения без произвольного тела
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены оверлея и поверхности
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Управляйте видимостью через `[(visible)]` — это сохраняет двустороннюю синхронизацию и корректно эмитит `visibleChange` при закрытии крестиком.
- Используйте `variant="primary"` для основного действия в футере, `severity="danger"` — для деструктивного.
- Размещайте не более 2 кнопок в футере: основное действие и «Отмена».
- Используйте `dismissableMask="true"` вместе с `modal="true"`, чтобы разрешить закрытие кликом по фону — это улучшает UX.

**Don't:**
- Не скрывайте диалог через `*ngIf` — всегда используйте `[(visible)]`; `*ngIf` уничтожает DOM и теряет состояние формы внутри.
- Не отключайте `closeOnEscape` без явной необходимости — это нарушает доступность (a11y) и ожидания пользователей.
- Не смешивайте строковый `header` и `*extraDialogHeader` одновременно — директива имеет приоритет и строковый проп будет проигнорирован.
