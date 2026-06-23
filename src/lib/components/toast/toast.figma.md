---
component: ExtraToast
selector: extra-toast
import:
  symbol: ExtraToastComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '15953:4478'
  componentKey: 'f7e3a50f6293d15d502b50c6e5ef453f5b18c863'
  name: '<Toast>'
status: stable
updated: '2026-06-23'
---

## Overview

`ExtraToast` — контейнер всплывающих самозакрывающихся уведомлений поверх интерфейса. Сообщения не вставляются в шаблон напрямую: компонент монтируется один раз (обычно в корне приложения), а показ выполняется императивно через `ExtraToastService`. Оборачивает PrimeNG `p-toast` и подбирает иконку автоматически по `severity`.

Для работы требуется зарегистрировать провайдеры через `provideExtraToast()` в `ApplicationConfig.providers`.

Компонент соответствует Figma-узлу `<Toast>` (nodeId `15953:4478`) — это всплывающее самозакрывающееся уведомление, в отличие от инлайн-компонента `<Message>` (nodeId `15963:3163`), встроенного в поток страницы. В ходе рефакторинга toast-сценарий был отделён от inline `<Message>` в самостоятельный Figma-узел `<Toast>`.

## Props mapping

Входные свойства задаются на самом контейнере `<extra-toast>` и управляют отображением всех сообщений.

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center' \| 'center'` | `'top-right'` | Позиция группы уведомлений на экране |
| `key` | `string \| undefined` | `undefined` | Ключ контейнера; показывают только сообщения с тем же `key` (несколько независимых очередей) |
| `life` | `number` | `5000` | Время автозакрытия в миллисекундах |
| `pt` | `Record<string, any> \| undefined` | `undefined` | PrimeNG PassThrough для тонкой настройки внутренних элементов |

Само сообщение передаётся в `ExtraToastService.add()` объектом `ExtraToastMessage`:

| Поле | Тип | Описание |
|------|-----|---------|
| `severity` | `'success' \| 'info' \| 'warn' \| 'error' \| 'secondary' \| 'contrast'` | Семантический акцент; определяет цвет и иконку |
| `summary` | `string` | Заголовок уведомления |
| `detail` | `string` | Подробный текст под заголовком |
| `life` | `number` | Время автозакрытия в миллисекундах (переопределяет `life` контейнера) |
| `icon` | `string` | CSS-класс иконки; по умолчанию подбирается по `severity` — доступные иконки см. [icons.md](../../figma-code-connect/icons.md) |
| `closable` | `boolean` | Показывать кнопку закрытия |
| `key` | `string` | Ключ целевого контейнера `<extra-toast>` |

Контейнер монтируется в шаблоне без сообщений, а показ выполняется через сервис.

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
    this.toast.add({ severity: 'success', summary: 'Готово', detail: 'Операция выполнена' });
  }
}
```

## Variants

Варианты различаются по `severity` сообщения. Контейнер один и тот же; меняется объект, переданный в `ExtraToastService.add()`. Figma-узел `<Toast>` задаёт два свойства: `severity` (`info | success | warning | danger`) и `timer` (`false | true`).

### Info (информационное)

Figma: `severity=info`

```html
<extra-toast></extra-toast>
```

```ts
this.toast.add({ severity: 'info', summary: 'Информация', detail: 'Дополнительный текст' });
```

### Success (успех)

Figma: `severity=success`

```html
<extra-toast></extra-toast>
```

```ts
this.toast.add({ severity: 'success', summary: 'Готово', detail: 'Операция выполнена' });
```

### Warn (предупреждение)

Figma: `severity=warning`

```html
<extra-toast></extra-toast>
```

```ts
this.toast.add({ severity: 'warn', summary: 'Внимание', detail: 'Проверьте данные' });
```

### Error / danger (ошибка)

Figma: `severity=danger`

```html
<extra-toast></extra-toast>
```

```ts
this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить' });
```

### С кнопкой закрытия (closable)

```html
<extra-toast></extra-toast>
```

```ts
this.toast.add({ severity: 'info', summary: 'Сообщение', closable: true });
```

### С увеличенным временем жизни (life)

Figma: `timer=true`

```html
<extra-toast [life]="10000"></extra-toast>
```

```ts
this.toast.add({ severity: 'success', summary: 'Сохранено', life: 10000 });
```

### Позиционирование (position)

```html
<extra-toast position="bottom-center"></extra-toast>
```

```ts
this.toast.add({ severity: 'info', summary: 'Уведомление снизу' });
```

### Несколько очередей (key)

```html
<extra-toast key="orders"></extra-toast>
```

```ts
this.toast.add({ key: 'orders', severity: 'success', summary: 'Заказ создан' });
```

## Slots

Контент уведомления формируется из полей `summary` и `detail` объекта сообщения и не проектируется через `<ng-content>`. Структурные слоты не используются.

## Related

- [Message](../message/message.figma.md) — инлайн-вариант сообщения со статусом; покрывает Figma `<Message>` (`toast=false`)
- [Button](../button/button.figma.md) — кнопка закрытия использует общий контракт
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки `severity` и `icon`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Монтируйте один `<extra-toast>` в корне приложения и показывайте сообщения через `ExtraToastService.add()`
- Регистрируйте `provideExtraToast()` в `ApplicationConfig.providers` один раз
- Подбирайте `severity` по смыслу: `error` для ошибок, `warn` для предупреждений, `success` для подтверждений
- Используйте `key` для независимых очередей уведомлений (например системные и контекстные)
- Полагайтесь на автоподбор иконки по `severity`; переопределяйте `icon` только при необходимости — используйте справочник [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте toast для устойчивого статуса рядом с формой или секцией — для инлайн-фидбэка предназначен [Message](../message/message.figma.md)
- Не монтируйте несколько `<extra-toast>` с одинаковым `position` и `key` — сообщения продублируются
- Не инлайньте CSS-классы иконок вручную в обход справочника [icons.md](../../figma-code-connect/icons.md)
- Не задавайте слишком короткий `life` для текста, который нужно успеть прочитать
