import { EnvironmentProviders, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Preset from '../../providers/prime-preset/theme.preset';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraCheckboxComponent } from './checkbox.component';

// Коды глифов tabler-icons (node_modules/@tabler/icons-webfont): ti-check и ti-minus.
// getComputedStyle отдаёт content строкой в кавычках
const cssContent = (codePoint: number): string => `"${String.fromCodePoint(codePoint)}"`;
const TI_CHECK = cssContent(0xea5e);
const TI_MINUS = cssContent(0xeaf2);

interface CheckboxState {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}

const configure = (...providers: EnvironmentProviders[]): void => {
  TestBed.configureTestingModule({
    imports: [ExtraCheckboxComponent],
    providers: [provideZonelessChangeDetection(), provideExtraThemes(), ...providers]
  });
};

/** Рендерит чекбокс в заданном состоянии и возвращает его бокс */
const renderBox = async (state: CheckboxState = {}): Promise<HTMLElement> => {
  const fixture = TestBed.createComponent(ExtraCheckboxComponent);
  fixture.componentInstance.writeValue(!!state.checked);
  fixture.componentInstance.setDisabledState(!!state.disabled);
  fixture.componentRef.setInput('indeterminate', !!state.indeterminate);
  await fixture.whenStable();
  return fixture.nativeElement.querySelector('.p-checkbox-box');
};

const glyphOf = async (state?: CheckboxState): Promise<CSSStyleDeclaration> =>
  getComputedStyle(await renderBox(state), '::before');

const svgDisplay = (box: HTMLElement): string => getComputedStyle(box.querySelector('svg.p-checkbox-icon')!).display;

describe('ExtraCheckboxComponent: иконка в боксе', () => {
  beforeEach(() => configure());

  it('checked: рисует ti-check шрифтом tabler-icons 16px, svg PrimeNG скрыт', async () => {
    const box = await renderBox({ checked: true });
    const glyph = getComputedStyle(box, '::before');

    expect(glyph.content).toBe(TI_CHECK);
    expect(glyph.fontFamily).toContain('tabler-icons');
    expect(glyph.fontSize).toBe('16px');
    expect(svgDisplay(box)).toBe('none');
  });

  it('indeterminate: рисует ti-minus', async () => {
    const box = await renderBox({ indeterminate: true });

    expect(getComputedStyle(box, '::before').content).toBe(TI_MINUS);
    expect(svgDisplay(box)).toBe('none');
  });

  it('пустой бокс без иконки', async () => {
    expect((await glyphOf()).content).toBe('none');
  });

  it('checked: иконка цвета color.fg.inverse.default — белая на тёмном боксе в светлой теме', async () => {
    expect((await glyphOf({ checked: true })).color).toBe('rgb(255, 255, 255)');
  });

  it('disabled: иконка цвета checkbox.icon.disabledColor (color.fg.muted)', async () => {
    const glyph = await glyphOf({ checked: true, disabled: true });

    expect(glyph.content).toBe(TI_CHECK);
    expect(glyph.color).toBe('rgb(133, 136, 142)');
  });
});

describe('ExtraCheckboxComponent: иконка в тёмной теме', () => {
  // provideExtraThemes выключает тёмную тему (darkModeSelector: false) — включаем её
  // так же, как Storybook: классом .dark на <html>
  beforeEach(() => {
    document.documentElement.classList.add('dark');
    configure(providePrimeNG({ theme: { preset: Preset, options: { darkModeSelector: '.dark', cssLayer: false } } }));
  });

  afterEach(() => document.documentElement.classList.remove('dark'));

  it('checked: тёмная иконка на светлом боксе (color.fg.inverse.default = #2b2e33)', async () => {
    expect((await glyphOf({ checked: true })).color).toBe('rgb(43, 46, 51)');
  });

  it('disabled: color.fg.muted тёмной темы (#a2a5a9)', async () => {
    expect((await glyphOf({ checked: true, disabled: true })).color).toBe('rgb(162, 165, 169)');
  });
});
