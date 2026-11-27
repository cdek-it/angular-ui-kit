/**
 * E2E-спека Divider: ориентация, тип линии, контент и иконка.
 */

const STORIES = [
  { id: 'components-panel-divider--align-bottom', name: 'Align Bottom' },
  { id: 'components-panel-divider--align-left', name: 'Align Left' },
  { id: 'components-panel-divider--type-dashed', name: 'Dashed' },
  { id: 'components-panel-divider--default', name: 'Default' },
  { id: 'components-panel-divider--vertical', name: 'Vertical' },
  { id: 'components-panel-divider--with-content', name: 'With Content' },
  { id: 'components-panel-divider--with-icon', name: 'With Icon' }
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


const openDivider = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'divider',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: separator, горизонтальный и контент',
      story: 'components-panel-divider--default',
      run: async ({ page, expect }) => {
        const divider = page.locator('.p-divider');
        expect(await divider.getAttribute('role'), 'role').toBe('separator');
        expect(await divider.getAttribute('class'), 'горизонтальный').toContain('p-divider-horizontal');
        expect((await divider.evaluate((element) => element.textContent)).trim(), 'контент').toBe('Отправитель');
        const styles = await page.locator('.p-divider-content').evaluate((element) => {
          const css = getComputedStyle(element);
          return {
            color: css.color,
            fontFamily: css.fontFamily,
            fontSize: css.fontSize,
            fontWeight: css.fontWeight,
            lineHeight: css.lineHeight,
            letterSpacing: css.letterSpacing,
            textTransform: css.textTransform,
            gap: css.gap,
            background: css.backgroundColor
          };
        });
        expect(styles.color, 'цвет текста').toBe('rgb(133, 136, 142)');
        expect(styles.fontFamily, 'шрифт').toContain('Noto Sans');
        expect(styles.fontSize, 'font-size').toBe('14px');
        expect(styles.fontWeight, 'font-weight').toBe('500');
        expect(styles.lineHeight, 'line-height').toBe('14px');
        expect(styles.letterSpacing, 'letter-spacing').toBe('normal');
        expect(styles.textTransform, 'text-transform').toBe('uppercase');
        expect(styles.gap, 'gap').toBe('8px');
        expect(styles.background, 'background').toBe('rgb(255, 255, 255)');
        const lineColor = await page.locator('.p-divider').evaluate((element) => getComputedStyle(element, '::before').borderTopColor);
        expect(lineColor, 'цвет линии').toBe('rgb(206, 207, 210)');
      }
    },
    {
      name: 'Dashed: класс p-divider-dashed',
      story: 'components-panel-divider--type-dashed',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider').getAttribute('class'), 'пунктир').toContain('p-divider-dashed');
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-panel-divider--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider').getAttribute('class'), 'вертикальный').toContain('p-divider-vertical');
      }
    },
    {
      name: 'With Content: текст внутри разделителя',
      story: 'components-panel-divider--with-content',
      run: async ({ page, expect }) => {
        expect((await page.locator('.p-divider-content').evaluate((element) => element.textContent)).trim(), 'контент').toBe('Москва → Новосибирск');
      }
    },
    {
      name: 'With Icon: иконка внутри разделителя',
      story: 'components-panel-divider--with-icon',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider-content .ti-map-pin').count(), 'иконка').toBe(1);
        const icon = await page.locator('.p-divider-content .ti-map-pin').evaluate((element) => {
          const css = getComputedStyle(element);
          return { color: css.color, fontSize: css.fontSize };
        });
        expect(icon.color, 'цвет иконки').toBe('rgb(133, 136, 142)');
        expect(icon.fontSize, 'размер иконки').toBe('16px');
      }
    },
    {
      name: 'Properties: layout=horizontal',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:horizontal');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'horizontal').toContain('p-divider-horizontal');
      }
    },
    {
      name: 'Properties: layout=vertical',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:vertical');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'vertical').toContain('p-divider-vertical');
      }
    },
    {
      name: 'Properties: type=solid',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'type:solid');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'solid').toContain('p-divider-solid');
      }
    },
    {
      name: 'Properties: type=dash',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'type:dash');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'dash').toContain('p-divider-dashed');
      }
    },
    {
      name: 'Properties: horizontalAlign=left',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:horizontal;horizontalAlign:left');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'left').toContain('p-divider-left');
      }
    },
    {
      name: 'Properties: horizontalAlign=right',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:horizontal;horizontalAlign:right');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'right').toContain('p-divider-right');
      }
    },
    {
      name: 'Properties: verticalAlign=top',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:vertical;verticalAlign:top');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'top').toContain('p-divider-top');
      }
    },
    {
      name: 'Properties: verticalAlign=bottom',
      story: 'components-panel-divider--default',
      run: async ({ page, expect, url }) => {
        await openDivider(page, url, 'layout:vertical;verticalAlign:bottom');
        expect((await page.locator('.p-divider').getAttribute('class')) ?? '', 'bottom').toContain('p-divider-bottom');
      }
    },
    ...STORIES.map(smoke),
    {
      name: 'Default: цвет текста в тёмной теме',
      story: 'components-panel-divider--default',
      theme: 'dark',
      run: async ({ page, expect }) => {
        await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
        const styles = await page.locator('.p-divider-content').evaluate((element) => {
          const css = getComputedStyle(element);
          return { color: css.color, fontFamily: css.fontFamily, fontWeight: css.fontWeight, background: css.backgroundColor };
        });
        expect(styles.color, 'цвет dark').toBe('rgb(162, 165, 169)');
        expect(styles.fontFamily, 'шрифт dark').toContain('Noto Sans');
        expect(styles.fontWeight, 'font-weight dark').toBe('500');
        expect(styles.background, 'background dark').toBe('rgb(64, 67, 72)');
        const lineColor = await page.locator('.p-divider').evaluate((element) => getComputedStyle(element, '::before').borderTopColor);
        expect(lineColor, 'цвет линии dark').toBe('rgb(86, 89, 95)');
      }
    },
    {
      name: 'Default: загружен Noto Sans Medium 500',
      story: 'components-panel-divider--default',
      run: async ({ page, expect }) => {
        const faces = await page.evaluate(() => [...document.fonts]
          .filter((face) => face.family.includes('Noto Sans'))
          .map((face) => face.weight));
        expect(faces.includes('500'), 'начертание 500').toBe(true);
      }
    },
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
