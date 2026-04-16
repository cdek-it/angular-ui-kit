# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular component library (`@cdek-it/angular-ui-kit`) based on PrimeNG for CDEK logistics storefronts.

## Commands

```bash
npm run storybook     # Dev server on port 6006
npm run build         # Build library
```

## Architecture

### Component System

- Компоненты живут в `src/lib/components/<name>/`
- Stories и примеры — в `src/stories/components/<name>/`
- Токены темы — в `src/prime-preset/tokens/tokens.json`
- CSS-переопределения компонентов — в `src/prime-preset/tokens/components/<component>.ts`, подключаются через `src/prime-preset/map-tokens.ts`

### CSS-переменные из токенов темы

PrimeNG генерирует CSS-переменные из `tokens.json` по правилу:
- Путь токена → kebab-case, с префиксом `--p-`
- Ключ `extend` **исключён** из имени переменной

Примеры:
```
primitive.fonts.fontFamily.base      → --p-fonts-font-family-base
primitive.fonts.fontSize.300         → --p-fonts-font-size-300
semantic.colorScheme.light.text.color → --p-text-color
button.extend.disabledBackground     → --p-button-extend-disabled-background
```

### Глобальные CSS-классы компонентов

Типографика и кастомные стили — через `dt()`-функцию в `src/prime-preset/tokens/components/<component>.ts`:

```typescript
export const checkboxCss = ({ dt }: { dt: (token: string) => string }): string => `
  .checkbox-label {
    color: ${dt('text.color')};
    font-family: ${dt('fonts.fontFamily.base')};
    font-size: ${dt('fonts.fontSize.300')};
  }
`;
```

Подключить в `map-tokens.ts`:
```typescript
import { checkboxCss } from './tokens/components/checkbox';
// ...
checkbox: { ...tokens.components.checkbox, css: checkboxCss }
```

## Storybook — паттерны

### Стилизация

Вёрстка в story-примерах (`src/stories/`) — **только через Tailwind-классы**, без inline `style="..."`.

```html
<!-- ❌ -->
<div style="display: flex; align-items: center; gap: 14px;">

<!-- ✅ -->
<div class="flex items-center gap-3.5">
```

Не использовать `styles: [...]` в декораторе Angular-компонента — webpack кодирует CSS в base64 и вставляет в путь файла, что приводит к ошибке `File name too long`. Использовать `const styles = ''`.

### Паттерн example-компонентов

Каждый файл в `examples/` экспортирует **и компонент, и `StoryObj`**. `StoryObj` рендерит компонент по его selector, а `source.code` содержит полный TypeScript-код для копирования.

```typescript
import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { XxxComponent } from '../../../../lib/components/xxx/xxx.component';

const template = `
<div class="bg-surface-ground">
  <extra-xxx prop="value"></extra-xxx>
</div>
`;
const styles = '';

@Component({
  selector: 'app-xxx-variant',
  standalone: true,
  imports: [XxxComponent],
  template,
  styles,
})
export class XxxVariantComponent {}

export const Variant: StoryObj = {
  render: () => ({
    template: `<app-xxx-variant></app-xxx-variant>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Описание на русском.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { XxxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-xxx-variant',
  standalone: true,
  imports: [XxxComponent],
  template: \`
    <extra-xxx prop="value"></extra-xxx>
  \`,
})
export class XxxVariantComponent {}
        `,
      },
    },
  },
};
```

В `{name}.stories.ts` вариационные сторисы **не дублируются** — только ре-экспортируются из example-файлов:

```typescript
import { XxxVariantComponent, Variant } from './examples/xxx-variant.component';
// ...
moduleMetadata({ imports: [XxxComponent, XxxVariantComponent] })
// ...
export { Variant };  // ← вместо inline StoryObj
```

`Default` остаётся в `{name}.stories.ts` как динамический render с `commonTemplate + args`.

### Структура stories

Каждая story — **один экземпляр компонента**, вариации через Controls:

```typescript
export const Invalid: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `<checkbox [binary]="true" [invalid]="invalid" [(ngModel)]="checked"></checkbox>`,
  }),
  args: { invalid: true },
};
```

`render: (args) => ({ props: args, template: '...' })` — обязательно для работы Controls. Wrapper-компоненты (`app-*`) допустимы только в `source.code` или со `parameters: { controls: { disable: true } }`.

## Angular Form Components (ControlValueAccessor)

### Паттерн: NgControl вместо NG_VALUE_ACCESSOR

Компоненты, реализующие `ControlValueAccessor`, **не должны** иметь `@Input() invalid` и `@Input() disabled`. Состояние читается из `FormControl` через инъекцию `NgControl`.

```typescript
// providers: [] — NG_VALUE_ACCESSOR не нужен

