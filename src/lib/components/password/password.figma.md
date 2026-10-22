---
component: ExtraPassword
selector: extra-password
import:
  symbol: ExtraPasswordComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '375:1701'
  componentKey: '54106946f181dd41079e1c4aafa63165cf07e065'
  name: '<Password>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraPasswordComponent` — поле ввода пароля: маскирует символы, даёт toggle показа (reveal) и опциональный индикатор надёжности. Оборачивает PrimeNG `p-password`, реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<Password>` (nodeId `375:1701`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Содержимое индикатора надёжности и подсказок настраивается структурными директивами `[extraPasswordHeader]` и `[extraPasswordFooter]`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `[(ngModel)]` / `[formControl]` | `string \| null` | `null` | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-input` |
| `feedback` | `boolean` | `true` | Показывать ли overlay-индикатор надёжности пароля |
| `toggleMask` | `boolean` | `false` | Показывать ли иконку-переключатель видимости (reveal) — соответствует Figma-свойству `show-eye` |
| `placeholder` | `string \| undefined` | `undefined` | Подсказка при пустом поле — соответствует Figma-свойствам `text-placeholder` / `has-placeholder` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; маппируется на классы PrimeNG `p-inputtext-sm` / `p-inputtext-lg` |
| `variant` | `'filled' \| 'outlined'` | `'outlined'` | Стиль оформления поля |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Положение лейбла относительно поля (игнорируется при `floatLabel=true`) |
| `floatLabel` | `boolean` | `false` | Плавающий label внутри поля — соответствует Figma-свойству `has-floatlabel`; перекрывает `labelPosition` |
| `label` | `string` | `''` | Текст лейбла поля |
| `caption` | `string` | `''` | Текст пояснения под полем |
| `info` | `string` | `''` | Текст доп. информации — показывается в тултипе иконки `ti-info-circle` рядом с лейблом |
| `promptLabel` | `string` | `'Введите пароль'` | Текст-подсказка в индикаторе надёжности при пустом поле |
| `weakLabel` | `string` | `'Слабый'` | Подпись слабого уровня надёжности |
| `mediumLabel` | `string` | `'Средний'` | Подпись среднего уровня надёжности |
| `strongLabel` | `string` | `'Надёжный'` | Подпись надёжного уровня |
| `inputStyleClass` | `string \| undefined` | `undefined` | Дополнительные CSS-классы нативного input |
| `ariaLabel` | `string \| undefined` | `undefined` | `aria-label` для доступности |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | `aria-labelledby` для доступности |
| `appendTo` | `any` | `'body'` | Куда в DOM монтируется overlay индикатора надёжности |
| `autofocus` | `boolean` | `false` | Автофокус на поле при инициализации |
| `(onFocus)` | `EventEmitter<Event>` | — | Событие получения фокуса |
| `(onBlur)` | `EventEmitter<Event>` | — | Событие потери фокуса |

`invalid` и `disabled` не публичные `@Input()`: `invalid` — computed-геттер из внедрённого
`NgControl` (автоматически `true`, когда у привязанного `formControl`/`ngModel` есть невалидные
`Validators` и поле touched/dirty по обычной Angular-логике), `disabled` — обычное поле класса,
выставляемое только через `ControlValueAccessor.setDisabledState` (`FormControl.disable()` /
`[disabled]` у `formControlName`). Было исправлено в рамках этой доработки — раньше оба были
публичными `@Input()`, что нарушает правило чеклиста в корневом `CLAUDE.md` (п.5).

`inputId` — больше не настраиваемый `@Input()`: генерируется автоматически (`extra-password-0`,
`extra-password-1`, ...) и используется только внутри компонента для связи `<label [for]>` с
полем, по прецеденту `inputmask`/`inputtext` (см. чеклист в корневом `CLAUDE.md`, п.3 про `inputId`).

## Variants

### Default / Base (базовое поле с индикатором надёжности)

Figma: `<Password>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `375:1743`

```html
<extra-password
  placeholder="Введите пароль"
  [(ngModel)]="password"
  name="password"
></extra-password>
```

### С переключателем видимости (toggleMask / show-eye)

Figma: `<Password>`, state=default, show-eye=true — nodeId `375:1743`

```html
<extra-password
  placeholder="Введите пароль"
  [toggleMask]="true"
  [(ngModel)]="password"
  name="password"
></extra-password>
```

### Без индикатора надёжности (feedback=false)

Figma: `<Password>`, state=default — nodeId `375:1743`

```html
<extra-password
  placeholder="Текущий пароль"
  [feedback]="false"
  [toggleMask]="true"
  [(ngModel)]="password"
  name="currentPassword"
></extra-password>
```

### Disabled (отключённое поле)

Figma: `<Password>`, state=disabled, has-placeholder=true, has-floatlabel=false — nodeId `375:1702`

```html
<extra-password
  placeholder="Недоступно"
  [formControl]="disabledControl"
