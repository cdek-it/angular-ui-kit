[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24068-103064&m=dev)

# ExtraMenu

> ✅ **Реализован**: `ExtraMenuComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

## Свойства

| Свойство | Описание | Типизация | По умолчанию |
| --- | --- | --- | --- |
| `items` | пункты меню | `MenuItem[]` | `[]` |
| `popup` | режим всплывающего меню | `boolean` | `false` |
| `open` | видимость всплывающего меню (управляемое состояние) | `boolean` | `false` |
| `appendTo` | контейнер рендера всплывающего меню | `'body' \| 'self' \| ElementLike` | `'body'` |
| `ariaLabel` | доступное имя меню | `string` | — |

## События

| Событие | Описание | Типизация |
| --- | --- | --- |
| `onItemSelect` | выбран пункт меню | `(event: MenuItemSelectEvent) => void` |
| `onOpenChange` | всплывающее меню открылось или закрылось | `(open: boolean) => void` |

## Методы

| Метод | Описание | Типизация |
| --- | --- | --- |
| `toggle` | переключить всплывающее меню | `(anchor?: AnchorLike) => void` |
| `show` | открыть всплывающее меню | `(anchor?: AnchorLike) => void` |
| `hide` | закрыть всплывающее меню | `() => void` |

`AnchorLike` — элемент, ref или координаты, относительно которых позиционируется меню.
В вебе допускается передача `Event` — якорь вычисляется из `event.currentTarget`.

## Слоты

| Слот | Описание | Контекст |
| --- | --- | --- |
| `item` | кастомный рендер пункта меню | `MenuAction` |
| `submenuHeader` | кастомный рендер заголовка группы | `MenuGroup` |
| `start` | произвольный контент перед списком | — |
| `end` | произвольный контент после списка | — |

## MenuItem

Пункт меню — размеченное объединение трёх сущностей.

```ts
type MenuItem = MenuAction | MenuGroup | MenuSeparator;
```

### MenuAction

| Свойство | Описание | Типизация |
| --- | --- | --- |
| `label` | текст пункта | `string` |
| `caption` | текст пояснения под лейблом | `string` |
| `icon` | иконка перед текстом | `IconName` |
| `iconEnd` | иконка после текста | `IconName` |
| `selected` | пункт отмечен как выбранный | `boolean` |
| `disabled` | пункт заблокирован | `boolean` |
| `visible` | пункт отображается | `boolean` |
| `href` | ссылка, на которую ведёт пункт | `string` |
| `target` | атрибут `target` ссылки | `string` |
| `command` | обработчик клика по пункту | `(event: MenuItemSelectEvent) => void` |
| `id` | идентификатор пункта | `string` |

`icon` и `iconEnd` принимают имя иконки из справочника, а не CSS-класс — см.
[icons.md](../../figma-code-connect/icons.md).

### MenuGroup

| Свойство | Описание | Типизация |
| --- | --- | --- |
| `label` | заголовок группы | `string` |
| `items` | пункты группы | `MenuAction[]` |
| `visible` | группа отображается | `boolean` |
| `id` | идентификатор группы | `string` |

Вложенность ограничена одним уровнем: группа содержит только `MenuAction`.

### MenuSeparator

| Свойство | Описание | Типизация |
| --- | --- | --- |
| `separator` | разделитель между пунктами | `true` |

## MenuItemSelectEvent

| Свойство | Описание | Типизация |
| --- | --- | --- |
| `item` | выбранный пункт | `MenuAction` |
| `originalEvent` | исходное событие | `unknown` |


