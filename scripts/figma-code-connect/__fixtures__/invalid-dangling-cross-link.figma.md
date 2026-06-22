---
component: extra-fixture-link
selector: extra-fixture-link
import:
  symbol: ExtraFixtureLinkComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: TESTKEY
  nodeId: '1:9'
  componentKey: link-key
  name: 'FixtureLink'
status: stable
updated: '2026-06-22'
---

## Overview
Фикстура со ссылкой на несуществующий контракт.

## Props mapping
| Figma | Angular | Type | Notes |
|-------|---------|------|-------|
| Size  | size    | 'sm' | |

## Variants
### Default
Figma nodeId: `1:10`

```html
<extra-fixture-link size="sm" />
```

## Slots
Нет.

## Related
- [Nonexistent](./does-not-exist.figma.md) — намеренно битая ссылка

## Do / Don't
- ✅ ОК.
- ❌ Не ОК.
