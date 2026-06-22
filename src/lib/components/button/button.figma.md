---
component: ExtraButton
selector: extra-button
import:
  symbol: ExtraButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '160:5223'
  componentKey: '78978b6676b9ce8c25a312d5fb52ee06805c8fa2'
  name: 'Button.Base'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraButton` — универсальный компонент кнопки для инициации действий, отправки форм и навигации. Оборачивает PrimeNG `p-button` и расширяет его дополнительными вариантами отображения, размерами и поддержкой бейджа.

Компонент соответствует Figma-компоненту `<Button.Base>` (nodeId `160:5223`) и `<Button.Danger>` (nodeId `162:5457`).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `'Button'` | Текст кнопки |
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'text' \| 'link'` | `'primary'` | Вариант отображения — соответствует Figma-свойству `variant` |
| `severity` | `'success' \| 'warning' \| 'danger' \| 'info' \| null` | `null` | Семантический акцент — соответствует Figma-компоненту `<Button.Danger>` и аналогам |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер кнопки — соответствует Figma-свойству `size` |
| `icon` | `string` | `''` | CSS-класс иконки (например `'pi pi-check'`); доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `iconPos` | `'prefix' \| 'postfix' \| null` | `null` | Позиция иконки — соответствует Figma-свойству `icon-position` |
| `iconOnly` | `boolean` | `false` | Режим «только иконка» без текста — соответствует Figma-свойству `icon-only` |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-состоянию `state=disabled` |
| `loading` | `boolean` | `false` | Состояние загрузки со спиннером — соответствует Figma-состоянию `state=loading` |
| `rounded` | `boolean` | `false` | Скруглённая форма кнопки — соответствует Figma-свойству `rounded` |
| `fluid` | `boolean` | `false` | Растяжение кнопки на всю ширину контейнера |
| `showBadge` | `boolean` | `false` | Показывать бейдж поверх кнопки |
| `badge` | `string` | `''` | Текст бейджа (отображается только при `showBadge=true`) |
| `badgeSeverity` | `'success' \| 'info' \| 'warning' \| 'danger' \| 'secondary' \| 'contrast' \| null` | `null` | Цветовая схема бейджа; цвета соответствуют токенам [tokens.md](../../figma-code-connect/tokens.md) |
| `text` | `boolean` | `false` | Текстовый вариант без фона и рамки (алиас для `variant='text'`) |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |

## Variants

### Primary / Base (основная кнопка)

Figma: `<Button.Base>`, variant=primary, size=base, state=default — nodeId `160:5223`

```html
<extra-button label="Сохранить"></extra-button>
```html

### Secondary / Base (вторичная кнопка)

Figma: `<Button.Base>`, variant=tertiary (в коде: `variant="secondary"`), size=base, state=default

```html
<extra-button variant="secondary" label="Отмена"></extra-button>
```html

### Outlined / Large (контурная кнопка, большой размер)

Figma: `<Button.Base>`, variant=outlined, size=large, state=default

```html
<extra-button variant="outlined" size="large" label="Подробнее"></extra-button>
```html

### Text / Base (текстовая кнопка)

Figma: `<Button.Base>`, variant=text, size=base, state=default

```html
<extra-button variant="text" label="Ссылка-кнопка"></extra-button>
```html

### Link / Base (кнопка-ссылка)

Figma: `<Button.Base>`, variant=link, size=base, state=default

```html
<extra-button variant="link" label="Перейти"></extra-button>
```html

### С иконкой слева (prefix)

Figma: `<Button.Base>`, icon-position=prefix, icon-only=false

```html
<extra-button
  label="Добавить"
  icon="pi pi-plus"
  iconPos="prefix"
></extra-button>
```html

### Только иконка (icon-only)

Figma: `<Button.Base>`, icon-only=true

```html
<extra-button
  icon="pi pi-trash"
  [iconOnly]="true"
  ariaLabel="Удалить"
></extra-button>
```html

### Состояние загрузки (loading)

Figma: `<Button.Base>`, state=loading

```html
<extra-button label="Отправка..." [loading]="true"></extra-button>
```html

### Danger (деструктивное действие)

Figma: `<Button.Danger>`, nodeId `162:5457`, componentKey `071aae3b46b09cd249c18e1942ca7db77051f6f0`

Использует токен `background.danger.bold` — подробности в [tokens.md](../../figma-code-connect/tokens.md#color-background).

```html
<extra-button severity="danger" label="Удалить" icon="pi pi-trash"></extra-button>
```html

### С бейджем

```html
<extra-button
  label="Уведомления"
  [showBadge]="true"
  badge="3"
  badgeSeverity="danger"
></extra-button>
```html

### Скруглённая (rounded)

Figma: `<Button.Base>`, rounded=true

```html
<extra-button [rounded]="true" label="Округлая"></extra-button>
```html

### Fluid (на всю ширину)

```html
<extra-button [fluid]="true" label="Во всю ширину"></extra-button>
```html

## Slots

Не используются. Содержимое кнопки передаётся через `@Input() label` и `@Input() icon`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`pi pi-*`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены severity и badge
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `variant="primary"` для единственного главного действия на экране
- Для деструктивных действий задавайте `severity="danger"` и добавляйте иконку через [icons.md](../../figma-code-connect/icons.md)
- При кнопке только с иконкой всегда задавайте `ariaLabel` для доступности
- Используйте `[fluid]="true"` в мобильных макетах и формах на всю ширину

**Don't:**
- Не размещайте две кнопки `variant="primary"` рядом без явной иерархии
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не используйте `severity` вместо `variant` для смены формы кнопки: `severity` меняет цвет, `variant` — форму
- Не передавайте `[iconOnly]="true"` без `icon` — кнопка окажется пустой
