#!/usr/bin/env node
/**
 * Запуск встроенного @storybook/test-runner только по одному компоненту.
 *
 * CLI раннера не фильтрует stories по title: он берёт весь index.json Storybook.
 * Поэтому поднимаем локальный прокси, который отдаёт отфильтрованный index.json,
 * а всё остальное (iframe.html, бандлы, картинки) проксирует в живой Storybook.
 *
 * Запуск:
 *   node e2e/storybook-runner.mjs button
 *   node e2e/storybook-runner.mjs Components/Form/Select --url=http://localhost:6007
 *   node e2e/storybook-runner.mjs select -- --maxWorkers=2 --verbose
 *
 * Всё после `--` уходит в test-storybook без изменений.
 */
import http from 'node:http';
import https from 'node:https';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const RUNNER_BIN = join(ROOT, 'node_modules/@storybook/test-runner/dist/test-storybook.js');

const argv = process.argv.slice(2);
const separator = argv.indexOf('--');
const ownArgs = separator === -1 ? argv : argv.slice(0, separator);
const runnerArgs = separator === -1 ? [] : argv.slice(separator + 1);

const target = ownArgs.find((arg) => !arg.startsWith('-'));
const flag = (name, fallback) => {
  const prefix = `--${name}=`;
  const found = ownArgs.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};

if (!target) {
  console.error('Укажите компонент или title: node e2e/storybook-runner.mjs <component|Components/.../Name>');
  process.exit(2);
}
if (!existsSync(RUNNER_BIN)) {
  console.error(`Не найден встроенный раннер: ${RUNNER_BIN}. Установите @storybook/test-runner.`);
  process.exit(2);
}

const baseUrl = flag('url', process.env.E2E_STORYBOOK_URL || 'http://localhost:6007').replace(/\/+$/, '');
const includeDocs = ownArgs.includes('--include-docs');

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const matches = (entry) => {
  if (!includeDocs && entry.type === 'docs') return false;
  const title = (entry.title ?? '').toLowerCase();
  const needle = target.toLowerCase();
  if (needle.includes('/')) return title.includes(needle);

  // Компонент в коде — `date-picker`, title — `DatePicker`, id — `...datepicker--`.
  const normalizedTitle = normalize(title);
  const normalizedNeedle = normalize(needle);
  return normalizedTitle.endsWith(normalizedNeedle) || normalize(entry.id).startsWith(`${normalizedNeedle}--`);
};

const fetchIndex = async () => {
  const response = await fetch(`${baseUrl}/index.json`);
  if (!response.ok) throw new Error(`Storybook ${baseUrl} ответил ${response.status} на /index.json`);
  return response.json();
};

let filtered;
let indexVersion = 5;
try {
  const index = await fetchIndex();
  if (typeof index.v === 'number') indexVersion = index.v;
  const entries = index.entries ?? {};
  filtered = Object.fromEntries(Object.entries(entries).filter(([, entry]) => matches(entry)));

  if (Object.keys(filtered).length === 0) {
    console.error(`В Storybook ${baseUrl} нет stories под «${target}».`);
    console.error('Проверьте title: curl -s http://localhost:6007/index.json | node -e "..."');
    process.exit(3);
  }
} catch (error) {
  console.error(error.message);
  console.error('Storybook должен быть запущен: npm run storybook -- --port 6007');
  process.exit(2);
}

const filteredIds = Object.keys(filtered);
log(`\nВстроенный test-runner · ${target} · ${filteredIds.length} stories:`);
for (const id of filteredIds.slice(0, 8)) log(`  · ${id}`);
if (filteredIds.length > 8) log(`  · … ещё ${filteredIds.length - 8}`);

const targetUrl = new URL(baseUrl);
const transport = targetUrl.protocol === 'https:' ? https : http;
const targetPort = Number(targetUrl.port) || (targetUrl.protocol === 'https:' ? 443 : 80);

const server = http.createServer((req, res) => {
  if (req.url === '/index.json' || req.url?.startsWith('/index.json?')) {
    const body = JSON.stringify({ v: indexVersion, entries: filtered });
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(body);
    return;
  }

  const upstream = transport.request(
    {
      hostname: targetUrl.hostname,
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: targetUrl.host }
    },
    (upstreamResponse) => {
      res.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
      upstreamResponse.pipe(res);
    }
  );

  upstream.on('error', (error) => {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`Proxy error: ${error.message}`);
  });

  req.pipe(upstream);
});

// WebSocket HMR в тестах не нужен: рендер story идёт по HTTP.
server.on('upgrade', (req, socket) => socket.destroy());

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const proxyUrl = `http://127.0.0.1:${server.address().port}`;
log(`Прокси: ${proxyUrl} → ${baseUrl}`);

const runner = spawn(process.execPath, [RUNNER_BIN, '--index-json', '--url', proxyUrl, ...runnerArgs], {
  cwd: ROOT,
  stdio: 'inherit',
  env: process.env
});

runner.on('exit', (code) => {
  server.close();
  process.exit(code ?? 1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    runner.kill(signal);
    server.close();
  });
}
