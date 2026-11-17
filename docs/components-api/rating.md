[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=384-1881)

# ExtraRating

`ExtraRatingComponent` импортируется из `@cdek-it/angular-ui-kit/components/rating`.

| Input | Тип | Default | Поведение |
|---|---|---|---|
| stars | number | 5 | Количество звёзд; изменение после инициализации перестраивает шкалу |
| readonly | boolean | false | Запрещает выбор и сброс, сохраняя геометрию variant |
| autofocus | boolean | false | Фокусирует выбранную или первую звезду при первом рендере; только interactive без disabled/readonly |
| clearable | boolean | false | Кнопка сброса слева; скрыта в display/readonly, отключена вместе с формой |
| clearAriaLabel | string | Сбросить оценку | Доступное имя кнопки сброса |
| size | small / base / large | small | Иконки 24 / 28 / 42 px; base соответствует medium в Figma |
| variant | display / interactive | interactive | Display: промежутки 8 px и отсутствие ввода; interactive: padding каждой звезды 10 px без промежутков |
| showLabels | boolean | false | Показывает подписи под шкалой |
| labelMin | string | Неудобно | Текст начала шкалы |
| labelMax | string | Очень удобно | Текст конца шкалы |
| ariaLabel | string | Оценка | Доступное имя radiogroup |
| ariaLabelledBy | string / undefined | undefined | ID внешней метки radiogroup; имеет приоритет над ariaLabel |

`disabled` управляется через `FormControl.disable()` / `setDisabledState`, отдельного Input нет. Значение — `number | null` через `ngModel`, `formControl` или `formControlName`. Для обязательного поля используйте внешний `Validators.required`; входов `required` и `tabindex` у компонента нет.

| Output | Payload | Когда вызывается |
|---|---|---|
| onRate | ExtraRatingRateEvent | Выбор числа мышью или клавиатурой |
| onClear | void | Кнопка сброса или повторная активация выбранной звезды переводит модель в null |
| onFocus | FocusEvent | Фокус звезды |
| onBlur | FocusEvent | Потеря фокуса звезды или кнопки сброса; помечает форму touched |

`ExtraRatingRateEvent`: `{ value: number; originalEvent: Event }`. Очистка не отправляет `null` в числовой `onRate`. Программные `setValue`, `reset`, `disable` и `enable` не отправляют события выбора/сброса.

Стрелки выбирают соседнюю звезду с переходом через край, Home/End — первую/последнюю. Space/Enter выбирают текущую звезду или сбрасывают повторный выбор. Hover подсвечивает контуры до указателя без изменения модели. Display, readonly и disabled игнорируют ввод; их звёзды исключены из Tab.

```html
<extra-rating [formControl]="ratingControl" size="base" [clearable]="true"></extra-rating>
<extra-rating [formControl]="ratingControl" variant="display" [showLabels]="true"></extra-rating>
```

```ts
ratingControl = new FormControl<number | null>(null, Validators.required);
```

В Figma три размера: xlarge не добавляется без макета. Высоты interactive — 44/48/62 px. Подписи используют Noto Sans 12/14 и фиксированную ширину 152 px из макета, выведенную из пяти small-иконок и четырёх промежутков. Цвета и размеры задаются токенами. Live-ограничения описаны в `src/lib/components/rating/rating.figma.md`.
