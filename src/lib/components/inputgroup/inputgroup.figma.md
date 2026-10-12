---
component: ExtraInputGroup
selector: extra-input-group
import:
  symbol: ExtraInputGroupComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '437:3505'
  componentKey: '5804ce15e658506c41002f48bf003b500ceceef1'
  name: '<InputGroup>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraInputGroupComponent` — обёртка, объединяющая поле ввода (`<extra-input-text>`) с присоединёнными аддонами (текст, единица измерения, иконка, кнопка) слева и/или справа в единый визуальный блок. Аддоны проецируются как дочерние элементы `<extra-input-group-addon>`.

Компонент соответствует Figma-компоненту `<InputGroup>` (nodeId `437:3505`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Позиция аддонов определяется Figma-свойством `addon-position` (`left`, `right`, `left & right`), а само вкладываемое поле — свойством `change-field`.

## Props mapping

### `<extra-input-group>` — обёртка

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер группы; влияет на паддинги и шрифты аддонов. Должен совпадать с `size` вложенного `<extra-input-text>` |
| `addonPosition` | `'left' \| 'right' \| 'both'` | `'left'` | Соответствует Figma-свойству `addon-position`. Навешивает CSS-класс `extra-input-group--addon-<value>` на корневой элемент — **не управляет DOM-порядком**: что фактически рендерится слева/справа по-прежнему определяется порядком `<extra-input-group-addon>`/`<extra-input-text>` в шаблоне (см. Do/Don't) |

### `<extra-input-group-addon>` — аддон

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `position` | `'left' \| 'right'` | `'left'` | Положение конкретного аддона — навешивает класс `extra-input-group-addon--<value>` на `p-inputgroup-addon` |
| `type` | `'text' \| 'icon'` | `'text'` | `'text'` — содержимое аддона передаётся через `<ng-content>`; `'icon'` — рендерится `<i [class]="icon">`, проекция игнорируется |
| `icon` | `string \| undefined` | `undefined` | CSS-класс tabler-иконки (используется при `type='icon'`) |

> ⚠️ **Переоценка прежнего решения**: раньше этот документ утверждал, что позиция — не `@Input`, а
> целиком определяется порядком проекции, и `ExtraInputGroupAddonComponent` не имел входов вовсе.
> По требованию спеки `addonPosition`/`position` реализованы как настоящие `@Input()` (CSS-класс-хуки),
> а `type`/`icon` добавлены как недостающая функциональность — без них аддон мог показывать только
> текст через `<ng-content>`, иконку приходилось оборачивать вручную без стандартного способа это
> обозначить. DOM-порядок по-прежнему определяет фактическое расположение — оба механизма сосуществуют.

> ⚠️ **Найденный баг в CSS-токенах**: `tokens/components/inputgroup.ts` стилизует скругления/границы
> аддонов через селекторы `.p-inputgroup > input-group-addon` / `.p-inputgroup > input-text` — но
> реальные селекторы хост-тегов компонентов — `extra-input-group-addon` / `extra-input-text` (с
> префиксом `extra-`). Проверено Playwright: `border-radius` аддона сейчас одинаковый со всех сторон
> (должен быть скруглён только с внешней стороны, со стороны поля — прямой угол) — аддон и поле
> визуально не сливаются в единый блок, как задумано в Figma. На коде это не чинится — файл токенов
> зона дизайнера (см. «Не трогать» в корневом `CLAUDE.md`), нужно поправить селекторы на
> `extra-input-group-addon`/`extra-input-text`.

## Variants

### Addon слева (addon-position=left)

Figma: `<InputGroup>`, addon-position=left — nodeId `437:3504`

```html
<extra-input-group addonPosition="left">
  <extra-input-group-addon position="left" type="icon" icon="ti ti-user"></extra-input-group-addon>
  <extra-input-text placeholder="Введите данные..." [(ngModel)]="value" name="field" [fluid]="true"></extra-input-text>
</extra-input-group>
```

### Addon справа (addon-position=right)

Figma: `<InputGroup>`, addon-position=right — nodeId `437:3502`

```html
<extra-input-group addonPosition="right">
  <extra-input-text placeholder="Сумма" [(ngModel)]="amount" name="amount" [fluid]="true"></extra-input-text>
  <extra-input-group-addon position="right">₽</extra-input-group-addon>
</extra-input-group>
```

### Addon с обеих сторон (addon-position=left & right)

Figma: `<InputGroup>`, addon-position=left & right — nodeId `437:3503`

```html
<extra-input-group addonPosition="both">
  <extra-input-group-addon position="left" type="icon" icon="ti ti-currency-dollar"></extra-input-group-addon>
  <extra-input-text placeholder="0.00" [(ngModel)]="price" name="price" [fluid]="true"></extra-input-text>
  <extra-input-group-addon position="right">USD</extra-input-group-addon>
</extra-input-group>
```

### Размер xlarge

Figma: `<InputGroup>`, addon-position=left

```html
<extra-input-group size="xlarge" addonPosition="left">
  <extra-input-group-addon position="left" type="icon" icon="ti ti-search"></extra-input-group-addon>
  <extra-input-text size="xlarge" placeholder="Поиск" [(ngModel)]="query" name="query" [fluid]="true"></extra-input-text>
</extra-input-group>
```

## Slots

- **`default` (обёртка)** — `<extra-input-group>` проецирует через `<ng-content>` дочерние `<extra-input-group-addon>` и `<extra-input-text>`. Фактическое расположение определяется порядком элементов в шаблоне; `addonPosition` на обёртке и `position` на аддоне — CSS-класс-хуки, они не переставляют DOM.
- **`default` (аддон, только при `type='text'`)** — `<extra-input-group-addon>` проецирует через `<ng-content>` текстовое содержимое (единицы измерения, символ валюты и т.п.). При `type='icon'` проекция игнорируется — рендерится `<i [class]="icon">`.

## Related

- [InputText](../inputtext/inputtext.figma.md) — поле ввода, вкладываемое в группу
- [Токены](../../figma-code-connect/tokens.md) — токены паддингов и фонов аддонов
- [Иконки](../../figma-code-connect/icons.md) — иконки для аддонов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте одинаковый `size` на `<extra-input-group>` и на вложенном `<extra-input-text>`, чтобы поле и аддоны совпадали по высоте.
- Используйте `[fluid]="true"` на `<extra-input-text>` внутри группы, чтобы поле занимало доступную ширину.
- Располагайте аддон и поле в шаблоне в нужном порядке (до поля — слева, после — справа) **и** задавайте соответствующие `addonPosition`/`position` — оба механизма должны совпадать.
- Используйте `type="icon"` + `icon` для иконочных аддонов вместо ручной вставки `<i>` в проекцию.
- Передавайте иконки в `<extra-input-group-addon>` ссылками из [icons.md](../../figma-code-connect/icons.md).

**Don't:**
- Не рассинхронизируйте `addonPosition`/`position` с фактическим порядком элементов в шаблоне — CSS-класс и реальное расположение должны совпадать, иначе стили поедут.
- Не инлайньте значения токенов паддингов/цветов аддонов — используйте [tokens.md](../../figma-code-connect/tokens.md).
- Не вкладывайте несколько `<extra-input-text>` в одну группу — обёртка рассчитана на одно поле с аддонами.
