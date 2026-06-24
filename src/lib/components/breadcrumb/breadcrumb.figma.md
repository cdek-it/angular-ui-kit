---
component: ExtraBreadcrumb
selector: extra-breadcrumb
import:
  symbol: ExtraBreadcrumbComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '735:7985'
  componentKey: 'feb43c0120bf06c0eeed66ed8d01ee0626851d51'
  name: '<Breadcrumb>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraBreadcrumb` — навигационный компонент «хлебные крошки», показывающий путь текущей страницы в иерархии: ссылки на родительские уровни через разделитель, последний элемент — текущая страница. Оборачивает PrimeNG `p-breadcrumb` и управляется моделью пунктов.

Компонент соответствует Figma-компоненту `<Breadcrumb>` (nodeId `735:7985`) из библиотеки UI Kit (DS) v2.0. В отличие от `Tabs`/`Menubar` (переключение разделов одного уровня) и `Stepper` (линейный прогресс процесса), breadcrumb отражает положение страницы по уровням иерархии.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMenuItem[]` | `[]` | Массив пунктов пути; последний пункт — текущая страница. Соответствует Figma-свойству `change-layout` (набор крошек) |
| `home` | `ExtraMenuItem \| undefined` | `undefined` | Корневой пункт «домой» (обычно иконка). Соответствует Figma-свойству `home` (варианты `true`, `false`) |

Каждый элемент `model` и `home` описывается интерфейсом `ExtraMenuItem`. Часто используемые поля пункта:

| Поле пункта | Тип | Описание |
|-------------|-----|---------|
| `label` | `string` | Текст крошки |
| `icon` | `string` | CSS-класс иконки крошки; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `url` | `string` | Адрес ссылки крошки |
| `routerLink` | `any` | Маршрут Angular Router для крошки |
| `disabled` | `boolean` | Отключённый пункт |

## Variants

### Home + items (с корневой иконкой)

Figma: `<Breadcrumb>`, home=true — nodeId `735:7983`

```html
<extra-breadcrumb [home]="home" [model]="model"></extra-breadcrumb>
```

```ts
home: ExtraMenuItem = { icon: 'ti ti-home', url: '#' };
model: ExtraMenuItem[] = [
  { label: 'Электроника', icon: 'ti ti-device-laptop', url: '#' },
  { label: 'Компьютеры', icon: 'ti ti-cpu', url: '#' },
  { label: 'Ноутбуки' },
];
```

### Без корневого пункта (только items)

Figma: `<Breadcrumb>`, home=false — nodeId `735:7982`

```html
<extra-breadcrumb [model]="model"></extra-breadcrumb>
```

```ts
model: ExtraMenuItem[] = [
  { label: 'Электроника', url: '#' },
  { label: 'Компьютеры', url: '#' },
  { label: 'Ноутбуки' },
];
```

### Только иконки (items без текста)

Figma: `<Breadcrumb>`, home=true, крошки без `label`

```html
<extra-breadcrumb [home]="home" [model]="model"></extra-breadcrumb>
```

```ts
home: ExtraMenuItem = { icon: 'ti ti-home', url: '#' };
model: ExtraMenuItem[] = [
  { icon: 'ti ti-device-laptop', url: '#' },
  { icon: 'ti ti-cpu', url: '#' },
  { icon: 'ti ti-book' },
];
```

## Slots

Не используются. Пункты пути передаются данными через `@Input() model` и `@Input() home` (массив объектов `ExtraMenuItem`), а не через проекцию содержимого.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки крошек (`ti ti-*`)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Делайте последний пункт `model` текущей страницей без `url`/`routerLink` — он не должен быть ссылкой
- Задавайте `home` для корневого уровня и используйте для него иконку из [icons.md](../../figma-code-connect/icons.md)
- Применяйте breadcrumb, когда иерархия глубже двух уровней и пользователю важно понимать местоположение

**Don't:**
- Не используйте breadcrumb для переключения разделов одного уровня — для этого есть `Tabs`/`Menubar`
- Не отображайте breadcrumb на главной странице или при дублирующей боковой навигации
- Не инлайньте CSS-классы иконок вслепую — сверяйтесь со справочником [icons.md](../../figma-code-connect/icons.md)
