---
component: extra-fixture-dup
selector: extra-fixture-dup
import:
  symbol: ExtraFixtureDupComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: TESTKEY
  nodeId: '1:2'
  componentKey: dup-key
  name: 'FixtureDup'
status: stable
updated: '2026-06-22'
---

## Overview
Фикстура с тем же nodeId, что и valid.figma.md (1:2) — для проверки уникальности.

## Props mapping
| Figma | Angular | Type | Notes |
|-------|---------|------|-------|
| Size  | size    | 'sm' | |

## Variants
### Default
Figma nodeId: `1:4`

```html
<extra-fixture-dup size="sm" />
```

## Slots
Нет.

## Related
Нет.

## Do / Don't
- ✅ ОК.
- ❌ Не ОК.
