---
component: ExtraMessage
selector: extra-message
import:
  symbol: ExtraMessageComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '15963:3163'
  componentKey: '04f90e69c40005a0433f7c7d3e3840c011e27b9b'
  name: '<Message>'
status: stable
updated: '2026-11-02'
---

## Overview

`ExtraMessage` — компонент инлайн-сообщения со статусом (иконка + заголовок + пояснение), встроенного в поток страницы: рядом с полем формы, у секции или как агрегированный фидбэк по валидации. Оборачивает PrimeNG `p-message`, рендерит содержимое собственным шаблоном и подбирает иконку автоматически по `severity`.

Компонент соответствует Figma-компоненту `<Message>` (nodeId `15963:3163`). Это инлайн-компонент: всплывающее toast-уведомление вынесено в отдельный Figma-компонент `<Toast>` и здесь не покрывается.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `severity` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Семантический акцент — соответствует Figma-свойству `severity` (в PrimeNG `warning` → `warn`, `danger` → `error`) |
| `message` | `string` | `''` | Заголовок сообщения — основная строка текста в Figma |
| `caption` | `string` | `''` | Пояснение под заголовком — соответствует Figma-свойству `show-caption` |
| `icon` | `string` | `undefined` | Класс tabler icon (`"ti ti-*"`) вместо стандартной для `severity`; пустая строка скрывает иконку; не задан — стандартная по `severity` — соответствует Figma-свойствам `change-icon-*` |
| `showClose` | `boolean` | `false` | Показывать кнопку закрытия — соответствует Figma-свойству `show-close` |
| `showTimer` | `boolean` | `false` | Таймер автоскрытия (3 с) — соответствует Figma-свойству `timer` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Ширина сообщения — соответствует Figma-свойству `size` (токены `message.extend.overlayWidth.*`) |
| `fluid` | `boolean` | `false` | Растягивает сообщение на всю ширину контейнера; рендерится классом `p-message-size-fill` из токенов |

Событие закрытия — `@Output() onClose: EventEmitter<void>`; срабатывает при закрытии крестиком, по таймеру и при программном `close()`.

## Variants

### Info (информационное)

Figma: `severity=info`

```html
<extra-message severity="info" message="Информация" caption="Дополнительный текст"></extra-message>
```

### Success (успех)

Figma: `severity=success`

```html
<extra-message severity="success" message="Готово" caption="Операция выполнена"></extra-message>
```

### Warning (предупреждение)

Figma: `severity=warning`

```html
<extra-message severity="warning" message="Внимание" caption="Проверьте данные"></extra-message>
```

### Danger (ошибка)

Figma: `severity=danger`

```html
<extra-message severity="danger" message="Ошибка" caption="Не удалось сохранить"></extra-message>
```

### С кнопкой закрытия (showClose)

Figma: `show-close=true`

```html
<extra-message
  severity="info"
  message="Сообщение"
  [showClose]="true"
  (onClose)="onClosed()"
></extra-message>
```

### С автозакрытием (showTimer)

Figma: `timer=true`

```html
<extra-message severity="success" message="Сохранено" [showTimer]="true"></extra-message>
```

### На всю ширину контейнера (fluid)

```html
<extra-message severity="info" message="Сообщение" [fluid]="true"></extra-message>
```

## Slots

- **`content`** — безымянный `<ng-content>`: произвольная разметка внутри тега размещается под `message`/`caption`.

  ```html
  <extra-message severity="info" message="Подсказка">
    <a href="/docs">Подробнее в документации</a>
  </extra-message>
  ```

- **`footer`** — через `<ng-template extraMessageTemplate="footer">`; рендерится внизу сообщения.

  ```html
  <extra-message severity="warning" message="Проверьте данные">
    <ng-template extraMessageTemplate="footer">
      <extra-button label="Исправить" size="small" variant="secondary" />
    </ng-template>
  </extra-message>
  ```

## Related

- [Токены](../../figma-code-connect/tokens.md) — цветовые токены `severity`, ширины `size`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraButton](../button/button.figma.md) — кнопка закрытия и слот footer используют общий контракт

## Do / Don't

**Do:**
- Используйте `extra-message` для устойчивого инлайн-фидбэка рядом с формой, полем или секцией
- Подбирайте `severity` по смыслу: `danger` для ошибок, `warning` для предупреждений, `success` для подтверждений
- Для закрываемого сообщения задавайте `[showClose]="true"` и обрабатывайте `(onClose)`
- Полагайтесь на автоподбор иконки по `severity`; переопределяйте `icon` классом tabler (`"ti ti-*"`) только при необходимости

**Don't:**
- Не используйте инлайн-Message как всплывающий toast — для системных самозакрывающихся уведомлений предназначен отдельный компонент (Figma `<Toast>`)
- Не включайте `[showTimer]="true"` для постоянного статуса секции — автозакрытие уместно только для временных подтверждений
- Не дублируйте текст ошибки в `message` и `caption` — заголовок краткий, подробности в `caption`
- Не передавайте в `icon` одновременно несколько классов или произвольный CSS — только класс tabler icon целиком
