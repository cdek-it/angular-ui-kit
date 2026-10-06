---
component: ExtraStepper
selector: extra-stepper
import:
  symbol: ExtraStepperComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1207:1850'
  componentKey: '13935dba8f227678ec2a853b311e916cd7fd3e98'
  name: 'Stepper'
status: stable
updated: '2026-10-05'
---

## Overview

`ExtraStepper` — мастер пошаговых действий (wizard): последовательность этапов с индикатором
(номер или иконка) и панелью контента под активным шагом. Оборачивает PrimeNG `p-stepper`. Шаги
задаются декларативно как дочерние компоненты `<extra-stepper-item>` — по спеке
(`docs/components-api/stepper.md`: «Шаги передаются как дочерние элементы `ExtraStepperItem`»), а
не через массив `steps: ExtraStepperItem[]`, как было в более ранней версии.

Компонент соответствует Figma-компоненту `<Stepper>` (nodeId `1207:1850`, библиотека «UI Kit (DS)
v2.1»). Figma различает `<🔒Stepper.ItemHorizontal>`/`<🔒Stepper.ItemVertical>` (индикатор шага) и
`<🔒Stepper.StepPanel>` (панель контента) — в коде это `p-step`/`p-step-item` и `p-step-panel`,
инкапсулированные внутри `ExtraStepperComponent`.

### ⚠️ Архитектура: почему `ExtraStepperItem` не рендерит `p-step`/`p-step-panel`/`p-step-item` сам

PrimeNG `Step`, `StepItem` и `StepPanel` внедряют родителя через DI (`pcStepper`, инжектится по
`forwardRef(() => Stepper)`). Та же ловушка, что у `p-tab`/`Tabs` и `p-accordion-panel`/`Accordion`
(см. корневой `CLAUDE.md`, раздел «Ловушка: PrimeNG-компонент с DI-зависимостью от родителя внутри
слота») — если эти теги рендерить в шаблоне отдельного `ExtraStepperItemComponent`, а сам компонент
проецировать как `<ng-content>` в `ExtraStepperComponent`, DI ломается (`NG0201`).

Починка та же, что у `ExtraTabs`: `ExtraStepperItemComponent` — чистый держатель данных
(`name`/`caption`/`state`/`icon`/`disabled`) и `TemplateRef` на свой `<ng-content>`
(`@ViewChild('bodyTpl')`). `ExtraStepperComponent` собирает детей через
`@ContentChildren(ExtraStepperItemComponent) items` и рендерит РЕАЛЬНЫЕ `p-step`/`p-step-item`/
`p-step-panel` в своём собственном шаблоне, подставляя тело панели через
`[ngTemplateOutlet]="item.bodyTpl"`.

### Почему у `p-step` и `p-step-panel` всегда свой `#content`-шаблон

У `StepPanel` (в отличие от `Step`) **нет** дефолтной ветки рендера без кастомного `#content` —
без него панель вообще ничего не покажет. А у `Step` дефолтная ветка не умеет подменять номер на
иконку (свойство `icon`), поэтому `ExtraStepperComponent` везде использует собственный
`<ng-template #content let-activateCallback="activateCallback">`, воспроизводящий разметку
PrimeNG (`button` + `.p-step-number` + `.p-step-title`) и добавляющий переключение номер/иконка —
см. `stepHeaderTpl` в шаблоне компонента.

## Props mapping

### ExtraStepper

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация степпера |
| `line` | `boolean` | `true` | Соединительная линия между заголовками шагов (`p-stepper-separator`). Не влияет на внутренний коннектор `p-step-panel` в вертикальном режиме — его рисует сам PrimeNG безусловно, это уже его собственное поведение |
| `value` | `number \| undefined` | первый шаг | Значение активного шага — 1-based порядковый номер среди `extra-stepper-item` (не произвольный id, PrimeNG `Step`/`StepPanel` типизируют `value` как `number`) |
| `linear` | `boolean` | `false` | Запрещает переход к шагу без завершения текущего |
| `(valueChange)` | `EventEmitter<number \| undefined>` | — | Событие перехода; вместе с `value` поддерживает `[(value)]` |

### ExtraStepperItem

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `name` | `string` (обязателен) | — | Заголовок шага |
| `caption` | `string` | `''` | Вторичная подпись под заголовком |
| `state` | `'default' \| 'success' \| 'danger'` | `'default'` | Визуальное состояние шага — `danger` навешивает класс `step-invalid` (уже стилизован в `tokens/components/stepper.ts`), `success` — новый класс `step-success` (см. ⚠️ ниже) |
| `icon` | `boolean` | `false` | Показывает иконку-стрелку (`ti ti-arrow-right`) вместо номера шага |
| `disabled` | `boolean` | `false` | Шаг недоступен для перехода |

