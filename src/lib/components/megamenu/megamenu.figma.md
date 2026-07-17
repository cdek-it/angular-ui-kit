---
component: ExtraMegaMenu
selector: extra-megamenu
import:
  symbol: ExtraMegaMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '16194:4401'
  componentKey: '951a533f89eac2ebe0f8d3f7cb2a69aa2f1b995f'
  name: '<MegaMenu>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraMegaMenu` — компонент навигационного меню с многоколоночными подменю для крупной навигации. Корневые пункты раскрывают широкую панель из нескольких колонок-групп ссылок. Оборачивает PrimeNG `p-megamenu`, работает на основе модели (`model`) и поддерживает горизонтальную и вертикальную ориентацию.

Компонент соответствует Figma-компоненту `<MegaMenu>` (nodeId `16194:4401`) из библиотеки UI Kit (DS) v2.0. В отличие от `Menubar` (горизонтальное меню без многоколоночных панелей) и `TieredMenu` (каскадное меню по уровням без колонок), `MegaMenu` предназначен для верхней навигации с большим числом сгруппированных разделов.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMegaMenuItem[]` | `[]` | Модель пунктов меню (метка, иконка, ссылка, вложенные группы); определяет содержимое меню |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация меню — соответствует Figma-свойству `orientation` (варианты `horizontal`, `vertical`) |
| `breakpoint` | `string` | `'960px'` | Точка перехода в мобильный режим с кнопкой-гамбургером |
| `scrollHeight` | `string` | `''` | Максимальная высота прокручиваемой области подменю |
| `disabled` | `boolean` | `false` | Отключённое состояние всего меню |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента-метки для экранного доступа |
| `tabindex` | `number` | `0` | Порядок перехода по Tab |

## Variants

### Horizontal (горизонтальное меню)

Figma: `<MegaMenu>`, orientation=horizontal

```html
<extra-megamenu [model]="items"></extra-megamenu>
```

### Vertical (вертикальное меню)

Figma: `<MegaMenu>`, orientation=vertical

```html
<extra-megamenu [model]="items" orientation="vertical"></extra-megamenu>
```

### Disabled (отключённое меню)

Figma: `<MegaMenu>` (общий компонент; отключение задаётся в коде)

```html
<extra-megamenu [model]="items" [disabled]="true"></extra-megamenu>
```

## Slots

Кастомный шаблон пункта меню задаётся через структурную директиву `[extraMegaMenuItem]` на `ng-template`. Шаблон получает контекст с пунктом (`$implicit`) и признаком наличия подменю (`hasSubmenu`). Если шаблон не задан, используется стандартная отрисовка пункта.

```html
<extra-megamenu [model]="items">
  <ng-template extraMegaMenuItem let-item let-hasSubmenu="hasSubmenu">
    <span>{{ item.label }}</span>
  </ng-template>
</extra-megamenu>
```

## Related

- [ExtraButton](../button/button.figma.md) — кнопки в шаблонах пунктов меню
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [Иконки](../../figma-code-connect/icons.md) — иконки пунктов меню

## Do / Don't

**Do:**
- Используйте для верхней навигации с большим числом сгруппированных разделов
- Задавайте структуру меню через `[model]`, группируя ссылки в колонки
- Используйте `orientation="vertical"` для бокового многоколоночного меню
- Применяйте директиву `[extraMegaMenuItem]` для кастомной отрисовки пунктов

**Don't:**
- Не используйте `MegaMenu` для плоского меню без колонок — для этого подходит `Menubar`
- Не используйте `MegaMenu` для каскадных подменю по уровням — для этого подходит `TieredMenu`
- Не передавайте пустой `[model]` — меню окажется без пунктов
