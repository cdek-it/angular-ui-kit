import { readFile } from 'node:fs/promises';
import yaml from 'js-yaml';

const REQUIRED_FIELDS = ['component', 'selector', 'import', 'figma', 'status', 'updated'];
const REQUIRED_FIGMA = ['fileKey', 'nodeId', 'componentKey', 'name'];
const SECTION_ORDER = ['## Overview', '## Props mapping', '## Variants', '## Slots', '## Related', "## Do / Don't"];
const ALLOWED_STATUSES = ['stable', 'beta', 'deprecated', 'orphan-code'];

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
  if ('status' in fm && !ALLOWED_STATUSES.includes(fm.status)) {
    errors.push(`${path}: unknown status "${fm.status}", expected one of: ${ALLOWED_STATUSES.join(' | ')}`);
  }
  const body = m[2];
  const positions = SECTION_ORDER.map(s => body.indexOf(`\n${s}`));
  const present = positions.map((p, i) => [p, i]).filter(([p]) => p !== -1);
  for (let i = 1; i < present.length; i++) {
    if (present[i][0] < present[i-1][0]) {
      errors.push(`${path}: section order violation near ${SECTION_ORDER[present[i][1]]}`);
      break;
    }
  }
  const fences = [...body.matchAll(/^```(\w*)$/gm)];
  for (let i = 0; i < fences.length; i++) {
    // Only opening fences (even index: 0, 2, 4, …) must carry a language.
    // Closing fences (odd index) are bare ``` per CommonMark spec.
    if (i % 2 === 0 && !fences[i][1]) errors.push(`${path}: code-fence without language`);
    if (i % 2 === 1 && fences[i][1]) errors.push(`${path}: closing fence has language "${fences[i][1]}", must be bare`);
  }
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
