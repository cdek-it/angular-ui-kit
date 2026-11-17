---
component: ExtraPassword
selector: extra-password
import:
  symbol: ExtraPasswordComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '375:1701'
  name: '<Password>'
status: stable
updated: '2026-11-17'
---

## Mapping

| Figma                                  | Angular                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| state=default/hover/focus              | Браузерные состояния поля.                                   |
| state=danger                           | Невалидный touched/dirty FormControl.                        |
| state=disabled                         | FormControl.disable().                                       |
| state=readonly                         | readonly=true.                                               |
| has-placeholder=true/false             | Пустое/заполненное значение формы.                           |
| has-float-label=true                   | floatLabel=true; имеет приоритет над labelPosition.          |
| show-eye, change-eye                   | showMaskToggle, Tabler eye/eye-off.                          |
| show-clear                             | clearable; onClear передаёт очистку, модель становится null. |
| show-label, text-float-label           | label; пустая строка скрывает лейбл.                         |
| show-caption                           | caption; severity через captionSeverity и ошибку формы.      |
| is-required                            | requiredMark для звёздочки либо required с валидатором.      |
| sizing small/base/large/xlarge         | size.                                                        |
| Password.Feedback show-template / Slot | extraPasswordHeader / extraPasswordFooter.                   |

Live Figma проверена 2026-11-17: 24 варианта поля × light/dark; sizing-страница всех четырёх размеров. Составные части: Feedback 378:1776, Meter 376:1809 (4 состояния), TextFeedback 376:2000 (default/success/danger), sizing 26126:124324.

Поле: width=240, heights=36/42/50/56, INSIDE border=1, radius=10. FloatLabel height=56, пустая метка Noto Sans 14/20, заполненная TT Fellows 12/14. Иконки 14/16/18/20; зазор перед иконкой 4 px. Обёртка label/caption использует gap=4. Shared Caption подключён из caption-ветки и не меняется здесь.

Feedback: padding=14, radius=8, OUTSIDE border=1 и две тени elevation.200. Dark icon и strong meter используют реальные muted/brand hover алиасы макета. Мёртвая ссылка floatlabel color удалена; стили используют только собственные или общие токены.

## Отклонения макета и токенов

- Meter в live Figma имеет несвязанные 7 px, экспортированный password.meter.height — 8 px. В библиотеке используется экспортированный токен; разница 1 px требует согласования дизайна.
- TextFeedback: рамка 21 px, текст 18 px, вертикальные padding 4+4. Естественная высота строки — 26 px, текст не обрезается. Содержимое Slot зависит от шаблона приложения, фиксированная высота панели не задаётся.
- Координата заполненной FloatLabel в Figma y=10.75, библиотека использует токенный y=12; шейпинг и растеризация TT Fellows/Tabler могут немного отличаться от векторов макета.
- Общий Caption сохраняет цвет Figma с недостаточным контрастом; исправление его дизайна и токенов находится вне Password.

## API

Полный список 29 входов, трёх выходов, поведение формы и пример — [API](../../../../docs/components-api/password.md). Существующие входы и дефолты сохранены. Добавлены clearable/onClear, requiredMark и captionSeverity. Blur передаёт touched до onBlur; ввод не помечает поле touched. Панель не показывается для readonly/disabled. Внутренний ngModel standalone, поэтому formControlName работает внутри FormGroup.
