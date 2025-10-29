# Project Brief: Angular UI Kit Deconfidentialization

## Название проекта
Angular UI Kit (@cdek-it/angular-ui-kit) - PrimeNG CDEK Custom Build

## Тип проекта
Angular 18 Component Library + Showcase Application + SASS Theme Builder

## Краткое описание
Кастомизированная версия PrimeNG библиотеки компонентов с собственными темами CDEK (ek5 и brand). Проект содержит:
- Библиотеку компонентов PrimeNG
- Showcase приложение для демонстрации
- SASS темы (ek5, brand)
- Builder для Angular
- Публикацию CSS тем в приватный npm registry и S3

## Технологический стек
- Framework: Angular 18.2.13
- Language: TypeScript 5.4.5
- Build: ng-packagr, Gulp, esbuild
- Styles: SASS, PostCSS, Tailwind CSS
- Testing: Karma + Jasmine
- CI/CD: GitLab CI
- Container: Docker (Node 18.20 + Nginx)
- Registry: Nexus (repo.cdek.ru)

## Цель текущей задачи
Деконфиденциализация проекта путем удаления/обезличивания внутренних ресурсов CDEK.

## Ограничения
- Сохранить работоспособность проекта
- Не удалять функциональный код
- Заменить приватные конфигурации на примеры