constructor(@Optional() @Self() private ngControl: NgControl) {
  if (ngControl) ngControl.valueAccessor = this;
}

get isInvalid(): boolean {
  return !!this.ngControl?.invalid;   // реагирует на Validators
}

get isDisabled(): boolean {
  return this._disabled;              // обновляется через setDisabledState
}

private _disabled = false;

setDisabledState(isDisabled: boolean): void {
  this._disabled = isDisabled;
}
```

Поддерживает автоматически: `control.disable()`, `Validators.*`, `control.setErrors({...})`, `new FormControl({ value: false, disabled: true })`.

### Альтернатива: NG_VALUE_ACCESSOR + полный ControlValueAccessor

Если NgControl недоступен или нужна встроенная валидация через `Validator` интерфейс — использовать классический подход с регистрацией через DI:

```typescript
@Component({
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MyComponent), multi: true },
    { provide: NG_VALIDATORS,     useExisting: forwardRef(() => MyComponent), multi: true },
  ]
})
export class MyComponent implements ControlValueAccessor, Validator {
  private onChange = (_: any) => {};   // инициализировать пустыми функциями!
  private onTouched = () => {};

  writeValue(value: any): void { /* обновить внутреннее состояние */ }
  registerOnChange(fn: (v: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { /* enable/disable внутренние контролы */ }

  // Встроенная валидация — вызывается Angular Forms автоматически
  validate(control: AbstractControl): ValidationErrors | null {
    return /* null если ок, объект ошибок если нет */;
  }

  // При изменении значения пользователем:
  onUserChange(newValue: any): void {
    this.onChange(newValue);   // уведомить Forms
    this.onTouched();          // пометить как touched
  }
}
```

**Когда использовать NG_VALUE_ACCESSOR вместо NgControl:**
- Компонент содержит вложенный `FormGroup` (sub-form) и делегирует `writeValue` / `setDisabledState` вниз
- Нужна встроенная валидация через `validate()` без внешних валидаторов

### Кастомные валидаторы

#### Валидатор поля (ValidatorFn)

```typescript
export function myValidator(config?: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (/* ок */) return null;
    return { myError: true };           // или { myError: { details: '...' } }
  };
}

// Применение:
new FormControl('', [Validators.required, myValidator()])

// Или с updateOn:
new FormControl('', {
  validators: [Validators.required, myValidator()],
  asyncValidators: [asyncCheck(service)],
  updateOn: 'blur',   // 'change' | 'blur' | 'submit'
})
```

#### Асинхронный валидатор (AsyncValidatorFn)

```typescript
export function asyncCheck(service: MyService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    service.check(control.value).pipe(
      map(exists => exists ? { alreadyExists: true } : null)
    );
}
```

Пока async-валидатор выполняется Angular добавляет класс `ng-pending`. Использовать `updateOn: 'blur'` чтобы не делать HTTP-запрос на каждый символ.

#### Валидатор группы (form-level)

```typescript
export function dateRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end   = group.get('endDate')?.value;
    return start && end && start > end ? { dateRange: true } : null;
  };
}

// Применение на уровне FormGroup:
this.fb.group({ startDate: [''], endDate: [''] }, { validators: dateRangeValidator() })
```

#### Директива-валидатор для template-driven форм

```typescript
@Directive({
  selector: '[myValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MyValidatorDirective, multi: true }]
})
export class MyValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return myValidator()(control);
  }
}
```

Без `NG_VALIDATORS` в providers метод `validate()` не будет вызван.

#### Отображение ошибок в шаблоне

```html
<div *ngIf="form.get('field')?.errors?.['myError']">Сообщение об ошибке</div>
```

### Вложенный sub-form компонент

```typescript
export class AddressFormComponent implements ControlValueAccessor, Validator, OnDestroy {
  form = new FormGroup({ street: new FormControl(''), city: new FormControl('') });
  private sub = this.form.valueChanges.subscribe(v => this.onChange(v));

