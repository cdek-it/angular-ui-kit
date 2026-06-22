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

test('missing open fence language fails', async () => {
  const errors = await validateFile('scripts/figma-code-connect/__fixtures__/invalid-missing-open-fence-language.figma.md');
  assert.ok(errors.some(e => /code-fence/i.test(e)));
});