Содержимое панели — не проп, а `<ng-content>` внутри `<extra-stepper-item>` (см. Slots).

### ⚠️ `state="success"` — новый CSS-хук, стилей пока нет

`step-invalid` уже стилизован дизайнером (красная подсветка номера на активном шаге). Для `success`
аналогичного класса `step-success` в `tokens/components/stepper.ts` нет — агент его не добавлял
(см. «Не трогать» в `CLAUDE.md`). Сниппет-заготовка по аналогии с уже существующим `step-invalid`:

```ts
.p-stepper .step-success.p-step-active .p-step-number {
  background: /* токен успеха, напр. color.bg.status.success.weak.active */;
  color: /* токен текста успеха */;
  border-color: /* токен границы успеха */;
}
```

До добавления этого CSS класс `step-success` навешивается функционально корректно, но визуально
ничего не меняет.

## Variants

### Horizontal (базовый вариант)

Figma: `<Stepper>`, orientation=horizontal — nodeId `1207:1850`

```html
<extra-stepper [(value)]="activeStep">
  <extra-stepper-item name="Получатель" caption="данные">Шаг 1</extra-stepper-item>
  <extra-stepper-item name="Адрес" caption="доставки">Шаг 2</extra-stepper-item>
  <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
</extra-stepper>
```

### Vertical

Figma: `<Stepper>`, orientation=vertical

```html
<extra-stepper orientation="vertical" [(value)]="activeStep">
  <extra-stepper-item name="Получатель">Шаг 1</extra-stepper-item>
  <extra-stepper-item name="Адрес">Шаг 2</extra-stepper-item>
</extra-stepper>
```

### Linear

```html
<extra-stepper [linear]="true" [(value)]="activeStep">
  <extra-stepper-item name="Получатель">Шаг 1</extra-stepper-item>
  <extra-stepper-item name="Адрес">Шаг 2</extra-stepper-item>
</extra-stepper>
```

### Без соединительной линии

```html
<extra-stepper [line]="false">
  <extra-stepper-item name="Шаг 1">...</extra-stepper-item>
  <extra-stepper-item name="Шаг 2">...</extra-stepper-item>
</extra-stepper>
```

### Состояние ошибки и иконка-стрелка

```html
<extra-stepper [(value)]="activeStep">
  <extra-stepper-item name="Получатель" state="success">Готово</extra-stepper-item>
  <extra-stepper-item name="Адрес" state="danger">Ошибка в адресе</extra-stepper-item>
  <extra-stepper-item name="Оплата" [icon]="true">Способ оплаты</extra-stepper-item>
</extra-stepper>
```

### Навигация «Назад» / «Вперёд» внутри панели

Компонент не навязывает конкретные кнопки/подписи — для навигации экспортируйте инстанс через
`#stepper="extraStepper"` и вызывайте его публичные `next()`/`prev()`:

```html
<extra-stepper #stepper="extraStepper" [(value)]="activeStep">
  <extra-stepper-item name="Получатель">
    Шаг 1
    <extra-button label="Вперёд" (click)="stepper.next()"></extra-button>
  </extra-stepper-item>
  <extra-stepper-item name="Адрес">
    Шаг 2
    <extra-button label="Назад" variant="tertiary" (click)="stepper.prev()"></extra-button>
  </extra-stepper-item>
</extra-stepper>
```

## Слоты (content projection)

| Слот | Описание |
|------|---------|
| `content` (на `extra-stepper-item`) | Содержимое панели шага — обычный `<ng-content>`, без отдельной директивы |

## Related

- [ExtraTabs](../tabs/tabs.figma.md) — та же DI-ловушка и тот же паттерн починки (вкладки вместо шагов)
- [ExtraButton](../button/button.figma.md) — для собственных кнопок навигации внутри панелей
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Управляйте активным шагом через `[(value)]` — 1-based порядковый номер среди `extra-stepper-item`.
- Используйте `[linear]="true"` для обязательной последовательности, где шаги нельзя пропускать.
- Помечайте шаг с ошибкой через `state="danger"`.
- Для своей навигации используйте `#stepper="extraStepper"` + `stepper.next()`/`stepper.prev()`.

**Don't:**
- Не используйте Stepper для свободного переключения разделов — для этого предназначены Tabs.
- Не путайте со списком событий по времени (Timeline) — Stepper ведёт по управляемому процессу.
- Не рендерьте `p-step`/`p-step-panel`/`p-step-item` самостоятельно в обход `extra-stepper`/`extra-stepper-item` — сломается DI (см. раздел «Архитектура» выше).