></extra-password>
```

```ts
disabledControl = new FormControl({ value: '', disabled: true });
```

### С реактивной формой и валидацией (state=danger)

Figma: `<Password>`, state=danger, has-placeholder=true, has-floatlabel=false — nodeId `375:1712`.
`invalid` не задаётся вручную — вычисляется автоматически из состояния `formControl`
(`invalid && touched`, обычная Angular-логика через внедрённый `NgControl`):

```ts
passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
```

```html
<extra-password placeholder="Минимум 8 символов" [formControl]="passwordControl"></extra-password>
```

### С плавающим label (floatLabel / has-floatlabel)

Figma: `<Password>`, state=default, has-placeholder=false, has-floatlabel=true — nodeId `13986:10640`

```html
<extra-password
  [floatLabel]="true"
  label="Пароль"
  [(ngModel)]="password"
  name="password"
></extra-password>
```

### С лейблом сверху/слева (labelPosition)

Figma: `<Password>` (общий компонент; положение лейбла задаётся в коде, `floatLabel=false`)

```html
<extra-password label="Пароль" [(ngModel)]="password" name="password"></extra-password>

<extra-password labelPosition="left" label="Пароль" [(ngModel)]="password" name="password"></extra-password>
```

### С подписью и подсказкой (caption / info)

Figma: `<Password>` (общий компонент; подпись и тултип задаются в коде)

```html
<extra-password
  label="Пароль"
  caption="Минимум 8 символов, хотя бы одна цифра"
  info="Пароль хранится в зашифрованном виде"
  [(ngModel)]="password"
  name="password"
></extra-password>
```

### Fluid / Large (на всю ширину, большой размер)

Figma: `<Password>`, state=default — nodeId `375:1743`

```html
<extra-password
  size="large"
  [fluid]="true"
  placeholder="Широкое поле"
  [(ngModel)]="password"
  name="password"
></extra-password>
```

## Slots

| Слот | Синтаксис | Описание |
|------|-----------|---------|
| Заголовок индикатора | `<ng-template extraPasswordHeader>` | Содержимое над списком требований в overlay надёжности; импортируйте `ExtraPasswordHeaderDirective` из `'@cdek-it/angular-ui-kit'` |
| Футер индикатора | `<ng-template extraPasswordFooter>` | Содержимое под индикатором надёжности (список правил, ссылки); импортируйте `ExtraPasswordFooterDirective` из `'@cdek-it/angular-ui-kit'` |

Директивы `ExtraPasswordHeaderDirective` и `ExtraPasswordFooterDirective` экспортируются из `@cdek-it/angular-ui-kit` и объявляются как `standalone: true` — добавляйте их в массив `imports` компонента отдельно от `ExtraPasswordComponent`. Слоты проецируются только при `feedback=true`.

```html
<extra-password
  placeholder="Придумайте пароль"
  [(ngModel)]="password"
  name="newPassword"
>
  <ng-template extraPasswordHeader>
    <span class="font-semibold">Требования к паролю</span>
  </ng-template>
  <ng-template extraPasswordFooter>
    <ul>
      <li>Минимум 8 символов</li>
      <li>Хотя бы одна цифра</li>
    </ul>
  </ng-template>
</extra-password>
```

```ts
import {
  ExtraPasswordComponent,
  ExtraPasswordHeaderDirective,
  ExtraPasswordFooterDirective
} from '@cdek-it/angular-ui-kit';
```

## Для дизайнера: CSS-классы label/caption (TODO)

Шаблон `ExtraPasswordComponent` оборачивает поле в `.extra-password` / `.extra-password-label` /
`.extra-password-caption` / `.extra-password-label-icon` (по той же структуре, что `inputmask`,
см. `src/lib/providers/prime-preset/tokens/components/inputmask.ts`), но `tokens/components/password.ts`
пока не содержит стилей под эти классы — раскладка без них будет сломана (инлайновый `<label>`
встанет в одну строку с полем вместо `labelPosition="top"`, слева не выровняется по высоте поля).
Нужно добавить в `tokens/components/password.ts` блок, аналогичный `inputmaskCss`, с классами
`.extra-password`, `.extra-password--left`, `.extra-password-body`, `.extra-password-label`,
`.extra-password-label-icon`, `.extra-password-caption` (CSS-правила можно скопировать из
`inputmask.ts` 1:1, заменив префикс `extra-inputmask` на `extra-password`). Эта правка — зона
дизайнера (см. «Не трогать» в корневом `CLAUDE.md`), агент её не вносит.

## Related

- [InputMask](../inputmask/inputmask.figma.md) — референс для CSS label/caption/info-обёртки
- [InputText](../inputtext/inputtext.figma.md) — однострочное текстовое поле без маскирования
- [Button](../button/button.figma.md) — кнопка отправки формы аутентификации
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Включайте `[toggleMask]="true"`, чтобы дать пользователю возможность сверить введённый пароль.
- Включайте `[feedback]="true"` на экранах регистрации и смены пароля; для поля «текущий пароль» при входе ставьте `[feedback]="false"`.
- Локализуйте `promptLabel`, `weakLabel`, `mediumLabel`, `strongLabel` под язык интерфейса.

**Don't:**
- Не подменяйте `value` через прямой DOM — теряется `dirty`-state и Angular-реактивность.
- `disabled` не публичный `@Input()` — отключайте поле только через `FormControl.disable()` /
  `[disabled]` у `formControlName`, напрямую атрибутом в шаблоне это не сработает.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
- Не используйте `extra-password` для одноразовых кодов — для этого предназначен InputOTP.
