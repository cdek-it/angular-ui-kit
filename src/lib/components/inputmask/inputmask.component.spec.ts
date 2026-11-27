import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraInputMaskComponent } from './inputmask.component';

@Component({
  imports: [ReactiveFormsModule, ExtraInputMaskComponent],
  template: `<extra-input-mask
    [formControl]="control"
    mask="999-999-99-99"
    [label]="label"
    [caption]="caption"
    [captionSeverity]="captionSeverity"
    [clearable]="clearable"
    [required]="required"
    (onClear)="clears = clears + 1"
  />`
})
class Host {
  control = new FormControl<string | null>(null);
  label = '';
  caption = '';
  captionSeverity = 'base';
  clearable = false;
  required = false;
  clears = 0;
}

const make = async (configure?: (host: Host) => void) => {
  const fixture = TestBed.createComponent(Host);
  configure?.(fixture.componentInstance);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
};

const input = (el: HTMLElement): HTMLInputElement => el.querySelector('input') as HTMLInputElement;

describe('ExtraInputMaskComponent: маска, формы и подпись', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('внешнее значение подставляется в поле', async () => {
    const fixture = await make();
    fixture.componentInstance.control.setValue('222-333-44-55');
    await fixture.whenStable();
    expect(input(fixture.nativeElement).value).toBe('222-333-44-55');
  });

  it('disable блокирует поле, enable возвращает ввод', async () => {
    const fixture = await make();
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).disabled).toBeTrue();
    fixture.componentInstance.control.enable();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).disabled).toBeFalse();
  });

  it('required делает контрол невалидным без значения', async () => {
    const fixture = await make((host) => {
      host.required = true;
      host.control.setValidators(Validators.required);
      host.control.updateValueAndValidity();
    });
    expect(fixture.componentInstance.control.invalid).toBeTrue();
  });

  it('подпись рисует общий extra-caption с severity', async () => {
    const fixture = await make((host) => {
      host.caption = 'Ошибка';
      host.captionSeverity = 'danger';
    });
    const caption = fixture.nativeElement.querySelector('extra-caption') as HTMLElement;
    expect(caption.getAttribute('data-severity')).toBe('danger');
    expect(caption.textContent?.trim()).toBe('Ошибка');
  });

  it('clearable сбрасывает значение и вызывает onClear', async () => {
    const fixture = await make((host) => {
      host.clearable = true;
      host.control.setValue('111-111-11-11');
    });
    await fixture.whenStable();
    const icon = fixture.nativeElement.querySelector('.p-inputmask-clear-icon') as HTMLElement;
    expect(icon).toBeTruthy();
    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value ?? null).toBeNull();
    expect(fixture.componentInstance.clears).toBe(1);
  });

  it('label связывается с полем через for/id', async () => {
    const fixture = await make((host) => (host.label = 'Телефон'));
    const label = fixture.nativeElement.querySelector('.extra-inputmask-label') as HTMLLabelElement;
    expect(label.getAttribute('for')).toBe(input(fixture.nativeElement).id);
  });
});
