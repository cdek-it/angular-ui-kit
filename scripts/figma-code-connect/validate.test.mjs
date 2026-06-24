import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { validateFile, crossLinkWarnings, duplicateNodeIdErrors, validateAll } from './validate.mjs';

const FIX = 'scripts/figma-code-connect/__fixtures__';

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

test('missing open fence language fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-missing-open-fence-language.figma.md');
  assert.ok(errors.some(e => /code-fence/i.test(e)));
});

test('unknown status value fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-bad-status.figma.md');
  assert.ok(errors.some(e => /unknown status/i.test(e)));
});

test('closing fence with language fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-closing-fence-language.figma.md');
  assert.ok(errors.some(e => /closing fence/i.test(e)));
});

test('dangling cross-link is a warning, not an error', async () => {
  const path = `${FIX}/invalid-dangling-cross-link.figma.md`;
  const warnings = await crossLinkWarnings(path);
  assert.ok(warnings.some(w => /dangling cross-link/i.test(w) && /does-not-exist/.test(w)));
  // It must NOT surface as a hard error — forward references are allowed.
  const errors = await validateFile(path);
  assert.deepEqual(errors, []);
});

test('valid fixture has no dangling cross-link warnings', async () => {
  const warnings = await crossLinkWarnings(`${FIX}/valid.figma.md`);
  assert.deepEqual(warnings, []);
});

test('duplicate nodeId across files is an error', async () => {
  const errors = await duplicateNodeIdErrors([
    `${FIX}/valid.figma.md`,
    `${FIX}/invalid-dup-nodeid.figma.md`,
  ]);
  assert.ok(errors.some(e => /not unique/i.test(e) && /1:2/.test(e)));
});

test('unique nodeIds produce no duplicate error', async () => {
  const errors = await duplicateNodeIdErrors([`${FIX}/valid.figma.md`]);
  assert.deepEqual(errors, []);
});

test('validateAll separates errors from warnings', async () => {
  const { errors, warnings } = await validateAll([`${FIX}/invalid-dangling-cross-link.figma.md`]);
  assert.deepEqual(errors, []);
  assert.ok(warnings.some(w => /dangling cross-link/i.test(w)));
});
