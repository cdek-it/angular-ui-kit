---
component: ExtraToast
selector: extra-toast
import:
  symbol: ExtraToastComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '15953:4478'
  componentKey: 'e62d7e276583e57fc42b31096f545e591ec18979'
  name: '<Toast>'
status: stable
updated: '2026-09-06'
---

## Overview

`ExtraToast` — всплывающее самозакрывающееся уведомление поверх интерфейса, overlay-вариант `ExtraMessage`
(инлайн-сообщение в потоке страницы — см. [Message](../message/message.figma.md)). Сообщения не
вставляются в шаблон напрямую: контейнер `<extra-toast>` монтируется один раз (обычно в корне
приложения), а показ каждого уведомления выполняется императивно через `ExtraToastService.add()`.
Свойства спецификации (`severity`/`timer`/`message`/`caption`/`icon`/`show-close`), слоты
(`content`/`footer`) и событие `onClose` относятся к КАЖДОМУ сообщению и передаются полем в объекте
`ExtraToastService.add({...})`, а не как `@Input()`/`@Output()` самого `<extra-toast>`.

Для работы требуется зарегистрировать провайдеры через `provideExtraToast()` в `ApplicationConfig.providers`.

Компонент соответствует Figma-узлу `<Toast>` (nodeId `15953:4478`), задающему два свойства:
`severity` (`info | success | warning | danger`) и `timer` (`false | true`).

## Props mapping

Контейнер `<extra-toast>` принимает свойства, управляющие отображением ВСЕХ его сообщений
(вне спецификации — форм-обвязка/инфраструктура, аналог `disabled`/`invalid` у форм-контролов):

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center' \| 'center'` | `'top-right'` | Позиция группы уведомлений на экране |
| `key` | `string \| undefined` | `undefined` | Ключ контейнера; показывают только сообщения с тем же `key` (несколько независимых очередей) |
| `life` | `number` | `5000` | Дефолтное время автозакрытия (мс) для всех сообщений этого контейнера; переопределяется полем `life` конкретного сообщения |

Само сообщение передаётся в `ExtraToastService.add()` объектом `ExtraToastMessage` — это и есть
публичный API спецификации:

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|---------|
| `severity` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Тип сообщения — соответствует спеке `severity` |
| `timer` | `boolean` | `true` | Таймер автоскрытия — соответствует спеке `timer`. `false` делает уведомление несгораемым (sticky) |
| `message` | `string` | — | Заголовок сообщения — соответствует спеке `message` |
| `caption` | `string` | — | Подробности сообщения — соответствует спеке `caption` |
| `icon` | `string` | — | Класс иконки tabler icon вместо стандартной для `severity` — соответствует спеке `icon` |
| `showClose` | `boolean` | `false` | Кнопка закрытия — соответствует спеке `show-close` |
| `content` | `TemplateRef<unknown>` | — | Слот `content` — контент после `caption` |
| `footer` | `TemplateRef<unknown>` | — | Слот `footer` — контент футера |
| `onClose` | `() => void` | — | Событие `onClose` — срабатывает при закрытии этого сообщения (крестиком или по таймеру) |
| `key` | `string \| undefined` | `undefined` | Ключ целевого контейнера `<extra-toast>`; вне спеки, но необходим для нескольких независимых очередей |
| `life` | `number \| undefined` | `undefined` | Переопределяет длительность таймера (мс) для этого сообщения; вне спеки, дополнительная точная настройка поверх булева `timer` |

`content`/`footer` — обычные `TemplateRef`, получаемые в компоненте-инициаторе через `@ViewChild`
(см. пример ниже); контент-проекция через `<ng-content>` здесь невозможна, так как сообщение не
является отдельным компонентом в шаблоне, а данными, переданными в сервис.

```html
<extra-toast></extra-toast>
```

```ts
import { Component, inject } from '@angular/core';
import { ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-root',
  imports: [ExtraToastComponent],
  template: '<extra-toast></extra-toast>',
})
export class AppComponent {
  private readonly toast = inject(ExtraToastService);

  show(): void {
    this.toast.add({ severity: 'success', message: 'Готово', caption: 'Операция выполнена' });
  }
}
```

