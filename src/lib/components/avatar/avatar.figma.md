---
component: ExtraAvatar
selector: extra-avatar
import:
  symbol: ExtraAvatarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '36:1365'
  componentKey: 'fe504adcf02d8f8922f04f6ccb8bf3777ad701d9'
  name: '<Avatar>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraAvatar` — компонент для отображения пользователя или сущности. Поддерживает три способа представления содержимого: текстовую метку, иконку или изображение. Оборачивает PrimeNG `p-avatar` и расширяет его собственными размерами и формами.

Компонент соответствует Figma-компоненту `<Avatar>` (nodeId `36:1365`). Figma-свойство `type` (`image | icon | label`) не маппируется в отдельный инпут — способ представления выбирается тем, какой из инпутов `image`, `icon` или `label` задан (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текстовая метка внутри аватара — соответствует Figma-свойству `type=label` |
| `icon` | `string` | `''` | CSS-класс иконки (например `'ti ti-user'`) — соответствует Figma-свойству `type=icon` и `change-icon` (INSTANCE_SWAP); доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `image` | `string` | `''` | URL изображения — соответствует Figma-свойству `type=image` |
| `size` | `'normal' \| 'large' \| 'xlarge'` | `'normal'` | Размер аватара — соответствует Figma-свойству `size` (Figma `base` → код `normal`) |
| `shape` | `'square' \| 'circle'` | `'square'` | Форма аватара — соответствует Figma-свойству `shape` |

Figma-свойство `show-badge` (BOOLEAN) не имеет отдельного инпута: бейдж навешивается снаружи через PrimeNG `p-overlay-badge`, оборачивающий `extra-avatar` (см. раздел Variants).

## Variants

### Label / Base (текстовая метка)

Figma: size=base, shape=square, type=label

```html
<extra-avatar label="A"></extra-avatar>
```

### Icon / Base (иконка)

Figma: size=base, shape=square, type=icon

Иконка задаётся через `icon` (Figma `change-icon`); доступные классы — [icons.md](../../figma-code-connect/icons.md).

```html
<extra-avatar icon="ti ti-user"></extra-avatar>
```

### Image / Base (изображение)

Figma: size=base, shape=square, type=image

```html
<extra-avatar image="/assets/images/avatar/avatar.png"></extra-avatar>
```

### Circle / Large (круглая форма, большой размер)

Figma: size=large, shape=circle, type=label

```html
<extra-avatar label="C" size="large" shape="circle"></extra-avatar>
```

### Image / XLarge / Circle (изображение, круг, увеличенный размер)

Figma: size=xlarge, shape=circle, type=image

```html
<extra-avatar
  image="/assets/images/avatar/avatar.png"
  size="xlarge"
  shape="circle"
></extra-avatar>
```

### С бейджем (show-badge)

Figma: size=xlarge, shape=square, type=label, show-badge=true

Бейдж навешивается снаружи через `p-overlay-badge`; цветовая схема — токены [tokens.md](../../figma-code-connect/tokens.md).

```html
<p-overlay-badge value="4" severity="danger">
  <extra-avatar label="U" size="xlarge"></extra-avatar>
</p-overlay-badge>
```

## Slots

Не используются. Содержимое аватара передаётся через `@Input() label`, `@Input() icon` или `@Input() image`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`icon`, Figma `change-icon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены бейджа и фона
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraTag](../tag/tag.figma.md) — близкий по назначению компонент-метка
- [ExtraButton](../button/button.figma.md) — пример компонента с навешиваемым бейджем

## Do / Don't

**Do:**
- Задавайте ровно один из инпутов `label`, `icon` или `image` — он определяет Figma-свойство `type`
- Для иконки используйте классы из справочника [icons.md](../../figma-code-connect/icons.md)
- Для круглых аватаров с изображением задавайте `shape="circle"` — изображение обрежется по кругу
- Бейдж навешивайте снаружи через `p-overlay-badge`, оборачивающий `extra-avatar`

**Don't:**
- Не задавайте одновременно `image` и `label` или `image` и `icon` — представление станет неоднозначным
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не используйте `size="base"` — в коде базовый размер называется `normal` (Figma `base` ↔ код `normal`)
- Не пытайтесь задать бейдж инпутом компонента — отдельного инпута нет, используйте `p-overlay-badge`
