---
component: ExtraMessage
selector: extra-message
import:
  symbol: ExtraMessageComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '560:490'
  componentKey: 'f7e3a50f6293d15d502b50c6e5ef453f5b18c863'
  name: '<Message>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraMessage` — компонент инлайн-сообщения со статусом (иконка + заголовок + подробный текст), встроенного в поток страницы: рядом с полем формы, у секции или как агрегированный фидбэк по валидации. Оборачивает PrimeNG `p-message` и подбирает иконку автоматически по `severity`.

Компонент соответствует Figma-компоненту `<Message>` (nodeId `560:490`). В коде реализован инлайн-вариант (Figma `toast=false`); всплывающий toast (Figma `toast=true`) живёт в отдельном компоненте и здесь не покрывается.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `severity` | `'success' \| 'info' \| 'warn' \| 'error' \| 'secondary' \| 'contrast'` | `'info'` | Семантический акцент — соответствует Figma-свойству `severity` (`warn` ↔ Figma `warning`, `error` ↔ Figma `danger`) |
| `summary` | `string` | `''` | Заголовок сообщения — соответствует основной строке текста в Figma |
| `detail` | `string` | `''` | Подробный текст под заголовком — соответствует Figma-свойству `show-caption` |
| `icon` | `string` | `undefined` | CSS-класс иконки; по умолчанию подбирается по `severity` — соответствует Figma-свойствам `change-icon-*`; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `closable` | `boolean` | `false` | Показывать кнопку закрытия — соответствует Figma-свойству `show-close` |
| `life` | `number` | `undefined` | Время автозакрытия в миллисекундах — соответствует Figma-свойству `timer` |

Событие закрытия доступно через `@Output() onClose: EventEmitter<Event>`.

Figma-свойство `toast` (всплывающее уведомление) в этом компоненте всегда соответствует инлайн-режиму и в коде не задаётся.

## Variants

### Info (информационное)

Figma: `severity=info`, toast=false

```html
<extra-message severity="info" summary="Информация" detail="Дополнительный текст"></extra-message>
```

### Success (успех)

Figma: `severity=success`, toast=false

```html
<extra-message severity="success" summary="Готово" detail="Операция выполнена"></extra-message>
```

### Warn (предупреждение)

Figma: `severity=warning`, toast=false

```html
<extra-message severity="warn" summary="Внимание" detail="Проверьте данные"></extra-message>
```

### Error / danger (ошибка)

Figma: `severity=danger`, toast=false

```html
<extra-message severity="error" summary="Ошибка" detail="Не удалось сохранить"></extra-message>
```

### С кнопкой закрытия (closable)

Figma: `show-close=true`

```html
<extra-message
  severity="info"
  summary="Сообщение"
  [closable]="true"
  (onClose)="onClosed($event)"
></extra-message>
```

### С автозакрытием (life)

Figma: `timer=true`

```html
<extra-message severity="success" summary="Сохранено" [life]="3000"></extra-message>
```

## Slots

Содержимое проектируется через безымянный `<ng-content>` — произвольная разметка внутри тега размещается под заголовком и подробным текстом.

```html
<extra-message severity="info" summary="Подсказка">
  <a href="/docs">Подробнее в документации</a>
</extra-message>
```

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки `severity` и `icon`
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены `severity`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraButton](../button/button.figma.md) — кнопка закрытия использует общий контракт

## Do / Don't

**Do:**
- Используйте `extra-message` для устойчивого инлайн-фидбэка рядом с формой, полем или секцией
- Подбирайте `severity` по смыслу: `error` для ошибок, `warn` для предупреждений, `success` для подтверждений
- Для закрываемого сообщения задавайте `[closable]="true"` и обрабатывайте `(onClose)`
- Полагайтесь на автоподбор иконки по `severity`; переопределяйте `icon` только при необходимости — используйте справочник [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте инлайн-Message как всплывающий toast — для системных самозакрывающихся уведомлений предназначен отдельный компонент (Figma `toast=true`)
- Не инлайньте CSS-классы иконок вручную в обход справочника [icons.md](../../figma-code-connect/icons.md)
- Не задавайте `[life]` для постоянного статуса секции — автозакрытие уместно только для временных подтверждений
- Не дублируйте текст ошибки в `summary` и `detail` — заголовок краткий, подробности в `detail`
