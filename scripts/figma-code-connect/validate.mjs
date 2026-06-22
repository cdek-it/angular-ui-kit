import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import yaml from 'js-yaml';

const REQUIRED_FIELDS = ['component', 'selector', 'import', 'figma', 'status', 'updated'];
const REQUIRED_FIGMA = ['fileKey', 'nodeId', 'componentKey', 'name'];
const SECTION_ORDER = ['## Overview', '## Props mapping', '## Variants', '## Slots', '## Related', "## Do / Don't"];
const ALLOWED_STATUSES = ['stable', 'beta', 'deprecated', 'orphan-code'];

// Markdown links pointing at another component's contract, with optional #anchor.
const CROSS_LINK_RE = /\]\(([^)\s#]+\.figma\.md)(#[^)]*)?\)/g;

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

function parseFrontmatter(raw) {
  const m = raw.match(FRONTMATTER_RE);
  if (!m) return null;
  try { return { fm: yaml.load(m[1]), body: m[2] }; }
  catch { return null; }
}

export async function validateFile(path) {
  const errors = [];
  const raw = await readFile(path, 'utf8');
  const m = raw.match(FRONTMATTER_RE);
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

// Cross-links to sibling component contracts are reported as warnings, not errors:
// a contract may legitimately reference a pilot that hasn't been written yet
// (forward reference) without blocking the build.
export async function crossLinkWarnings(path) {
  const raw = await readFile(path, 'utf8');
  const baseDir = dirname(path);
  const seen = new Set();
  const warnings = [];
  for (const m of raw.matchAll(CROSS_LINK_RE)) {
    const link = m[1];
    const target = resolve(baseDir, link);
    if (seen.has(target)) continue;
    seen.add(target);
    try {
      await access(target);
    } catch {
      warnings.push(`${path}: dangling cross-link → ${link} (file not found)`);
    }
  }
  return warnings;
}

// nodeId uniqueness is a cross-file invariant, so it can only be checked over the
// whole set of contracts. A nodeId shared by two files breaks grep-based lookup.
export async function duplicateNodeIdErrors(paths) {
  const byNodeId = new Map();
  for (const path of paths) {
    const raw = await readFile(path, 'utf8');
    const parsed = parseFrontmatter(raw);
    const nodeId = parsed?.fm?.figma?.nodeId;
    if (!nodeId) continue;
    if (!byNodeId.has(nodeId)) byNodeId.set(nodeId, []);
    byNodeId.get(nodeId).push(path);
  }
  const errors = [];
  for (const [nodeId, files] of byNodeId) {
    if (files.length > 1) {
      errors.push(`nodeId '${nodeId}' is not unique — appears in: ${files.join(', ')}`);
    }
  }
  return errors;
}

export async function validateAll(paths) {
  const errors = [];
  const warnings = [];
  for (const path of paths) {
    errors.push(...await validateFile(path));
    warnings.push(...await crossLinkWarnings(path));
  }
  errors.push(...await duplicateNodeIdErrors(paths));
  return { errors, warnings };
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
  const { errors, warnings } = await validateAll(files);
  for (const w of warnings) console.error(`warning: ${w}`);
  for (const e of errors) console.error(e);
  process.exit(errors.length === 0 ? 0 : 1);
}
