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
| `label` | `string` | `''` | Текст кнопки |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'outlined' \| 'text' \| 'link'` | `'primary'` | Вариант отображения — `primary`/`secondary`/`tertiary`/`text`/`link` соответствуют Figma-свойству `variant` на `<Button.Base>` (nodeId `160:5223`), `outlined` — Figma-свойству `variant=outlined` на `<Button.Danger>`/`<Button.Warning>`/`<Button.Success>`/`<Button.Info>` (nodeId `162:5457` и аналоги) |
| `severity` | `'base' \| 'danger' \| 'warning' \| 'success' \| 'info'` | `'base'` | Семантический акцент — соответствует Figma-компоненту `<Button.Danger>` и аналогам |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер кнопки — соответствует Figma-свойству `size` |
| `icon` | `string` | `''` | CSS-класс иконки (например `'pi pi-check'`); доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Позиция иконки — соответствует Figma-свойству `icon-position` |
| `iconOnly` | `boolean` | `false` | Режим «только иконка» без текста — соответствует Figma-свойству `icon-only` |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-состоянию `state=disabled` |
| `loading` | `boolean` | `false` | Состояние загрузки со спиннером — соответствует Figma-состоянию `state=loading` |
| `rounded` | `boolean` | `false` | Скруглённая форма кнопки — соответствует Figma-свойству `rounded` |
| `fluid` | `boolean` | `false` | Растяжение кнопки на всю ширину контейнера |
| `showBadge` | `boolean` | `false` | Показывать бейдж поверх кнопки |
| `badge` | `string` | `''` | Текст бейджа (отображается только при `showBadge=true`) |
| `badgeSeverity` | `'success' \| 'info' \| 'warning' \| 'danger' \| 'secondary' \| 'contrast' \| null` | `null` | Цветовая схема бейджа; цвета соответствуют токенам [tokens.md](../../figma-code-connect/tokens.md) |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |

Отдельного `text` нет — текстовый стиль задаётся только через `variant="text"`; дублирующий булев
проп был в черновике ветки, убран как нарушающий правило «одно имя — один смысл»
(`docs/naming-rules.md`).

### `tertiary` vs `outlined` — два разных Figma-компонента, два разных кода-значения

В Figma `<Button.Base>` и `<Button.Danger>`/`<Button.Warning>`/`<Button.Success>`/`<Button.Info>` —
РАЗНЫЕ компонент-сеты с разными наборами значений `variant`: у Base — `primary | secondary |
tertiary | text | link`, у severity-семейства — `basic | outlined | text` (подтверждено
скриншотами `<Button.Base>` nodeId `160:5223` и `<Button.Danger>` nodeId `162:5457`). Визуально это
два разных вида:

- `<Button.Base>` variant=tertiary — сплошная тёмная заливка без рамки (`severity=contrast` у
  PrimeNG, `outlined=false`).
- `<Button.Danger>`/аналоги variant=outlined — кнопка с цветной рамкой и прозрачным фоном
  (`outlined=true`).

Раньше оба вида смешивались в один код-уровневый `variant="tertiary"`, который неявно превращался
в контурный при `severity !== 'base'`. Это было неочевидно и не давало собрать контурную кнопку
нейтрального цвета. Теперь `outlined` — самостоятельное значение `variant`
(`[outlined]="variant === 'outlined'"`, без зависимости от `severity`): `tertiary` всегда даёт
тёмную заливку, `outlined` всегда даёт рамку, цвет рамки/текста в обоих случаях задаётся отдельно
через `severity`.

> ⚠️ **`variant="outlined"` + `severity="base"` не имеет референса в Figma и визуально не
> работает.** В Figma `outlined` существует только у `<Button.Danger>`/`<Button.Warning>`/
> `<Button.Success>`/`<Button.Info>` — у `<Button.Base>` такого состояния нет. На уровне кода
> комбинация технически доступна (оба пропа независимы), но при `severity="base"` она маппится на
> PrimeNG `severity="contrast"`, чей цветовой токен — белый текст, рассчитанный на тёмную заливку
> (`#2b2e33`); при `outlined=true` заливка снимается, и текст остаётся белым на прозрачном фоне —
> нечитаемо на светлой странице. Использовать `outlined` только вместе с `severity !== 'base'`
> (`danger`/`warning`/`success`/`info`).