  writeValue(v: any): void       { if (v) this.form.setValue(v, { emitEvent: false }); }
  setDisabledState(d: boolean)   { d ? this.form.disable() : this.form.enable(); }
  validate(): ValidationErrors | null { return this.form.valid ? null : { address: this.form.errors }; }
  ngOnDestroy(): void            { this.sub.unsubscribe(); }
}
```

### Stories для form-компонентов

```typescript
// Disabled
control = new FormControl({ value: false, disabled: true });

// Invalid (через валидатор)
control = new FormControl(false, [Validators.requiredTrue]);
```

Импортировать `ReactiveFormsModule` (не `FormsModule`) в `imports` примера-компонента.

### Storybook argTypes для CVA-компонентов

CVA-компоненты, использующие NgControl-паттерн, **не имеют** `@Input() disabled` и `@Input() invalid`. Эти поля отсутствуют в публичном API компонента, поэтому их **нельзя включать** в `argTypes` и `args` в `{name}.stories.ts` — TypeScript выдаст ошибку `TS2561: Object literal may only specify known properties`.

```typescript
// ❌ disabled не является @Input() — TS-ошибка
argTypes: {
  disabled: { control: 'boolean' },
}
args: { disabled: false }

// ✅ disabled управляется только через FormControl — выделить в отдельный пример-стори
```

Для демонстрации disabled-состояния использовать отдельный example-компонент с `[formControl]="control"`, где `control = new FormControl({ value: ..., disabled: true })`.

## PrimeNG Angular vs PrimeVue: p-focus и активное состояние

В PrimeNG Angular класс `p-focus` на элементах меню управляется через `focusedItem` signal. При потере фокуса (`blur`) PrimeNG вызывает `focusedItem.set(null)` — класс `p-focus` сбрасывается. В PrimeVue этого не происходит, поэтому CSS из Vue-версии с `p-focus` нельзя переносить 1-в-1.

### Решение: кастомный класс + ngAfterViewChecked

Для компонентов меню, где нужно сохранять визуальное выделение кликнутого пункта:

1. Сохранять `id` кликнутого `<li>` в поле компонента через `@HostListener('click')`
2. Игнорировать клики по заголовкам панелей (`.p-panelmenu-header`)
3. Проставлять кастомный CSS-класс (например `p-panelmenu-item-active`) по `id` в `ngAfterViewChecked` — это гарантирует восстановление класса после перерисовки DOM PrimeNG (анимации раскрытия подменю)

```typescript
export class PanelMenuComponent implements AfterViewChecked {
  private activeItemId: string | null = null;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onItemClick(event: MouseEvent): void {
    if ((event.target as Element).closest('.p-panelmenu-header')) return;
    const item = (event.target as Element).closest('.p-panelmenu-item');
    if (!item) return;
    this.activeItemId = item.id || null;
    this.applyActiveClass();
  }

  ngAfterViewChecked(): void {
    if (this.activeItemId) this.applyActiveClass();
  }

  private applyActiveClass(): void {
    const root = this.el.nativeElement;
    root.querySelectorAll('.p-panelmenu-item-active')
      .forEach(el => el.classList.remove('p-panelmenu-item-active'));
    if (this.activeItemId) {
      root.querySelector(`#${CSS.escape(this.activeItemId)}`)
        ?.classList.add('p-panelmenu-item-active');
    }
  }
}
```

В CSS: стили для кастомного класса `p-panelmenu-item-active` + оставлять `p-focus` для клавиатурной навигации.

## PrimeNG 20: кастомные шаблоны через pTemplate

В PrimeNG 20 передача кастомного шаблона в компонент (Listbox, Select и др.) требует директивы `pTemplate`, а не hash-reference (`#option`):

```html
<!-- ❌ Не работает в PrimeNG 20 -->
<p-listbox ...>
  <ng-template #option let-item>...</ng-template>
</p-listbox>

<!-- ✅ Правильно -->
<p-listbox ...>
  <ng-template pTemplate="item" let-item>...</ng-template>
</p-listbox>
```

