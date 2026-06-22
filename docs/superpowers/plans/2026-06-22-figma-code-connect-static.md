# Static Figma Code Connect — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать статический файловый аналог Figma Code Connect для `@cdek-it/angular-ui-kit`, дающий LLM контракт Figma↔код без рантайма CLI.

**Architecture:** Колокация `<name>.figma.md` рядом с каждым компонентом + глобальные артефакты в `src/lib/figma-code-connect/`. Формат — Markdown с YAML frontmatter и жёстким порядком секций. Lookup по Figma `nodeId` через `grep` без отдельного индекса. Валидация структуры — Node-скриптом перед коммитом.

**Tech Stack:** Angular 20, PrimeNG, Markdown, YAML, Node ≥18 (для validator), `js-yaml` (единственная новая dev-зависимость).

## Global Constraints

- Все пути относительно корня проекта.
- Один кодовый компонент = ровно один `<name>.figma.md` файл; варианты — секциями внутри.
- Глобалы лежат в `src/lib/figma-code-connect/`; индивидуальные `.figma.md` ссылаются на них через относительные ссылки.
- Frontmatter — YAML; обязательные поля: `component`, `selector`, `import.symbol`, `import.from`, `figma.fileKey`, `figma.nodeId`, `figma.componentKey`, `figma.name`, `status`, `updated`.
- Жёсткий порядок секций тела: `## Overview` → `## Props mapping` → `## Variants` → `## Slots` → `## Related` → `## Do / Don't`.
- Все code-fence обязаны иметь язык (`html`, `ts`, `scss`).
- Никаких inline-значений токенов/иконок — только ссылки на `tokens.md` / `icons.md`.
- Figma fileKey — per-component: берётся из Figma MCP для каждого компонента и может различаться (linked libraries). Базовый файл-точка-входа: `Khh7arsuXss3ncqy1Dz3OZ` (UI Kit v2.0); компоненты могут жить в связанных файлах библиотек. nodeId/componentKey пилотов вытаскивать через Figma MCP. Если MCP недоступен — `fileKey/nodeId/componentKey: null`, `status: orphan-code`.
- Дата `updated:` во всех файлах = `2026-06-22`.
- Никаких рантайм-зависимостей. validator — devDependency `js-yaml`.
- Не модифицировать `.env`, `angular.json`, существующие `*.component.ts`. Создаём только новые файлы.

---

### Task 1: Validator-скрипт (контракт формата)

**Files:**
- Create: `scripts/figma-code-connect/validate.mjs`
- Create: `scripts/figma-code-connect/__fixtures__/valid.figma.md`
- Create: `scripts/figma-code-connect/__fixtures__/invalid-missing-frontmatter.figma.md`
- Create: `scripts/figma-code-connect/__fixtures__/invalid-wrong-section-order.figma.md`
- Create: `scripts/figma-code-connect/validate.test.mjs`
- Modify: `package.json` — добавить script `"validate:figma-cc": "node scripts/figma-code-connect/validate.mjs"` и devDependency `"js-yaml": "^4.1.0"`.

**Interfaces:**
- Consumes: ничего.
- Produces: CLI `node scripts/figma-code-connect/validate.mjs [path...]` — без аргументов сканирует `src/lib/**/*.figma.md`; с аргументами валидирует переданные файлы. Exit 0 = OK, 1 = errors; ошибки в stderr строкой `<file>: <message>`. Экспорт `validateFile(path): Promise<string[]>`.

**Steps:**

- [ ] **Step 1: Создать fixture валидного файла** `scripts/figma-code-connect/__fixtures__/valid.figma.md`:

```
---
component: extra-fixture
selector: extra-fixture
import:
  symbol: ExtraFixtureComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: TESTKEY
  nodeId: '1:2'
  componentKey: stable-key
  name: 'Fixture'
status: stable
updated: 2026-06-22
---

## Overview
Тестовый компонент.

## Props mapping
| Figma | Angular | Type | Notes |
|-------|---------|------|-------|
| Size  | size    | 'sm' | |

## Variants
### Default
Figma nodeId: `1:3`

```html
<extra-fixture size="sm" />
```

## Slots
Нет.

## Related
Нет.

## Do / Don't
- ✅ ОК.
- ❌ Не ОК.
```

