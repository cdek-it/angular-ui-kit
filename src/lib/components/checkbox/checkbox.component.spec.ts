import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Preset from '../../providers/prime-preset/theme.preset';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraCheckboxComponent } from './checkbox.component';

// Коды глифов tabler-icons (node_modules/@tabler/icons-webfont): ti-check и ti-minus
const TI_CHECK = '""';
const TI_MINUS = '""';

describe('ExtraCheckboxComponent: иконка в боксе', () => {
  let fixture: ComponentFixture<ExtraCheckboxComponent>;

  const box = (): HTMLElement => fixture.nativeElement.querySelector('.p-checkbox-box');
  const glyph = (): CSSStyleDeclaration => getComputedStyle(box(), '::before');
  const svg = (): SVGElement | null => box().querySelector('svg.p-checkbox-icon');

  const render = async (state: { checked?: boolean; indeterminate?: boolean; disabled?: boolean }): Promise<void> => {
    fixture = TestBed.createComponent(ExtraCheckboxComponent);
    const component = fixture.componentInstance;
    component.writeValue(!!state.checked);
    component.setDisabledState(!!state.disabled);
    fixture.componentRef.setInput('indeterminate', !!state.indeterminate);
    await fixture.whenStable();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExtraCheckboxComponent],
      providers: [provideZonelessChangeDetection(), provideExtraThemes()]
    });
  });

  it('checked: рисует ti-check шрифтом tabler-icons, svg PrimeNG скрыт', async () => {
    await render({ checked: true });

    expect(glyph().content).toBe(TI_CHECK);
    expect(glyph().fontFamily).toContain('tabler-icons');
    expect(glyph().fontSize).toBe('16px');
    expect(svg()).not.toBeNull();
    expect(getComputedStyle(svg()!).display).toBe('none');
  });

  it('indeterminate: рисует ti-minus', async () => {
    await render({ indeterminate: true });

    expect(glyph().content).toBe(TI_MINUS);
    expect(getComputedStyle(svg()!).display).toBe('none');
  });

  it('пустой бокс без иконки', async () => {
    await render({});

    expect(glyph().content).toBe('none');
  });

  it('checked: иконка цвета color.fg.inverse.default — белая на тёмном боксе в светлой теме', async () => {
    await render({ checked: true });

    expect(glyph().color).toBe('rgb(255, 255, 255)');
  });

  it('disabled: иконка цвета checkbox.icon.disabledColor (color.fg.muted)', async () => {
    await render({ checked: true, disabled: true });

    expect(glyph().content).toBe(TI_CHECK);
    expect(glyph().color).toBe('rgb(133, 136, 142)');
  });
});

describe('ExtraCheckboxComponent: иконка в тёмной теме', () => {
  beforeEach(() => {
    document.documentElement.classList.add('dark');
    TestBed.configureTestingModule({
      imports: [ExtraCheckboxComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideExtraThemes(),
        providePrimeNG({ theme: { preset: Preset, options: { darkModeSelector: '.dark', cssLayer: false } } })
      ]
    });
  });

  afterEach(() => document.documentElement.classList.remove('dark'));

  const glyphOf = async (state: { disabled?: boolean }): Promise<CSSStyleDeclaration> => {
    const fixture = TestBed.createComponent(ExtraCheckboxComponent);
    fixture.componentInstance.writeValue(true);
    fixture.componentInstance.setDisabledState(!!state.disabled);
    await fixture.whenStable();
    return getComputedStyle(fixture.nativeElement.querySelector('.p-checkbox-box'), '::before');
  };

  it('checked: тёмная иконка на светлом боксе (color.fg.inverse.default = #2b2e33)', async () => {
    expect((await glyphOf({})).color).toBe('rgb(43, 46, 51)');
  });

  it('disabled: color.fg.muted тёмной темы (#a2a5a9)', async () => {
    expect((await glyphOf({ disabled: true })).color).toBe('rgb(162, 165, 169)');
  });
});
