# ToggleButton — Дизайн-документ

**Дата:** 2026-04-16  
**Ветка:** `form.togglebutton`

## Цель

Добавить компонент `ToggleButton` в Angular UI Kit: обёртку над PrimeNG `p-togglebutton` с кастомной стилизацией и Storybook-историями по образцу [Vue-референса](https://github.com/cdek-it/vue-ui-kit/tree/togglebutton).

---

## Файлы

| Файл | Назначение |
|---|---|
| `src/lib/components/togglebutton/togglebutton.component.ts` | Компонент-обёртка |
| `src/prime-preset/tokens/components/togglebutton.ts` | CSS через `dt()` |
| `src/prime-preset/map-tokens.ts` | Подключение CSS (изменить) |
| `src/stories/components/togglebutton/togglebutton.stories.ts` | Default + ре-экспорты |
| `src/stories/components/togglebutton/examples/togglebutton-sizes.component.ts` | Сетка размеров |
| `src/stories/components/togglebutton/examples/togglebutton-icons.component.ts` | С иконками |
| `src/stories/components/togglebutton/examples/togglebutton-icon-only.component.ts` | Icon-only |
| `src/stories/components/togglebutton/examples/togglebutton-disabled.component.ts` | Disabled |

---

## Компонент

**Селектор:** `toggle-button`  
**Паттерн:** `NG_VALUE_ACCESSOR` (аналог `CheckboxComponent`)

### Типы

```typescript
export type ToggleButtonSize = 'sm' | 'base' | 'lg' | 'xlg';
```

### Inputs

| Prop | Тип | Default | Описание |
|---|---|---|---|
| `onLabel` | `string` | `'Вкл'` | Текст в активном состоянии |
| `offLabel` | `string` | `'Выкл'` | Текст в неактивном состоянии |
| `onIcon` | `string \| undefined` | `undefined` | Иконка в активном состоянии |
| `offIcon` | `string \| undefined` | `undefined` | Иконка в неактивном состоянии |
| `iconPos` | `'left' \| 'right'` | `'left'` | Позиция иконки |
| `size` | `ToggleButtonSize` | `'base'` | Размер кнопки |
| `disabled` | `boolean` | `false` | Отключённое состояние |
| `iconOnly` | `boolean` | `false` | Скрывает label, делает кнопку квадратной |
| `allowEmpty` | `boolean \| undefined` | `undefined` | Разрешить снять выбор |
| `fluid` | `boolean` | `false` | Растянуть на всю ширину |
| `ariaLabel` | `string \| undefined` | `undefined` | Aria-label |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Aria-labelledby |
| `inputId` | `string \| undefined` | `undefined` | ID input-элемента |
| `tabindex` | `number \| undefined` | `undefined` | Tab index |
| `autofocus` | `boolean \| undefined` | `undefined` | Автофокус |

### Outputs

| Event | Тип | Описание |
|---|---|---|
| `onChange` | `EventEmitter<ToggleButtonChangeEvent>` | Изменение значения |

### Маппинг размеров в PrimeNG

| Наш `size` | PrimeNG `size` | Дополнительный класс |
|---|---|---|
| `'sm'` | `'small'` | — |
| `'base'` | `undefined` | — |
| `'lg'` | `'large'` | — |
| `'xlg'` | `'large'` | `p-togglebutton-xlg` |

- `iconOnly=true` → добавляет класс `p-togglebutton-icon-only` через `[ngClass]`
- Все дополнительные классы применяются через `[ngClass]` на `<p-togglebutton>`

---

## CSS-стилизация (`togglebutton.ts`)

Переносим Vue-референс (`togglebutton.ts`) с адаптацией синтаксиса на Angular:

1. **Типографика:** `fonts.fontFamily.heading`, `fonts.fontWeight.demibold`, `fonts.lineHeight.50`
2. **Hover unchecked:** `togglebutton.extend.hoverBorderColor`
3. **Hover checked:** `togglebutton.extend.checkedHoverBackground/BorderColor/Color`
4. **Размер sm:** `line-height.30`, icon `iconSize.sm`
5. **Размер base:** icon `iconSize.md`
6. **Размер lg:** `line-height.55`, gap, icon `iconSize.lg`
7. **Размер xlg:** кастомный padding, font-size, align-items, icon `iconSize.lg`
8. **Icon-only base:** `iconOnlyWidth` px width/height, `border-radius`, скрытый label
9. **Icon-only sm/lg/xlg:** отдельные `iconOnlyWidth` из `extSm`/`extLg`/`extXlg`

Все токены уже присутствуют в `tokens.json` → доработки JSON не требуются.

---

## Stories

### Default

Динамический template из `args`. Controls:

| Control | Тип |
|---|---|
| `size` | select: `'sm' \| 'base' \| 'lg' \| 'xlg'` |
| `onLabel` / `offLabel` | text |
| `onIcon` / `offIcon` | text |
| `iconPos` | select: `'left' \| 'right'` |
| `disabled` | boolean |
| `iconOnly` | boolean |
| `fluid` | boolean |

### Sizes

CSS Grid (4 строки × 3 колонки). Строки = sm, base, lg, xlg. Колонки = unchecked, checked, disabled. Используются несколько `<toggle-button>` с `[(ngModel)]` и `[disabled]`.

### Icons

Примеры: `onIcon`/`offIcon` с разными иконками, `iconPos="right"`.

### IconOnly

Сетка из 4 размеров, icon-only, unchecked/checked.

### Disabled

Отдельный компонент с `[disabled]="true"` и `[disabled]="true"` + `modelValue=true`.

---

## Ограничения

- `styleClass` на `p-togglebutton` задепрекейчен в PrimeNG v20 → используем `[ngClass]`
- Класс `p-togglebutton-xlg` не нативный PrimeNG — только наш кастомный CSS
- В stories нет `styles: [...]` — используем `const styles = ''` согласно CLAUDE.md