Имена шаблонов (`"item"`, `"group"`, `"header"` и др.) — см. в `node_modules/primeng/<component>/index.d.ts`, поле `_itemTemplate`, `_groupTemplate` и т.д.

Для использования `pTemplate` нужно импортировать `SharedModule` из `primeng/api`:

```typescript
import { SharedModule } from 'primeng/api';

@Component({
  imports: [Listbox, SharedModule, ReactiveFormsModule],
})
```

### Кастомный шаблон элемента списка (Listbox Custom)

Иконка и текстовый блок — **прямые потомки слота** (`ng-template`). Flex-раскладку обеспечивает `.p-listbox-option` из CSS:

```html
<ng-template pTemplate="item" let-item>
  <i [class]="item.icon"></i>
  <div class="p-listbox-option-label-group">
    <span>{{ item.name }}</span>
    <small class="p-listbox-option-caption">{{ item.description }}</small>
  </div>
</ng-template>
```

CSS для `.p-listbox-option`:
- По умолчанию `align-items: center` — для однострочных элементов (checkmark, обычный список)
- Только при наличии `.p-listbox-option-label-group` → `align-items: flex-start` (многострочный контент: иконка + заголовок + подпись)

```css
.p-listbox-option { align-items: center; }
.p-listbox-option:has(.p-listbox-option-label-group) { align-items: flex-start; }
```

Подпись (`.p-listbox-option-caption`) использует `fonts.fontFamily.heading`.

## Высота превью для компонентов с выпадающими списками

Компоненты с выпадающими подменю (Menubar, TieredMenu и др.) требуют минимальной высоты превью, чтобы раскрытое подменю не обрезалось. Оборачивать в `<div class="min-h-[300px]">` в **template компонента-примера**, но **не включать** эту обёртку в `source.code`:

```typescript
// template компонента (рендерится в Storybook)
const template = `
<div class="min-h-[300px]">
  <menubar [model]="items"></menubar>
