/**
 * E2E-спека FileUpload: поле выбора файла, загрузка и режимы.
 */

import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const STORIES = [
  { id: 'components-form-fileupload--auto', name: 'Auto upload' },
  { id: 'components-form-fileupload--basic', name: 'Basic' },
  { id: 'components-form-fileupload--default', name: 'Default' },
  { id: 'components-form-fileupload--with-form', name: 'Reactive Form' },
  { id: 'components-form-fileupload--upload-error', name: 'Upload error' },
  { id: 'components-form-fileupload--without-drag-and-drop', name: 'Without drag-and-drop' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
  }
});

const sampleFile = () => {
  const file = join(tmpdir(), 'e2e-upload.txt');
  writeFileSync(file, 'e2e upload');
  return file;
};

export default {
  component: 'fileupload',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Basic: поле выбора файла и кнопка',
      story: 'components-form-fileupload--basic',
      run: async ({ page, expect }) => {
        expect(await page.locator('input[type=file]').count(), 'поле файла').toBe(1);
        expect(await page.locator('button', { hasText: 'Выбрать файл' }).count(), 'кнопка').toBe(1);
      }
    },
    {
      name: 'Basic: выбранный файл появляется в списке',
      story: 'components-form-fileupload--basic',
      knownIssue: 'После выбора файла список не обновляется: .p-fileupload-file-list остаётся пустым',
      run: async ({ page, expect, wait }) => {
        await page.locator('input[type=file]').setInputFiles(sampleFile());
        await wait(async () => (await page.locator('.p-fileupload-file-list .p-fileupload-file').count()) > 0, { timeout: 2000 });
        expect(await page.locator('.p-fileupload-file').count(), 'файлы').toBeGreaterThan(0);
      }
    },
    {
      name: 'Without drag-and-drop: нет зоны перетаскивания',
      story: 'components-form-fileupload--without-drag-and-drop',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-fileupload-dragdrop').count(), 'drag-and-drop').toBe(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
