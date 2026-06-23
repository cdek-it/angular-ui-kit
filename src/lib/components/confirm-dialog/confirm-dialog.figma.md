---
component: ExtraConfirmDialog
selector: extra-confirm-dialog
import:
  symbol: ExtraConfirmDialogComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '520:6928'
  componentKey: 'e1f6d8c2a20ec5d1f54b0936b7ce81e9345c3943'
  name: '<ConfirmDialog>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraConfirmDialogComponent` — модальное окно подтверждения действия (`role=alertdialog`): прерывает пользователя вопросом и требует явного ответа «подтвердить / отменить». В отличие от `ExtraDialog`, оно не принимает произвольного тела — содержимое (заголовок, текст, подписи кнопок, иконка) задаётся декларативно через `ExtraConfirmDialogService.confirm(...)`. Компонент оборачивает PrimeNG `p-confirmDialog` и расширяет его типизированными свойствами `size` и `severity`, а также структурными директивами для кастомных заголовка и футера.

Компонент соответствует Figma-компоненту `<ConfirmDialog>` (nodeId `520:6928`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Открытие выполняется императивно через сервис; зарегистрируйте провайдеры функцией `provideExtraConfirmDialog()`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `key` | `string` | `''` | Ключ для связи компонента с вызовом `ExtraConfirmDialogService.confirm({ key })` — позволяет иметь несколько диалогов на странице |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xlg'` | `'default'` | Ширина окна — соответствует Figma-свойству `Modal Size` (sm → w-20, default/md → w-25, lg → w-30, xlg → w-45) |
| `severity` | `'success' \| 'info' \| 'warn' \| 'help' \| 'danger' \| 'default'` | `'default'` | Семантический тон окна — соответствует Figma-варианту `severity` |

> Текст, заголовок, иконка и подписи кнопок (`message`, `header`, `icon`, `acceptLabel`, `rejectLabel`) передаются не через `@Input`, а в объекте `ExtraConfirmDialogOptions` при вызове `ExtraConfirmDialogService.confirm(...)`. Иконка — CSS-класс из набора [icons.md](../../figma-code-connect/icons.md).

## Variants

### Default (базовый диалог через сервис)

Figma: `<ConfirmDialog>`, severity=danger (вариант по умолчанию в макете), show-header=true

```html
<extra-button label="Показать диалог" (click)="showConfirm()"></extra-button>
<extra-confirm-dialog key="cd-default"></extra-confirm-dialog>
```

```ts
import {
  ExtraConfirmDialogComponent,
  ExtraConfirmDialogService,
  ExtraButtonComponent,
  provideExtraConfirmDialog
} from '@cdek-it/angular-ui-kit';

// providers: [provideExtraConfirmDialog()]
constructor(private confirmDialogService: ExtraConfirmDialogService) {}

showConfirm(): void {
  this.confirmDialogService.confirm({
    key: 'cd-default',
    header: 'Подтверждение',
    message: 'Вы уверены, что хотите продолжить?',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: () => {},
    reject: () => {}
  });
}
```

### Severity (деструктивное действие)

Figma: `<ConfirmDialog>`, severity=danger — nodeId `520:6927`

Тон окна меняется свойством `severity`; для деструктивного подтверждения используйте `severity="danger"`.

```html
<extra-confirm-dialog key="cd-danger" severity="danger"></extra-confirm-dialog>
```

```ts
import { ExtraConfirmDialogComponent, ExtraConfirmDialogService } from '@cdek-it/angular-ui-kit';
```

### Large (увеличенная ширина)

Figma: `<ConfirmDialog>`, Modal Size=lg

```html
<extra-confirm-dialog key="cd-lg" size="lg"></extra-confirm-dialog>
```

### Кастомные заголовок и футер (структурные директивы)

Figma: `<ConfirmDialog>`, show-header=true

Шаблоны получают контекст вызова: `let-message`, `let-onAccept="onAccept"`, `let-onReject="onReject"`.

```html
<extra-confirm-dialog key="cd-templates">
  <ng-template extraConfirmDialogHeader let-message let-onReject="onReject">
    <div class="p-dialog-header">
      <div class="p-dialog-title">
        <i [class]="message.icon"></i>
        <span>{{ message.header }}</span>
      </div>
      <extra-button variant="text" icon="ti ti-x" [rounded]="true" [iconOnly]="true" (click)="onReject()"></extra-button>
    </div>
  </ng-template>

  <ng-template extraConfirmDialogFooter let-message let-onAccept="onAccept" let-onReject="onReject">
    <div class="p-dialog-footer">
      <extra-button [label]="message.rejectLabel" variant="text" (click)="onReject()"></extra-button>
      <extra-button [label]="message.acceptLabel" (click)="onAccept()"></extra-button>
    </div>
  </ng-template>
</extra-confirm-dialog>
```

```ts
import {
  ExtraConfirmDialogComponent,
  ExtraConfirmDialogHeaderDirective,
  ExtraConfirmDialogFooterDirective,
  ExtraButtonComponent
} from '@cdek-it/angular-ui-kit';
```

## Slots

| Слот | Синтаксис | Описание |
|------|-----------|---------|
| Кастомный заголовок | `<ng-template extraConfirmDialogHeader>` | Заменяет стандартный заголовок; контекст шаблона: `message`, `onAccept`, `onReject`. Импортируйте `ExtraConfirmDialogHeaderDirective` |
| Кастомный футер | `<ng-template extraConfirmDialogFooter>` | Заменяет стандартный ряд кнопок; контекст шаблона: `message`, `onAccept`, `onReject`. Импортируйте `ExtraConfirmDialogFooterDirective` |

Произвольное тело (`<ng-content>`) не поддерживается: текст окна берётся из `message.message`. Директивы `ExtraConfirmDialogHeaderDirective` и `ExtraConfirmDialogFooterDirective` объявлены как `standalone: true` — добавляйте их в массив `imports` отдельно от `ExtraConfirmDialogComponent`.

## Related

- [Dialog](../dialog/dialog.figma.md) — произвольный модальный контент (`role=dialog`), который можно просто закрыть
- [Button](../button/button.figma.md) — кнопки подтверждения и отмены в футере
- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок (`ti ti-*`) для заголовка диалога
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены тона `severity` и оверлея
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `ExtraConfirmDialog` только для решений, требующих явного ответа: удаление, необратимые действия, уход с несохранёнными изменениями.
- Задавайте `severity="danger"` для деструктивных подтверждений — это меняет тон окна в соответствии с Figma-вариантом.
- Открывайте окно через `ExtraConfirmDialogService.confirm(...)`, а не вручную через DOM; не забудьте зарегистрировать `provideExtraConfirmDialog()`.
- Используйте `key`, чтобы связать конкретный вызов сервиса с нужным экземпляром компонента, если их несколько.

**Don't:**
- Не используйте `ExtraConfirmDialog` для произвольного контента или больших форм — для этого есть [Dialog](../dialog/dialog.figma.md).
- Не передавайте текст и заголовок как `@Input` — они задаются только в `ExtraConfirmDialogOptions` при вызове сервиса.
- Не смешивайте стандартный заголовок и `*extraConfirmDialogHeader` одновременно — директива имеет приоритет и заменяет стандартную разметку.
