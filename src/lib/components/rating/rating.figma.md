---
component: ExtraRating
selector: extra-rating
import:
  symbol: ExtraRatingComponent
  from: '@cdek-it/angular-ui-kit/components/rating'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '384:1881'
  componentKey: '6c441f5ded02d0e5b053fbdcee752221af0d6d3d'
  name: '<Rating>'
status: stable
updated: '2026-11-17'
---

# Rating

Live Figma UI Kit DS v3.0: page 24037:76, Rating 384:1881 (30 вариантов), Rating.Item 384:1735 (24 варианта). Обход только читает макет. Проверены light/dark, цвета дополнительно разрешены через resolveForConsumer у существующих инстансов обеих тем.

| Figma | API | Геометрия |
|---|---|---|
| variant=display | variant=display | Неинтерактивные звёзды, gap 8 px |
| variant=interactive | variant=interactive | Padding каждой звезды 10 px, gap 0 |
| size=small | size=small | Иконка 24 px, interactive 44 px |
| size=medium | size=base | Иконка 28 px, interactive 48 px |
| size=large | size=large | Иконка 42 px, interactive 62 px |
| show-labels | showLabels | Подписи Noto Sans 12/14, отступ 8 px, ширина 152 px |
| label-min / label-max | labelMin / labelMax | Неудобно / Очень удобно |
| disabled | FormControl.disable() | Opacity звёзд 0.5; подписи остаются с полной непрозрачностью |
| state=selected | value=3 через CVA | Три заполненных звезды |
| state=hover | указатель над третьей звездой при пустом значении | Первые три контура подсвечиваются без изменения модели |

Размеры, цвета, opacity и фокус приходят из токенов. Width display для пяти звёзд — 152/172/242 px, interactive — 220/240/310 px. У шкалы нет xlarge-варианта в Figma.

Старые пять входов и четыре выхода сохранены. Default API variant=interactive сохраняет ввод у существующих потребителей; Default story явно задаёт display по умолчанию Figma. readonly=true блокирует ввод независимо от геометрии variant. Boolean-входы поддерживают booleanAttribute. ariaLabel/ariaLabelledBy именуют radiogroup; readonly/display/disabled исключены из Tab. Внутренний ngModel standalone совместим с formControlName.

Динамический stars пересоздаёт внутренний PrimeNG Rating: его starsArray инициализируется только в onInit и не реагирует на изменения входа. Внешняя модель при этом сохраняется. Arrow/Home/End/Space/Enter обрабатываются обёрткой, чтобы избежать нативного change радио вместе с повторным toggle PrimeNG.

onRate сохраняет числовой payload. Повторный выбор выставленной звезды, как и кнопка сброса, отправляет null через CVA и onClear; onRate(null) не отправляется. Touched выставляется на blur. Программная запись модели не эмитит пользовательские события.

## Отличия и ограничения

- В Figma есть disabled=true + state=hover с жёлтым контуром. Это статически заданное, недостижимое интерактивное состояние: отключённый компонент не реагирует на указатель и сохраняет серый контур. Disabled selected остаётся жёлтым с opacity 0.5.
- Предпросмотр hover привязан к реальному смещению указателя: после выбора с клавиатуры браузер повторно присылает `pointerover` под неподвижным курсором, и такой повтор не возвращает подсветку.
- На текущей странице Rating не найден прежний саб-компонент Clear. Существующая функция clearable сохранена с ti-ban и системными токенами, отдельного актуального эталона кнопки сброса нет.
- В макете нет отдельного focus-state. Для доступной клавиатурной навигации применён общий DS focus ring 2 px, solid, без дополнительной тени.
- Подписи имеют Figma-цвет muted: light #85888e на белом даёт 3.55:1, ниже 4.5:1. Цвет не заменяется локально; это вопрос общего дизайна доступности. Длинный пользовательский текст переносится без обрезки.
- Tabler отрисовывается системным webfont вместо векторов Figma; сглаживание глифов может отличаться при совпадающих размерах.

Три исходных example-файла сохранены, их декоративная подложка снята. Описания stories и Controls сохраняются дословно из origin/main.
