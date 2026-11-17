import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraInputNumberComponent } from './inputnumber.component';

@Component({
  imports: [ReactiveFormsModule, ExtraInputNumberComponent],
  template: `<extra-input-number
    [formControl]="control"
    label="Amount"
    [clearable]="true"
    [showButtons]="true"
    buttonLayout="horizontal"
    [min]="min"
    [max]="max"
  />`
})
class ReactiveHost {
  control = new FormControl<number | null>(null);
  min: number | undefined;
  max: number | undefined;
}

@Component({
  imports: [FormsModule, ExtraInputNumberComponent],
  template: `<extra-input-number [(ngModel)]="value" label="Amount" />`
})
class NgModelHost {
  value: number | null = null;
}

const field = (element: HTMLElement): HTMLInputElement => element.querySelector('input')!;
const enter = (input: HTMLInputElement, value: string): void => {
  input.focus();
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

describe('ExtraInputNumberComponent: формы и очистка', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('внешние значения и disabled обновляют OnPush-представление', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    const control = fixture.componentInstance.control;
    const input = field(fixture.nativeElement);
    for (const value of [42, 0, null]) {
      control.setValue(value);
      await fixture.whenStable();
      expect(input.value).toBe(value === null ? '' : String(value));
    }
    control.disable();
    await fixture.whenStable();
    expect(input.disabled).toBeTrue();
    control.enable();
    await fixture.whenStable();
    expect(input.disabled).toBeFalse();
  });

  it('clamp min/max при blur возвращает ограниченное значение во внешнюю форму', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.min = 5;
    fixture.componentInstance.max = 10;
    await fixture.whenStable();
    const input = field(fixture.nativeElement);
    enter(input, '20');
    input.blur();
    await fixture.whenStable();
    expect(input.value).toBe('10');
    expect(fixture.componentInstance.control.value).toBe(10);
    enter(input, '1');
    input.blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe(5);
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });

  it('нулевое значение имеет доступную кнопку очистки и переходит в null', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.control.setValue(0);
    await fixture.whenStable();
    const clear: HTMLButtonElement = fixture.nativeElement.querySelector('.extra-inputnumber-clear');
    expect(clear.getAttribute('aria-label')).toBe('Очистить поле');
    clear.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeNull();
    expect(field(fixture.nativeElement).value).toBe('');
    expect(fixture.nativeElement.querySelector('.extra-inputnumber-clear')).toBeNull();
  });

  it('ngModel поддерживает ввод и внешнее обновление', async () => {
    const fixture = TestBed.createComponent(NgModelHost);
    await fixture.whenStable();
    const input = field(fixture.nativeElement);
    enter(input, '23');
    input.blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.value).toBe(23);
    fixture.componentInstance.value = 42;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(input.value).toBe('42');
  });

  it('модель не получает повторное изменение при совпадающих native/input событиях', async () => {
    const fixture = TestBed.createComponent(ExtraInputNumberComponent);
    const changes: Array<number | null> = [];
    fixture.componentInstance.registerOnChange((value) => changes.push(value));
    await fixture.whenStable();
    const event = { value: 42, formattedValue: '42', originalEvent: new Event('input') };
    fixture.componentInstance.handleModelChange(42);
    fixture.componentInstance.handleInput(event);
    expect(changes).toEqual([42]);
    fixture.componentInstance.handleClear();
    expect(changes).toEqual([42, null]);
  });
});