## Variants

Варианты различаются по `severity` сообщения. Контейнер один и тот же; меняется объект, переданный в
`ExtraToastService.add()`. Figma-узел `<Toast>` задаёт два свойства: `severity`
(`info | success | warning | danger`) и `timer` (`false | true`).

### Info (информационное)

Figma: `severity=info`

```ts
this.toast.add({ severity: 'info', message: 'Информация', caption: 'Дополнительный текст' });
```

### Success (успех)

Figma: `severity=success`

```ts
this.toast.add({ severity: 'success', message: 'Готово', caption: 'Операция выполнена' });
```

### Warning (предупреждение)

Figma: `severity=warning`

```ts
this.toast.add({ severity: 'warning', message: 'Внимание', caption: 'Проверьте данные' });
```

### Danger (ошибка)

Figma: `severity=danger`

```ts
this.toast.add({ severity: 'danger', message: 'Ошибка', caption: 'Не удалось сохранить' });
```

### С кнопкой закрытия (show-close)

```ts
this.toast.add({ severity: 'info', message: 'Сообщение', showClose: true });
```

### Несгораемое (timer=false)

Figma: `timer=false`

```ts
this.toast.add({ severity: 'success', message: 'Сохранено', timer: false });
```

### С контентом и футером (content / footer)

```ts
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  imports: [ExtraToastComponent],
  template: `
    <extra-toast></extra-toast>
    <ng-template #extraContent>Дополнительный контент</ng-template>
    <ng-template #extraFooter>Футер</ng-template>
  `,
})
export class ExampleComponent {
  @ViewChild('extraContent') contentTpl!: TemplateRef<unknown>;
  @ViewChild('extraFooter') footerTpl!: TemplateRef<unknown>;
  private readonly toast = inject(ExtraToastService);

  show(): void {
    this.toast.add({
      severity: 'info',
      message: 'Сообщение',
      content: this.contentTpl,
      footer: this.footerTpl,
    });
  }
}
```

### Позиционирование (position)

```html
<extra-toast position="bottom-center"></extra-toast>
```

```ts
this.toast.add({ severity: 'info', message: 'Уведомление снизу' });
```

### Несколько очередей (key)

```html
<extra-toast key="orders"></extra-toast>
```

```ts
this.toast.add({ key: 'orders', severity: 'success', message: 'Заказ создан' });
```

## Slots

| Слот | Описание |
|------|----------|
| `content` | Контент после `caption`. Передаётся `TemplateRef` в поле `content` объекта `ExtraToastMessage` |
| `footer` | Контент футера. Передаётся `TemplateRef` в поле `footer` объекта `ExtraToastMessage` |

## Related

- [Message](../message/message.figma.md) — инлайн-вариант того же уведомления, встроенный в поток страницы
- [Button](../button/button.figma.md) — кнопка закрытия использует общий контракт
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки `severity` и `icon`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Монтируйте один `<extra-toast>` в корне приложения и показывайте сообщения через `ExtraToastService.add()`
- Регистрируйте `provideExtraToast()` в `ApplicationConfig.providers` один раз
- Подбирайте `severity` по смыслу: `danger` для ошибок, `warning` для предупреждений, `success` для подтверждений
- Используйте `key` для независимых очередей уведомлений (например системные и контекстные)
- Полагайтесь на автоподбор иконки по `severity`; переопределяйте `icon` только при необходимости — используйте справочник [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте toast для устойчивого статуса рядом с формой или секцией — для инлайн-фидбэка предназначен [Message](../message/message.figma.md)
- Не монтируйте несколько `<extra-toast>` с одинаковым `position` и `key` — сообщения продублируются
- Не инлайньте CSS-классы иконок вручную в обход справочника [icons.md](../../figma-code-connect/icons.md)
- Не делайте `timer: false` (несгораемым) без `showClose: true` — пользователю нечем будет закрыть уведомление