- [ ] **Step 2: Fixture с пропущенным frontmatter** `scripts/figma-code-connect/__fixtures__/invalid-missing-frontmatter.figma.md`:

```
## Overview
Нет frontmatter.
```

- [ ] **Step 3: Fixture с нарушенным порядком секций** `scripts/figma-code-connect/__fixtures__/invalid-wrong-section-order.figma.md` — копия валидного, но `## Variants` стоит перед `## Props mapping`.

- [ ] **Step 4: Тест `validate.test.mjs`** (запустить до реализации — должен упасть):

```javascript
import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { validateFile } from './validate.mjs';

test('valid fixture passes', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/valid.figma.md');
  assert.deepEqual(errors, []);
});

test('missing frontmatter fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-missing-frontmatter.figma.md');
  assert.ok(errors.some(e => /frontmatter/i.test(e)));
});

test('wrong section order fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-wrong-section-order.figma.md');
  assert.ok(errors.some(e => /order/i.test(e)));
});
```

- [ ] **Step 5: Запустить тест — ожидать FAIL** `node --test scripts/figma-code-connect/validate.test.mjs` → fail (нет validate.mjs).

- [ ] **Step 6: Реализовать `scripts/figma-code-connect/validate.mjs`**:

```javascript
import { readFile } from 'node:fs/promises';
import yaml from 'js-yaml';

const REQUIRED_FIELDS = ['component', 'selector', 'import', 'figma', 'status', 'updated'];
const REQUIRED_FIGMA = ['fileKey', 'nodeId', 'componentKey', 'name'];
const SECTION_ORDER = ['## Overview', '## Props mapping', '## Variants', '## Slots', '## Related', "## Do / Don't"];

export async function validateFile(path) {
  const errors = [];
  const raw = await readFile(path, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { errors.push(`${path}: missing frontmatter`); return errors; }
  let fm;
  try { fm = yaml.load(m[1]); }
  catch (e) { errors.push(`${path}: invalid YAML: ${e.message}`); return errors; }
  for (const f of REQUIRED_FIELDS) if (!(f in fm)) errors.push(`${path}: missing field ${f}`);
  if (fm.figma) for (const f of REQUIRED_FIGMA) if (!(f in fm.figma)) errors.push(`${path}: missing figma.${f}`);
  const body = m[2];
  const positions = SECTION_ORDER.map(s => body.indexOf(`\n${s}`));
  const present = positions.map((p, i) => [p, i]).filter(([p]) => p !== -1);
  for (let i = 1; i < present.length; i++) {
    if (present[i][0] < present[i-1][0]) {
      errors.push(`${path}: section order violation near ${SECTION_ORDER[present[i][1]]}`);
      break;
    }
  }
  for (const f of [...body.matchAll(/^```(\w*)$/gm)])
    if (!f[1]) errors.push(`${path}: code-fence without language`);
  return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let files;
  if (args.length) files = args;
  else {
    const { glob } = await import('node:fs/promises');
    files = [];
    for await (const p of glob('src/lib/**/*.figma.md')) files.push(p);
  }
  let total = 0;
  for (const f of files) {
    const errs = await validateFile(f);
    for (const e of errs) console.error(e);
    total += errs.length;
  }
  process.exit(total === 0 ? 0 : 1);
}
```

- [ ] **Step 7: Запустить тест — PASS** `node --test scripts/figma-code-connect/validate.test.mjs`.

- [ ] **Step 8: Обновить `package.json`** — добавить в `scripts`: `"validate:figma-cc": "node scripts/figma-code-connect/validate.mjs"`; в `devDependencies`: `"js-yaml": "^4.1.0"`; запустить `npm install`.

- [ ] **Step 9: CLI smoke** — `node scripts/figma-code-connect/validate.mjs scripts/figma-code-connect/__fixtures__/valid.figma.md` → exit 0; на `invalid-missing-frontmatter.figma.md` → exit 1 + stderr.

- [ ] **Step 10: Commit** `git add scripts/figma-code-connect/ package.json package-lock.json && git commit -m "feat(figma-cc): add validator and fixtures"`.

---

### Task 2: schema.md + README.md

**Files:**
- Create: `src/lib/figma-code-connect/schema.md`
- Create: `src/lib/figma-code-connect/README.md`

**Interfaces:**
- Consumes: validator из Task 1.
- Produces: ссылочные документы для Tasks 3–7.

**Steps:**

- [ ] **Step 1: Написать `schema.md`** с полной спецификацией:
  - Перечень обязательных полей frontmatter (`component`, `selector`, `import.{symbol,from}`, `figma.{fileKey,nodeId,componentKey,name}`, `status`, `updated`).
  - Опциональные: `deprecated.{replaceWith,since,reason}`.
  - Фиксированный порядок секций тела (6 пунктов из Global Constraints).
  - Правила: code-fence с языком; никаких inline-значений токенов/иконок; ссылки на `tokens.md` / `icons.md`.

- [ ] **Step 2: Написать `README.md`** — точка входа: краткое описание, ссылки на schema/conventions/tokens/icons/missing, инструкция «как агент использует» (grep по nodeId), команда валидации `npm run validate:figma-cc`.

- [ ] **Step 3: Прогнать validator** `npm run validate:figma-cc` → exit 0 (validator сканирует только `src/lib/**/*.figma.md`, глобалы в `src/lib/figma-code-connect/*.md` не валидируются).

- [ ] **Step 4: Commit** `git add src/lib/figma-code-connect/schema.md src/lib/figma-code-connect/README.md && git commit -m "feat(figma-cc): add schema and README"`.

---

### Task 3: conventions.md

**Files:**
- Create: `src/lib/figma-code-connect/conventions.md`

**Interfaces:**
- Consumes: ничего.
- Produces: справочник, на который ссылается README.md и индивидуальные `.figma.md`.

**Steps:**

- [ ] **Step 1: Написать `conventions.md`** с разделами:
  - **Naming**: префикс селектора `extra-`, класс `Extra<Name>Component`, импорт из `@cdek-it/angular-ui-kit`.
  - **Figma property → Angular @Input**: `Variant=primary` → `variant="primary"`, `State=Disabled` → `[disabled]="true"`, `Size=base` → `size="base"`, boolean Figma props → `[prop]="true|false"`.
  - **Two-way binding**: `[(visible)]`, `[(ngModel)]`.
  - **Slots / content projection**: структурные директивы `extra<Name>Header`/`extra<Name>Footer` либо `<ng-content>`.
  - **Red lines**: не описывать приватные компоненты; не дублировать Storybook; не описывать runtime-логику; не инлайнить токены; не создавать файлы под отдельные варианты.

- [ ] **Step 2: Validator** `npm run validate:figma-cc` → exit 0.

- [ ] **Step 3: Commit** `git add src/lib/figma-code-connect/conventions.md && git commit -m "feat(figma-cc): add conventions"`.

---

### Task 4: tokens.md + icons.md + missing.md

**Files:**
- Create: `src/lib/figma-code-connect/tokens.md`
- Create: `src/lib/figma-code-connect/icons.md`
- Create: `src/lib/figma-code-connect/missing.md`

**Interfaces:**
- Consumes: `src/lib/providers/prime-preset/` (текущие токены), `src/styles.scss`, опционально Figma MCP variables.
- Produces: anchor-ссылки для индивидуальных `.figma.md`.

**Steps:**

- [ ] **Step 1: Собрать актуальные токены** — `grep -r --include='*.ts' 'preset' src/lib/providers/prime-preset/ | head -50`, прочитать `src/styles.scss`. Если значения недоступны — отметить «pending» и сослаться на `missing.md`.

- [ ] **Step 2: Написать `tokens.md`** — разделы Colors / Spacing / Radius / Typography. Каждый — таблица или подразделы с anchor-friendly заголовками (`### color-primary`, `### spacing-base`). Минимум 1 строка в каждой таблице. Inline-значения недопустимы в `.figma.md`, но в `tokens.md` сами значения и есть контент.

- [ ] **Step 3: Написать `icons.md`** — источник иконок (`primeicons` через PrimeNG); таблица `Figma layer | код | пример использования`; правила (передача строкой `'pi pi-<name>'`, цвет наследуется).

- [ ] **Step 4: Написать `missing.md`** — backlog таблица `Figma name | nodeId | componentKey | заметка | статус`, изначально пустая, с пояснением «не путать с `status: orphan-code`».

- [ ] **Step 5: Validator** `npm run validate:figma-cc` → exit 0.

- [ ] **Step 6: Commit** `git add src/lib/figma-code-connect/tokens.md src/lib/figma-code-connect/icons.md src/lib/figma-code-connect/missing.md && git commit -m "feat(figma-cc): add tokens, icons, missing globals"`.

---

### Task 5: button.figma.md (пилот 1)

**Files:**
- Create: `src/lib/components/button/button.figma.md`
- Read: `src/lib/components/button/button.component.ts`, `src/lib/components/button/public_api.ts`, `src/stories/components/button/button.stories.ts`.

**Interfaces:**
- Consumes: schema (Task 2), conventions (Task 3), tokens/icons (Task 4).
- Produces: эталон формата для Tasks 6–7.

**Steps:**

- [ ] **Step 1: Получить Figma данные.** Через Figma MCP (`figma fileKey Khh7arsuXss3ncqy1Dz3OZ`) найти компонент `Button`: nodeId componentSet, componentKey, nodeId каждого variant. Если MCP недоступен — `figma.nodeId: null`, `figma.componentKey: null`, `status: orphan-code`; в `## Overview` второе предложение «Маппинг Figma в процессе синхронизации.».

- [ ] **Step 2: Написать `button.figma.md`** с frontmatter (component/selector/import/figma/status/updated) и телом по schema. Покрыть варианты: Primary/Base, Secondary/Base, Outlined/Large, Text/Base, Link/Base, With icon (prefix), Icon only, Loading, Danger. Props mapping должен покрывать все `@Input` из `button.component.ts` (variant, size, severity, disabled, loading, iconPos, iconOnly, showBadge, badge, badgeSeverity, rounded, fluid, label, icon, ariaLabel). Иконку передавать строкой `'pi pi-<name>'`. Ссылка на `icons.md` обязательна.

- [ ] **Step 3: Validator** `npm run validate:figma-cc` → exit 0. При ошибке — поправить frontmatter/секции.

- [ ] **Step 4: Smoke lookup** (только если nodeId заполнен): `grep -rl --include='*.figma.md' "nodeId: '<один_из_nodeId>'" src/lib/components` → одна строка `src/lib/components/button/button.figma.md`.

- [ ] **Step 5: Commit** `git add src/lib/components/button/button.figma.md && git commit -m "feat(figma-cc): add button.figma.md pilot"`.

---

### Task 6: inputtext.figma.md (пилот 2)

**Files:**
- Create: `src/lib/components/inputtext/inputtext.figma.md`
- Read: `src/lib/components/inputtext/inputtext.component.ts`, `src/stories/components/inputtext/*.stories.ts`.

**Interfaces:**
- Consumes: schema (Task 2), conventions (Task 3).
- Produces: пример с ControlValueAccessor (FormControl/ngModel).

**Steps:**

- [ ] **Step 1: Figma данные** аналогично Task 5 Step 1, имя в Figma — `Input / Text` (либо `TextField`/`Input` — найти точное).

- [ ] **Step 2: Написать `inputtext.figma.md`** с frontmatter и телом. Selector `extra-input-text`, symbol `ExtraInputTextComponent`. Props: `size`, `disabled`, `readonly`, `showClear`, `fluid`, `placeholder`, value через `[(ngModel)]` / `formControl`. Варианты: Default/Base, With clear, Disabled, Fluid/Large, With reactive form. В `## Related` — `inputgroup` и `form-field`. В `## Do/Don't` — обязательность использования `[(ngModel)]`/`formControl` (компонент реализует CVA).

- [ ] **Step 3: Validator** `npm run validate:figma-cc` → exit 0.

- [ ] **Step 4: Commit** `git add src/lib/components/inputtext/inputtext.figma.md && git commit -m "feat(figma-cc): add inputtext.figma.md pilot"`.

---

### Task 7: dialog.figma.md (пилот 3)

**Files:**
- Create: `src/lib/components/dialog/dialog.figma.md`
- Read: `src/lib/components/dialog/dialog.component.ts`, `src/stories/components/dialog/*.stories.ts`.

**Interfaces:**
- Consumes: schema (Task 2), conventions (Task 3).
- Produces: пример композиции (dialog с button в footer) — демонстрирует `## Related` в действии.

**Steps:**

- [ ] **Step 1: Figma данные** аналогично Task 5 Step 1, имя `Dialog`.

- [ ] **Step 2: Написать `dialog.figma.md`** с frontmatter и телом. Selector `extra-dialog`, symbol `ExtraDialogComponent`. Props: `size` (`'sm' | 'default' | 'lg' | 'xlg'`), `modal`, `header`, `dismissableMask`, `closeOnEscape`, `showHeader`, `[(visible)]`. Варианты: Default/md, Large with custom header (через `*extraDialogHeader`), With actions in footer (через `*extraDialogFooter` с `extra-button`), Non-modal. В `## Slots`: `<ng-content>`, `*extraDialogHeader`, `*extraDialogFooter`. В `## Related` — `button`, `confirm-dialog`. В `## Do/Don't` — управлять через `[(visible)]`, не `*ngIf`; не более 2 кнопок в footer; не выключать `closeOnEscape` (a11y).

- [ ] **Step 3: Validator** `npm run validate:figma-cc` → exit 0.

- [ ] **Step 4: Commit** `git add src/lib/components/dialog/dialog.figma.md && git commit -m "feat(figma-cc): add dialog.figma.md pilot"`.

---

### Task 8: Acceptance — сквозная проверка

**Files:**
- Опционально modify: `package.json` — добавить `"prebuild": "npm run validate:figma-cc"`.
- Read: `docs/superpowers/specs/2026-06-22-figma-code-connect-static-design.md` секция 9.

**Interfaces:**
- Consumes: всё из Tasks 1–7.
- Produces: подтверждение MVP-критериев.

**Steps:**

- [ ] **Step 1: Полный прогон validator** `npm run validate:figma-cc` → exit 0, без stderr.

- [ ] **Step 2: Lookup smoke по каждому пилоту**:
  - `grep -rl --include='*.figma.md' "component: extra-button" src/lib/components` → `src/lib/components/button/button.figma.md`.
  - Аналогично для `extra-input-text` и `extra-dialog`.

- [ ] **Step 3: Сверка с spec § 9** — открыть spec, проверить 5 критериев приёмки; каждый — closed by соответствующая Task.

- [ ] **Step 4: Опционально prebuild hook** — если согласовано, в `package.json` добавить `"prebuild": "npm run validate:figma-cc"`. Иначе пропустить.

- [ ] **Step 5: Commit** (если prebuild добавлен) `git add package.json && git commit -m "chore(figma-cc): wire validator into prebuild"`.

---

## Self-Review

**Spec coverage:**
- § 1–2 → Architecture + Tasks 2–7.
- § 3 → Tasks 5–7 (структура); Task 2 (формализация); Task 1 (валидация).
- § 4 → Task 8 Step 2.
- § 5 → Tasks 5–7 Step 1 (источники).
- § 6 → fallback orphan-code в Global Constraints и Tasks 5–7.
- § 7 → conventions.md (Task 3).
- § 8 → план учитывает доступность/недоступность MCP.
- § 9 → Task 8.

**Type consistency:** `validateFile(path)` определён в Task 1, использован там же. Селекторы `extra-button`, `extra-input-text`, `extra-dialog` соответствуют реальным.

**Placeholders:** нет TBD-плейсхолдеров. Метки получения Figma данных — рабочие инструкции с явным fallback на `orphan-code`.