## Variants

### Primary / Base (основная кнопка)

Figma: `<Button.Base>`, variant=primary, size=base, state=default — nodeId `160:5223`

```html
<extra-button label="Сохранить"></extra-button>
```

### Secondary / Base (вторичная кнопка)

Figma: `<Button.Base>`, variant=secondary, size=base, state=default

```html
<extra-button variant="secondary" label="Отмена"></extra-button>
```

### Tertiary / Large (тёмная заливка, большой размер)

Figma: `<Button.Base>`, variant=tertiary, size=large, state=default — сплошная тёмная заливка,
не зависит от `severity` (см. раздел «`tertiary` vs `outlined`» выше)

```html
<extra-button variant="tertiary" size="large" label="Подробнее"></extra-button>
```

### Outlined (контурная кнопка)

Figma: `<Button.Danger>`/`<Button.Warning>`/`<Button.Success>`/`<Button.Info>`, variant=outlined —
nodeId `162:5457` и аналоги. Только с `severity` отличной от `base` — см. предупреждение выше.

```html
<extra-button variant="outlined" severity="danger" label="Удалить"></extra-button>
<extra-button variant="outlined" severity="success" label="Подтвердить"></extra-button>
```

### Text / Base (текстовая кнопка)

Figma: `<Button.Base>`, variant=text, size=base, state=default

```html
<extra-button variant="text" label="Ссылка-кнопка"></extra-button>
```

### Link / Base (кнопка-ссылка)

Figma: `<Button.Base>`, variant=link, size=base, state=default

```html
<extra-button variant="link" label="Перейти"></extra-button>
```

### С иконкой слева (left)

Figma: `<Button.Base>`, icon-position=prefix, icon-only=false

```html
<extra-button
  label="Добавить"
  icon="pi pi-plus"
  iconPosition="left"
></extra-button>
```

### Только иконка (icon-only)

Figma: `<Button.Base>`, icon-only=true

```html
<extra-button
  icon="pi pi-trash"
  [iconOnly]="true"
  ariaLabel="Удалить"
></extra-button>
```

### Состояние загрузки (loading)

Figma: `<Button.Base>`, state=loading

```html
<extra-button label="Отправка..." [loading]="true"></extra-button>
```

### Danger (деструктивное действие)

Figma: `<Button.Danger>`, nodeId `162:5457`, componentKey `071aae3b46b09cd249c18e1942ca7db77051f6f0`

Использует токен `background.danger.bold` — подробности в [tokens.md](../../figma-code-connect/tokens.md#color-background).

```html
<extra-button severity="danger" label="Удалить" icon="pi pi-trash"></extra-button>
```

### С бейджем

```html
<extra-button
  label="Уведомления"
  [showBadge]="true"
  badge="3"
  badgeSeverity="danger"
></extra-button>
```

### Скруглённая (rounded)

Figma: `<Button.Base>`, rounded=true

```html
<extra-button [rounded]="true" label="Округлая"></extra-button>
```

### Fluid (на всю ширину)

```html
<extra-button [fluid]="true" label="Во всю ширину"></extra-button>
```

## Slots

Не используются. Содержимое кнопки передаётся через `@Input() label` и `@Input() icon`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`pi pi-*`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены severity и badge
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `variant="text"` для текстовых кнопок — отдельного булева `text` нет, это единственный способ
- Используйте `variant="primary"` для единственного главного действия на экране
- Для деструктивных действий задавайте `severity="danger"` и добавляйте иконку через [icons.md](../../figma-code-connect/icons.md)
- При кнопке только с иконкой всегда задавайте `ariaLabel` для доступности
- Используйте `[fluid]="true"` в мобильных макетах и формах на всю ширину

**Don't:**
- Не размещайте две кнопки `variant="primary"` рядом без явной иерархии
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не используйте `severity` вместо `variant` для смены формы кнопки: `severity` меняет цвет, `variant` — форму
- Не передавайте `[iconOnly]="true"` без `icon` — кнопка окажется пустой
