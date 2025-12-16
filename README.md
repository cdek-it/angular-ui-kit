# angular-ui-kit

angular-ui-kit - это пресет темы для primeng, а также storybook с демонстрацией и документацией используемых компонентов.
Он позволяет быстро и легко строить новые интерфейсы в фирменном стиле CDEK.

## Использование

1. Установите пакет @cdek-it/angular-ui-kit

```shell
npm install @cdek-it/angular-ui-kit
```

2. Импортируйте пресет темы в ваш angular-проект

```ts
import Preset from '@cdek-it/angular-ui-kit/dist/theme.preset.ts';

export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Preset,
        options: {
          darkModeSelector: false,
          cssLayer: false
        }
      }
    })
  ]
};
```

## Используемые технологии и связанные зависимости

---
*<span style="color: gray; font-size: 10px;">используйте в своём проекте</span>*
- Angular 20
- PrimeNG 20
- tailwindcss 3
- @tabler/icons-webfont 3
- Node 20
- ESlint
- Prettier
---

- Storybook 10

## Структура проекта

- `src/app` - базовое angular-приложение. Может использоваться как плейграунд для разработки и отладки.
- `src/stories` - набор story с компонентами для storybook.
- `src/prime-preset` - пресет темы для primeng, а также токены.

## Запуск storybook

1. Установить зависимости

```
npm ci
```

2. Запустить проект

```
npm run storybook
```

3. Открыть в браузере по адресу http://localhost:6006

## Разработка story

1. В директории `src/stories/components` создайте папку с вашим компонентом.
2. Реализуйте story со всеми показанными в figma состояниями компонента. Для референса можно использовать `button`.
3. Убедитесь, что все состояния компонента выглядят верно.
   3.1 Если есть несоответствия - проверьте верность токенов. Если там есть ошибки - сообщите мейнтейнеру.
   3.2 Если токены верны, и может потребоваться кастомизация css - согласуйте это с мейнтейнером.
   3.3 Если состояние компонента можно реализовать через апи primeng - создаем story с `source`-кодом, который можно скопировать как шаблон и использовать в проектах.
   Например, для inputtext нужен крестик с очисткой. Непосредственно такой опции в primeng нет, но можно использовать `p-inputIcon` с иконкой крестика, и следующим `source`-кодом:

```
// template
<p-inputIcon>
    <input pInputText [(ngModel)]="value" placeholder="Input with clear icon" />
    <i class="ti ti-cross" (click)="onClearClick()"></i>
</p-inputIcon>

// ts
onClearClick() {
  this.value = '';
}
```

4. Создать pull request в `main`, прикрепить его в задачу. Задачу отдать на ревью разработчикам и дизайнерам.
   В случае замечаний ориентируемся на пункт `3` и его подпункты выше.
