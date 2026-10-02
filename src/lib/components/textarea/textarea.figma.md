---
component: ExtraTextarea
selector: extra-textarea
import:
  symbol: ExtraTextareaComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '309:1582'
  componentKey: 'a4d238e342705216c67068f12f4b28da12094ab7'
  name: '<Textarea>'
status: stable
updated: '2026-10-03'
---

## Overview

`ExtraTextareaComponent` — многострочное поле для ввода длинного произвольного текста (комментарий, описание, заметка). Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки». Сам рисует `label`/`caption`/`info` рядом с собой, по тому же принципу, что `ExtraInputText` (см. `docs/components-api/common-info.md` и чеклист в корневом `CLAUDE.md`, раздел «Label / caption / info») — отдельная обёртка `<extra-form-field>` не нужна.

Компонент соответствует Figma-компоненту `<Textarea>` (nodeId `309:1582`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст названия поля |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Положение лейбла — соответствует Figma, но без устаревшего третьего значения `float` (вынесено в `floatLabel`, см. `docs/naming-rules.md`) |
| `floatLabel` | `boolean` | `false` | Лейбл-плейсхолдер, всплывающий над полем — отдельный переключатель, а не третье значение `labelPosition`; при `true` значение `labelPosition` для позиционирования лейбла не используется |
| `caption` | `string` | `''` | Пояснение под полем |
| `info` | `string` | `''` | Текст тултипа иконки `ti-info-circle` рядом с лейблом |
| `clearable` | `boolean` | `false` | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear`; имя приведено к `*able`-конвенции (было `showClear`) |
| `resizable` | `boolean` | `true` | Разрешает нативный resize-уголок (`resize: vertical` / `none`) — отдельная от `autoResize` возможность, чистый CSS-хук без PrimeNG-аналога |
| `placeholder` | `string` | `''` | Подсказка при пустом поле |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; `small`/`large` маппируются на PrimeNG `pSize`, `xlarge` — на CSS-класс `p-textarea-xlg` |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `autoResize` | `boolean` | `false` | Автоподстройка высоты под содержимое при вводе — соответствует Figma-свойству `show-resize`. Независима от `resizable`: можно одновременно разрешить и авто-рост, и ручное перетаскивание |
| `rows` | `number` | `3` | Стартовая высота поля в строках |
| `cols` | `number \| undefined` | `undefined` | Ширина поля в символах |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента; у `pTextarea` нет своего `autofocus`-инпута (это директива на нативном элементе, а не полноценная обёртка как `RadioButton`/`ToggleButton`) — проп пробрасывается напрямую в нативный HTML-атрибут `<textarea>` |
| `(onResize)` | `EventEmitter<ExtraTextareaResizeEvent>` | — | Событие при изменении высоты поля пользователем |
| `(onClear)` | `EventEmitter<void>` | — | Событие при нажатии на иконку очистки (только при `clearable=true`) |
| `[(ngModel)]` / `[formControl]` | `string` | `''` | Значение поля через ControlValueAccessor |

> `invalid` и `disabled` — не публичные `@Input()`: `invalid` вычисляется из связанного `NgControl`
> (Figma-состояние `state=danger`), `disabled` — только через `ControlValueAccessor.setDisabledState`
> (`FormControl.disable()`), см. чеклист в `CLAUDE.md`, п.5.

### ⚠️ CSS для label/caption — зона дизайнера, пока отсутствует

В `tokens/components/textarea.ts` сейчас нет классов `.extra-textarea`/`.extra-textarea-body`/
`.extra-textarea-label`/`.extra-textarea-caption` — агент их не добавлял (см. «Не трогать» в
`CLAUDE.md`). Без этого CSS `labelPosition="left"` отрисуется визуально неправильно (div — блочный
элемент, лейбл встанет над полем, а не рядом) — ровно та же ловушка, что уже описана комментарием в
`tokens/components/inputtext.ts`. Сниппет для дизайнера, 1:1 адаптированный с уже рабочего
`inputtext.ts` под имена классов textarea:

```ts
.extra-textarea {
  display: flex;
  flex-direction: column;
}

.extra-textarea--left {
  flex-direction: row;
  align-items: flex-start;
  gap: ${dt('dimension.space.200')};
}

.extra-textarea--left > .extra-textarea-label {
  padding-block: calc(${dt('textarea.root.paddingY')} + ${dt('textarea.extend.borderWidth')});
}

.extra-textarea-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${dt('dimension.space.100')};
}

.extra-textarea-body .p-iconfield:has(.p-textarea-fluid),
.extra-textarea-body > .p-floatlabel:has(.p-textarea-fluid) {
  width: 100%;
}

.extra-textarea--left > .extra-textarea-body {
  flex: 1 1 auto;
  min-width: 0;
}

