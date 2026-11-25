import { Component, EnvironmentProviders, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { providePrimeNG } from 'primeng/config';
import Preset from '../../providers/prime-preset/theme.preset';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraCheckboxComponent } from './checkbox.component';

@Component({
  imports: [Checkbox, FormsModule],
  template: `
    <p-checkbox [binary]="true" [ngModel]="true">
      <ng-template #icon let-checked="checked" let-klass="class">
        @if (checked) {
          <svg [class]="klass" viewBox="0 0 16 16" width="16" height="16">
            <path d="M2 2h12v12H2z" />
          </svg>
          <svg data-p-icon="check" viewBox="0 0 16 16" width="16" height="16">
            <path d="M8 2L14 14H2z" />
          </svg>
          <svg [class]="klass" data-p-icon="check" viewBox="0 0 16 16" width="16" height="16">
            <path d="M2 8h12v2H2z" />
          </svg>
        }
      </ng-template>
    </p-checkbox>
  `
})
class CustomIconCheckbox {}

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

const renderIcon = async (state: CheckboxState): Promise<SVGSVGElement> =>
  (await renderBox(state)).querySelector<SVGSVGElement>('svg.p-checkbox-icon')!;

const iconStyle = async (state: CheckboxState): Promise<CSSStyleDeclaration> =>
  getComputedStyle(await renderIcon(state));

describe('ExtraCheckboxComponent: иконка в боксе', () => {
  beforeEach(() => configure());

  it('checked: рисует контур Tabler Check 16px без webfont или изображения', async () => {
    const icon = await renderIcon({ checked: true });
    icon.style.fontFamily = 'sans-serif';
    const style = getComputedStyle(icon);

    expect(style.width).toBe('16px');
    expect(style.height).toBe('16px');
    expect(style.display).not.toBe('none');
    expect(style.clipPath).toMatch(/^polygon\(/);
    expect(getComputedStyle(icon.querySelector('path')!).visibility).toBe('hidden');
  });

  it('indeterminate: рисует контур Tabler Minus', async () => {
    const icon = await renderIcon({ indeterminate: true });
    expect(getComputedStyle(icon).clipPath).toBe('inset(45.833% 16.667% round 16px)');
    expect(getComputedStyle(icon.querySelector('path')!).visibility).toBe('hidden');
  });

  it('пустой бокс без иконки', async () => {
    const box = await renderBox();
    expect(box.querySelector('svg')).toBeNull();
    expect(getComputedStyle(box, '::before').content).toBe('none');
  });

  it('checked: иконка цвета color.fg.inverse.default — белая на тёмном боксе в светлой теме', async () => {
    expect((await iconStyle({ checked: true })).backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('disabled: иконка цвета checkbox.icon.disabledColor (color.fg.muted)', async () => {
    const style = await iconStyle({ checked: true, disabled: true });

    expect(style.clipPath).toMatch(/^polygon\(/);
    expect(style.backgroundColor).toBe('rgb(133, 136, 142)');
  });

  it('сохраняет SVG из шаблона #icon с классом и атрибутом PrimeNG', async () => {
    const fixture = TestBed.createComponent(CustomIconCheckbox);
    await fixture.whenStable();
    const box: HTMLElement = fixture.nativeElement.querySelector('.p-checkbox-box');
    const icons = box.querySelectorAll('svg');

    expect(icons.length).toBe(3);
    expect(icons[0]?.classList.contains('p-checkbox-icon')).toBeTrue();
    expect(icons[0]?.hasAttribute('data-p-icon')).toBeFalse();
    expect(icons[1]?.classList.contains('p-checkbox-icon')).toBeFalse();
    expect(icons[1]?.getAttribute('data-p-icon')).toBe('check');
    expect(icons[2]?.classList.contains('p-checkbox-icon')).toBeTrue();
    expect(icons[2]?.getAttribute('data-p-icon')).toBe('check');
    for (const icon of icons) {
      expect(getComputedStyle(icon).display).not.toBe('none');
      expect(getComputedStyle(icon).clipPath).toBe('none');
      expect(getComputedStyle(icon.querySelector('path')!).visibility).toBe('visible');
    }
    expect(getComputedStyle(box, '::before').content).toBe('none');
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
    expect((await iconStyle({ checked: true })).backgroundColor).toBe('rgb(43, 46, 51)');
  });

  it('disabled: color.fg.muted тёмной темы (#a2a5a9)', async () => {
    expect((await iconStyle({ checked: true, disabled: true })).backgroundColor).toBe('rgb(162, 165, 169)');
  });
});