</div>
`;

// source.code (копируется пользователем) — без обёртки
code: `
  template: \\\`
    <menubar [model]="items"></menubar>
  \\\`,
`,
```

## Vue-референс: структура и маппинг

При создании компонента искать Vue-референс по формуле:
- Ветка: `menu.<ComponentName>` (или `misc.<ComponentName>`, `panel.<ComponentName>`)
- Stories: `src/plugins/prime/stories/Menu/<ComponentName>/`
- CSS-токены: `src/plugins/prime/theme3.0/components/css/<component>.ts`
- Файлы: `<ComponentName>.stories.js`, `<ComponentName>.template.js`, `<ComponentName>.mdx`

Дерево файлов ветки можно получить через GitHub API:
```
https://api.github.com/repos/cdek-it/vue-ui-kit/git/trees/<branch>?recursive=1
```

Raw-содержимое файла:
```
https://raw.githubusercontent.com/cdek-it/vue-ui-kit/<branch>/<path>
```

## Кастомный шаблон Menubar (pTemplate="item")

Для кастомного отображения пунктов меню с description и badge используется `pTemplate="item"` с контекстными переменными `hasSubmenu` и `root`:

```html
<p-menubar [model]="items">
  <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu" let-root="root">
    <a class="p-menubar-item-link flex items-center gap-2">
      <span *ngIf="item.icon" [class]="'p-menubar-item-icon ' + item.icon"></span>
      <div class="menubar-item-label">
        <span class="p-menubar-item-label">{{ item.label }}</span>
        <small *ngIf="item['description']" class="menubar-item-caption">{{ item['description'] }}</small>
      </div>
      <p-badge *ngIf="item['badge']" [value]="item['badge']"></p-badge>
      <span *ngIf="hasSubmenu"
        [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'">
      </span>
    </a>
  </ng-template>
</p-menubar>
```

- `description` — произвольное поле `MenuItem` (через `[key: string]: any`), **не** `caption` (caption — имя CSS-класса)
- `hasSubmenu` / `root` — контекстные переменные PrimeNG, определяют направление стрелки подменю
- Импорты: `Menubar` из `primeng/menubar`, `Badge` из `primeng/badge`, `SharedModule` из `primeng/api`, `NgIf` из `@angular/common`

## PrimeNG: составные компоненты и ng-content (DI-ограничение)

PrimeNG-субкомпоненты (например `Tab`, `TabList`, `TabPanel`) инжектят родительский компонент (`Tabs`) через Angular DI. При использовании `ng-content` в обёртке Angular ищет провайдер в **объявляющем** компоненте (story/example), а не в **проецирующем** (`p-tabs`) — это приводит к ошибке `NG0201: No provider found`.

### Решение: data-driven обёртка

Вместо `ng-content` принимать данные через `@Input()` и рендерить все PrimeNG-субкомпоненты **внутри шаблона** обёртки:

```typescript
// ❌ ng-content — субкомпоненты не видят провайдер Tabs
template: `
  <p-tabs [value]="value">
    <ng-content></ng-content>
  </p-tabs>
`

// ✅ data-driven — все субкомпоненты внутри view
template: `
  <p-tabs [value]="value" (valueChange)="value = $event">
    <p-tablist>
      <p-tab *ngFor="let tab of tabs" [value]="tab.value" [disabled]="tab.disabled || false">
        <i *ngIf="tab.icon" class="text-xl" [class]="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </p-tab>
    </p-tablist>
    <p-tabpanels>
      <p-tabpanel *ngFor="let tab of tabs" [value]="tab.value">
        <p class="m-0">{{ tab.content }}</p>
      </p-tabpanel>
    </p-tabpanels>
  </p-tabs>
`
```

Это касается **любых** PrimeNG-компонентов, где субкомпоненты инжектят родителя: `Tabs`, `Stepper`, `Splitter` и др.

## Storybook: динамическая генерация template в Default story

Default story **обязательно** строит template динамически из `args`, чтобы:
1. Изменение Controls обновляло рендер компонента
2. Code-snippet в Docs автоматически отражал текущие пропсы

```typescript
export const Default: Story = {
  render: (args) => {
    const parts: string[] = [];

    parts.push(`value="${args.value}"`);
    parts.push(`[tabs]="tabs"`);
    if (args.scrollable) parts.push(`[scrollable]="true"`);
    if (args.lazy)       parts.push(`[lazy]="true"`);

    const template = `<tabs\n  ${parts.join('\n  ')}\n></tabs>`;

    return { props: args, template };
  },
  args: { value: '0', tabs: [...], scrollable: false, lazy: false },
};
```

**Не** использовать статический template с биндингами — Controls будут работать, но code-snippet не обновится.

## PrimeNG: styleClass vs ngClass для CSS-классов размеров

В некоторых PrimeNG-компонентах (например `SelectButton`) проп `[styleClass]` **передаётся на дочерние элементы** (внутренние `p-togglebutton`), а **не на корневой DOM-элемент** компонента. Это означает, что CSS-классы размеров (`.p-selectbutton-sm`, `.p-selectbutton-lg` и т.д.), которые должны влиять на корневой элемент через CSS-каскад, не работают при передаче через `styleClass`.

### Решение: использовать `[ngClass]` вместо `[styleClass]`

```html
<!-- ❌ styleClass — класс уходит на каждый внутренний p-togglebutton -->
<p-selectbutton
  [styleClass]="sizeClass"
>

<!-- ✅ ngClass — класс применяется к корневому элементу p-selectbutton -->
<p-selectbutton
  [ngClass]="sizeClass"
>
```

Это правило применяется ко всем компонентам-обёрткам, где классы размеров описаны в CSS как:

```css
/* Стили привязаны к корневому элементу */
.p-selectbutton-sm .p-togglebutton { height: ...; }
.p-selectbutton-lg .p-togglebutton { height: ...; }
```

В таких случаях класс **должен быть на корневом элементе** — добавляй его через `[ngClass]`, а не `[styleClass]`.

> **Правило:** если CSS-класс используется как модификатор (размер, вариант) и задан на уровне корневого PrimeNG-компонента в стилях — всегда используй `[ngClass]`. `[styleClass]` используй только тогда, когда PrimeNG явно документирует его применение к корню.

## Git

- Коммиты без `Co-Authored-By: Claude ...`
- Сообщение коммита — до 100 символов, по одному на каждый комментарий в PR
- **Пуш не делать без явной команды пользователя**
- **Файлы `docs/superpowers/` (спеки, планы) не коммитить**
