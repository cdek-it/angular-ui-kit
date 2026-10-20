import type { Translation } from 'primeng/api';

export const RU_TRANSLATION: Partial<Translation> = {
  accept: 'Да',
  reject: 'Нет',
  cancel: 'Отмена',
  clear: 'Очистить',
  apply: 'Применить',
  choose: 'Выбрать',
  upload: 'Загрузить',
  today: 'Сегодня',
  weekHeader: 'Нед',
  firstDayOfWeek: 1,
  dateFormat: 'dd.mm.yy',
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  weak: 'Слабый',
  medium: 'Средний',
  strong: 'Надёжный',
  passwordPrompt: 'Введите пароль',
  emptyMessage: 'Результаты не найдены',
  emptySearchMessage: 'Результаты не найдены',
  emptyFilterMessage: 'Результаты не найдены',
  emptySelectionMessage: 'Ничего не выбрано',
  searchMessage: 'Доступно результатов: {0}',
  selectionMessage: 'Выбрано элементов: {0}',
  fileChosenMessage: 'Файлы',
  noFileChosenMessage: 'Файл не выбран',
  am: 'AM',
  pm: 'PM',
  aria: {
    close: 'Закрыть',
    previous: 'Назад',
    next: 'Вперёд',
    navigation: 'Навигация',
    selectAll: 'Выбрать всё',
    unselectAll: 'Снять всё',
    trueLabel: 'Да',
    falseLabel: 'Нет',
    nullLabel: 'Не выбрано',
    // Rating: PrimeNG берёт отсюда aria-label скрытых radio (starAriaLabel).
    // Без этих ключей звёзды остаются безымянными полями формы.
    // PrimeNG поддерживает только две формы (1 / много), а русскому нужно три
    // («2 звезды», «5 звёзд»), поэтому формулировка без склоняемого существительного.
    star: 'Оценка 1',
    stars: 'Оценка {star}'
  }
};