.extra-textarea-label {
  display: inline-flex;
  align-items: center;
  gap: ${dt('dimension.space.100')};
  color: ${dt('color.fg.default')};
  font-family: ${dt('fonts.fontFamily.base')};
  font-size: ${dt('fonts.fontSize.300')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.300')};
  cursor: pointer;
}

.extra-textarea-label-icon {
  color: ${dt('color.fg.subtle')};
  font-size: ${dt('textarea.extend.iconSize')};
  cursor: help;
}

.extra-textarea-caption {
  color: ${dt('color.fg.subtle')};
  font-family: ${dt('fonts.fontFamily.heading')};
  font-size: ${dt('fonts.fontSize.200')};
  font-weight: ${dt('fonts.fontWeight.regular')};
  line-height: ${dt('fonts.lineHeight.250')};
}

.extra-textarea-body > .p-floatlabel > .extra-textarea-label {
  cursor: text;
}
```

До добавления этого CSS лейбл/caption рендерятся функционально верно (DOM корректный,
`labelPosition="top"` — единственный реально использовавшийся до этой доработки режим — выглядит
нормально), но `labelPosition="left"` сломан визуально.

## Variants

### Default / Base (базовое поле)

Figma: `<Textarea>`, state=default, placeholder=true, has-floatlabel=false — nodeId `309:1608`

```html
<extra-textarea placeholder="Введите текст..." [(ngModel)]="value" name="comment"></extra-textarea>
```

### С лейблом и пояснением

```html
<extra-textarea
  label="Комментарий"
  caption="Видно только менеджеру"
  info="Не публикуется на сайте"
  [(ngModel)]="comment"
></extra-textarea>

<!-- лейбл слева -->
<extra-textarea label="Комментарий" labelPosition="left" [(ngModel)]="comment"></extra-textarea>
```

### Float label

Figma: `<Textarea>`, has-floatlabel=true

```html
<extra-textarea label="Комментарий" [floatLabel]="true" [(ngModel)]="comment"></extra-textarea>
```

### С кнопкой очистки (clearable)

Figma: `<Textarea>`, state=default, show-clear=true — nodeId `309:1608`

```html
<extra-textarea placeholder="Комментарий..." [clearable]="true" [(ngModel)]="comment" name="comment"></extra-textarea>
```

### Без ручного resize (resizable=false)

```html
<extra-textarea placeholder="Фиксированная высота" [resizable]="false" [rows]="4" [(ngModel)]="value"></extra-textarea>
```

### Автоподстройка высоты (autoResize)

Figma: `<Textarea>`, show-resize=true — nodeId `309:1608`

```html
<extra-textarea placeholder="Описание..." [autoResize]="true" [(ngModel)]="description" name="description"></extra-textarea>
```

### Disabled (отключённое поле)

Figma: `<Textarea>`, state=disabled — nodeId `309:1583`

```html
<extra-textarea placeholder="Недоступно" [formControl]="disabledControl"></extra-textarea>
```

```ts
disabledControl = new FormControl({ value: '', disabled: true });
```

### Readonly (только для чтения)

Figma: `<Textarea>`, state=readonly — nodeId `14980:20329`

```html
<extra-textarea [readonly]="true" [(ngModel)]="readonlyValue" name="roField"></extra-textarea>
```

### С реактивной формой (formControl + валидация)

Figma: `<Textarea>`, state=danger, placeholder=true — nodeId `309:1589` (невалидное состояние определяется через NgControl автоматически)

```ts
descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(500)]);
```

```html
<extra-textarea label="Описание проблемы" [formControl]="descriptionControl"></extra-textarea>
```

## Slots

Не используются. `label`/`caption`/`info` — не слоты, а обычные `@Input()` (см. Props mapping).

## Related

- [InputText](../inputtext/inputtext.figma.md) — однострочное поле с тем же паттерном label/caption/info (но пока со старым тройным `labelPosition` — не копировать)
- [InputGroup](../inputgroup/inputgroup.figma.md) — обёртка с prefix/suffix-слотами
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor`.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()`.
- Задавайте `label`/`caption`/`info` напрямую на компоненте — отдельная обёртка не нужна.
- Включайте `[autoResize]="true"` при непредсказуемом объёме текста.
- Используйте `[resizable]="false"`, когда высота поля должна быть фиксированной (например, внутри плотного layout'а).
- Для сброса поля через иконку × включайте `[clearable]="true"` и подписывайтесь на `(onClear)` при необходимости пост-обработки.

**Don't:**
- Не подменяйте `value` через прямой DOM — теряется `dirty`-state и Angular-реактивность.
- Не задавайте `[disabled]="true"` как `@Input` — компонент его не объявляет; передавайте через `FormControl`.
- Не комбинируйте `labelPosition="left"` с ожиданием, что оно повлияет на `floatLabel=true` — при включённом `floatLabel` лейбл всегда всплывает над полем независимо от `labelPosition`.
- Не используйте `extra-textarea` для короткого однострочного текста — для него [InputText](../inputtext/inputtext.figma.md).
