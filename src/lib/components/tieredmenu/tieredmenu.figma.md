---
component: ExtraTieredMenu
selector: extra-tieredmenu
import:
  symbol: ExtraTieredMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '18204:57983'
  componentKey: 'edd218458f3543fe03731107b9cebf1a8810aa17'
  name: '<TieredMenu>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraTieredMenu` — вертикальное иерархическое меню с каскадными подменю, которые раскрываются вложенными оверлеями при наведении или фокусе на родительском пункте. Оборачивает PrimeNG `p-tieredmenu` и принимает дерево пунктов через единственную модель `model`.

Компонент соответствует Figma-компоненту `<TieredMenu>` (nodeId `18204:57983`) из библиотеки UI Kit (DS) v2.0. В отличие от `Menu` (плоский список без каскадов), `Menubar` (горизонтальная строка) и `PanelMenu` (аккордеон с раскрытием на месте), `ExtraTieredMenu` показывает вложенные подменю всплывающими панелями. Структура пунктов (`label`, `icon`, вложенность через `items[].items`) задаётся данными, а не Figma-свойствами компонента.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMenuItem[]` | `[]` | Дерево пунктов меню; вложенность задаётся полем `items` каждого пункта — соответствует Figma-структуре пунктов и подменю |
| `autoDisplay` | `boolean` | `true` | Раскрывать подменю при наведении на родительский пункт |
| `tabindex` | `number \| undefined` | `undefined` | Порядок фокуса при навигации клавиатурой |

Поля пункта `ExtraMenuItem` (передаются внутри `model`):

| Поле | Тип | Описание |
|------|-----|---------|
| `label` | `string` | Текст пункта |
| `icon` | `string` | CSS-класс иконки пункта; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `items` | `ExtraMenuItem[]` | Вложенные пункты подменю (каскад) |
| `separator` | `boolean` | Пункт-разделитель между группами |
| `disabled` | `boolean` | Отключённый пункт |
| `badge` | `string` | Текст бейджа пункта |
| `command` | `(event) => void` | Обработчик клика по пункту |
| `url` / `routerLink` | `string \| any` | Переход по пункту-ссылке |

## Variants

### Базовое меню с вложенными подменю

Figma: `<TieredMenu>`, nodeId `18204:57983`

```html
<extra-tieredmenu [model]="items"></extra-tieredmenu>
```

```ts
items: ExtraMenuItem[] = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    items: [
      { label: 'Новые' },
      { label: 'В обработке' },
      { label: 'Возвраты', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] },
    ],
  },
  { label: 'Маршруты' },
  { label: 'Настройки', icon: 'ti ti-settings', disabled: true },
];
```

### Без авто-раскрытия по наведению (autoDisplay=false)

Figma: `<TieredMenu>` (поведение задаётся в коде)

```html
<extra-tieredmenu [model]="items" [autoDisplay]="false"></extra-tieredmenu>
```

### С порядком фокуса для клавиатуры (tabindex)

Figma: `<TieredMenu>` (значение задаётся в коде)

```html
<extra-tieredmenu [model]="items" [tabindex]="0"></extra-tieredmenu>
```

### Кастомный шаблон пункта

Figma: `<TieredMenu>` (содержимое пункта задаётся через слот `#item`)

```html
<extra-tieredmenu [model]="items">
  <ng-template #item let-item let-hasSubmenu="hasSubmenu">
    <a class="p-tieredmenu-item-link flex items-center gap-2 w-full">
      @if (item.icon) {
        <span [class]="'p-tieredmenu-item-icon ' + item.icon"></span>
      }
      <span class="p-tieredmenu-item-label">{{ item.label }}</span>
      @if (hasSubmenu) {
        <span class="p-tieredmenu-submenu-icon ti ti-chevron-right"></span>
      }
    </a>
  </ng-template>
</extra-tieredmenu>
```

## Slots

- **`#item`** — шаблонный слот (`<ng-template #item let-item let-hasSubmenu="hasSubmenu">`) для кастомного отображения пункта меню. Контекст: `item` — текущий `ExtraMenuItem`, `hasSubmenu` — признак наличия вложенных пунктов. Без слота пункт рендерится по полям модели (`label`, `icon`).

## Related

- [Icons](../../figma-code-connect/icons.md) — доступные иконки (`ti ti-*`) для пунктов меню
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте для иерархической навигации и многоуровневых наборов действий со всплывающими подменю
- Задавайте структуру через `model` и вложенность `items`, а не через отдельные компоненты
- Используйте слот `#item` для пунктов с описанием, бейджем или нестандартной разметкой
- Группируйте пункты разделителями (`separator: true`) для логических блоков

**Don't:**
- Не используйте `ExtraTieredMenu` для плоского списка действий без каскадов — для этого есть `Menu`
- Не применяйте для раскрытия подменю на месте (аккордеон) — для этого есть `PanelMenu`
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не делайте вложенность глубже 3 уровней — каскад подменю станет неудобным для навигации
