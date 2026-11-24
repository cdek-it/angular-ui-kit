[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM?node-id=375-1701)

# ExtraPassword

Поле пароля реализует ControlValueAccessor и NG_VALIDATORS. Значение — `string | null`; поддерживаются `formControl`, `formControlName` и `ngModel`. Внутренний ngModel изолирован от родительской формы. Ввод помечает контрол dirty; потеря фокуса — touched, в том числе без ввода. Ошибка отображается после touched/dirty. Программные setValue/reset не отправляют пользовательские события.

| Вход              | Тип                          | По умолчанию       | Назначение                                                                 |
| ----------------- | ---------------------------- | ------------------ | -------------------------------------------------------------------------- |
| `showFeedback`    | `boolean`                    | `true`             | Панель надёжности при фокусе; скрыта у disabled/readonly.                  |
| `showMaskToggle`  | `boolean`                    | `false`            | Кнопка показать/скрыть пароль.                                             |
| `placeholder`     | `string \| undefined`        | —                  | Подсказка пустого поля.                                                    |
| `size`            | `ExtraPasswordSize`          | `"base"`           | Размер поля и иконок.                                                      |
| `variant`         | `'filled' \| 'outlined'`     | `"outlined"`       | Вариант PrimeNG: filled или outlined; обе поверхности соответствуют Figma. |
| `fluid`           | `boolean`                    | `false`            | Занимать доступную ширину.                                                 |
| `label`           | `string`                     | `""`               | Текст лейбла.                                                              |
| `labelPosition`   | `ExtraPasswordLabelPosition` | `"top"`            | Лейбл сверху или слева.                                                    |
| `floatLabel`      | `boolean`                    | `false`            | Плавающий лейбл внутри поля, перекрывает labelPosition.                    |
| `caption`         | `string`                     | `""`               | Подпись через ExtraCaptionComponent.                                       |
| `captionSeverity` | `ExtraCaptionSeverity`       | `"base"`           | Вариант подписи; видимая ошибка формы имеет приоритет danger.              |
| `requiredMark`    | `boolean`                    | `false`            | Только визуальная звёздочка, без валидатора.                               |
| `clearable`       | `boolean`                    | `false`            | Кнопка очистки непустого значения; отсутствует у disabled/readonly.        |
| `info`            | `string`                     | `""`               | Текст tooltip на иконке лейбла; иконка скрыта у FloatLabel.                |
| `promptLabel`     | `string`                     | `"Введите пароль"` | Текст для пустого пароля в панели.                                         |
| `weakLabel`       | `string`                     | `"Слабый"`         | Текст слабого пароля.                                                      |
| `mediumLabel`     | `string`                     | `"Средний"`        | Текст среднего пароля.                                                     |
| `strongLabel`     | `string`                     | `"Надёжный"`       | Текст надёжного пароля.                                                    |
| `inputStyleClass` | `string \| undefined`        | —                  | Дополнительные CSS-классы внутреннего input.                               |
| `ariaLabel`       | `string \| undefined`        | —                  | Доступное имя поля; без label используется «Пароль».                       |
| `ariaLabelledBy`  | `string \| undefined`        | —                  | ID внешнего элемента, задающего доступное имя.                             |
| `appendTo`        | `any`                        | `"body"`           | Место панели: body, self или HTMLElement.                                  |
| `autofocus`       | `boolean`                    | `false`            | Фокус при монтировании включённого поля.                                   |
| `required`        | `boolean`                    | `true`            | Validators.required и нативный required.                                   |
| `name`            | `string \| undefined`        | —                  | Нативное имя input.                                                        |
| `autocomplete`    | `string \| undefined`        | —                  | Нативная подсказка автозаполнения.                                         |
| `maxLength`       | `number \| undefined`        | —                  | Нативное максимальное число символов.                                      |
| `tabindex`        | `number \| undefined`        | —                  | Порядок фокуса, по умолчанию естественный tabindex=0.                      |
| `readonly`        | `boolean`                    | `false`            | Запрет ввода и очистки; показать пароль можно.                             |

| Выход     | Тип                   | Когда                                                |
| --------- | --------------------- | ---------------------------------------------------- |
| `onFocus` | `EventEmitter<Event>` | Нативный фокус input.                                |
| `onBlur`  | `EventEmitter<Event>` | Потеря фокуса после передачи touched форме.          |
| `onClear` | `EventEmitter<void>`  | Пользователь очистил поле; значение становится null. |

Disabled задаётся только формой, например `control.disable()`. `requiredMark` не включает валидацию; `required` включает и валидатор, и визуальную отметку. Обновление required пересчитывает валидатор. Кнопки видимости и очистки работают с Enter/Space, имеют доступные имена и связь aria-controls с полем. Подпись связана через aria-describedby.

`extraPasswordHeader` и `extraPasswordFooter` проецируют произвольные Angular-шаблоны в панель. Это существующие директивы, их API сохранён. Контент правил задаёт приложение; компонент оценивает надёжность стандартными regex PrimeNG и выводит weak/medium/strong. showFeedback управляет панелью независимо от showMaskToggle.

```html
<extra-password
  [formControl]="control"
  label="Label"
  placeholder="Password"
  caption="Caption"
  [showMaskToggle]="true"
  [clearable]="true"
  (onClear)="onClear()"
></extra-password>
```

Форма создаётся отдельно, например `control = new FormControl<string | null>(null)`. Для кастомных правил приложения обычно проверяют наличие строчной/заглавной буквы, цифры и минимальную длину; пример Template использует эти четыре проверки в `ruleMet(value, index)` и выбирает декоративную иконку в `ruleIcon(value, index)`.

# Геометрия

Ширина поля — 240 px; fluid растягивает его по контейнеру. Высоты small/base/large/xlarge — 36/42/50/56 px, иконки — 14/16/18/20 px. Border 1 px внутри поля, радиус 10 px. FloatLabel имеет высоту 56 px во всех размерах: в пустом поле метка остаётся на месте, включая focus; заполнение поднимает её. Внешние label/caption используют шаг 4 px, labelPosition=left сохраняется.

Панель имеет внешнюю обводку 1 px, padding 14 px, radius 8 px и elevation.200 по текущей Figma. Meter берёт высоту 8 px из экспортированного токена. В Figma у его четырёх вариантов вручную задано 7 px без переменной; это расхождение в 1 px сохранено как вопрос к дизайну. В TextFeedback рамки 21 px содержат текст высотой 18 px и padding 4+4, что не согласуется с естественной высотой 26 px; пользовательские правила не обрезают текст. Положение активной FloatLabel в Figma также содержит дробные координаты; реализация использует целые токенные отступы.

Описания stories и существующих Controls сохранены дословно из main. Семь исходных examples сохранены. Размеры и темы переключаются интерактивно.
