import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from './select-button.component';

@Component({
  imports: [ReactiveFormsModule, ExtraSelectButtonComponent],
  template: `<extra-select-button
    [formControl]="control"
    [options]="options"
    [multiple]="multiple"
    [allowEmpty]="allowEmpty"
    [autofocus]="autofocus"
    (onChange)="changes.push($event)"
  />`
})
class Host {
  control = new FormControl<any>('1');
  options: ExtraSelectButtonOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' }
  ];
  multiple = false;
  allowEmpty = true;
  autofocus = false;
  changes: { value: any }[] = [];
}

const segments = (el: HTMLElement): HTMLElement[] => [...el.querySelectorAll<HTMLElement>('.p-togglebutton')];
const make = async (configure?: (host: Host) => void) => {
  const fixture = TestBed.createComponent(Host);
  configure?.(fixture.componentInstance);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
};

describe('ExtraSelectButtonComponent: взаимодействия и формы', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('клик выбирает сегмент и отправляет onChange', async () => {
    const fixture = await make();
    segments(fixture.nativeElement)[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('3');
    expect(fixture.componentInstance.changes.length).toBe(1);
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });

  it('allowEmpty=false не даёт снять выбор, allowEmpty=true снимает', async () => {
    const strict = await make((host) => (host.allowEmpty = false));
    segments(strict.nativeElement)[0].click();
    await strict.whenStable();
    expect(strict.componentInstance.control.value).toBe('1');
    const free = await make();
    segments(free.nativeElement)[0].click();
    await free.whenStable();
    expect(free.componentInstance.control.value).toBeNull();
  });

  it('multiple собирает массив выбранных значений', async () => {
    const fixture = await make((host) => {
      host.multiple = true;
      host.control.setValue(['1']);
    });
    segments(fixture.nativeElement)[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toEqual(['1', '3']);
    expect(segments(fixture.nativeElement).filter((el) => el.classList.contains('p-togglebutton-checked')).length).toBe(
      2
    );
  });

  it('autofocus ставит фокус на первый доступный сегмент', async () => {
    const fixture = await make((host) => (host.autofocus = true));
    await fixture.whenStable();
    expect(document.activeElement).toBe(segments(fixture.nativeElement)[0]);
  });

  it('disabled через FormControl блокирует выбор и помечает сегменты', async () => {
    const fixture = await make((host) => host.control.disable());
    expect(segments(fixture.nativeElement).every((el) => el.classList.contains('p-disabled'))).toBeTrue();
    segments(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('1');
    fixture.componentInstance.control.enable();
    await fixture.whenStable();
    expect(segments(fixture.nativeElement).some((el) => el.classList.contains('p-disabled'))).toBeFalse();
  });

  it('required делает контрол невалидным до выбора', async () => {
    const fixture = await make((host) => {
      host.control.setValue(null);
      host.control.setValidators(Validators.required);
      host.control.updateValueAndValidity();
    });
    expect(fixture.componentInstance.control.invalid).toBeTrue();
    segments(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.valid).toBeTrue();
  });
});
