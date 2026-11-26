import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraToggleSwitchComponent } from './toggleswitch.component';

@Component({
  imports: [ReactiveFormsModule, ExtraToggleSwitchComponent],
  template: `<extra-toggleswitch
    [formControl]="control"
    [label]="label"
    [caption]="caption"
    [labelPosition]="labelPosition"
    [readonly]="readonly"
    [required]="required"
    [tabindex]="tabindex"
  />`
})
class Host {
  control = new FormControl(false);
  label = '';
  caption = '';
  labelPosition: 'right' | 'left' = 'right';
  readonly = false;
  required = false;
  tabindex: number | undefined = undefined;
}

const make = async (configure?: (host: Host) => void) => {
  const fixture = TestBed.createComponent(Host);
  configure?.(fixture.componentInstance);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
};

const switchEl = (el: HTMLElement): HTMLElement => el.querySelector('.p-toggleswitch') as HTMLElement;

describe('ExtraToggleSwitchComponent: формы и подписи', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('клик меняет модель и помечает контрол touched', async () => {
    const fixture = await make();
    switchEl(fixture.nativeElement).click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeTrue();
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });

  it('внешняя запись включает свитч без событий пользователя', async () => {
    const fixture = await make();
    fixture.componentInstance.control.setValue(true);
    await fixture.whenStable();
    expect(switchEl(fixture.nativeElement).classList.contains('p-toggleswitch-checked')).toBeTrue();
  });

  it('disable блокирует переключение и включает disabled-стили', async () => {
    const fixture = await make((host) => host.control.disable());
    expect(switchEl(fixture.nativeElement).classList.contains('p-disabled')).toBeTrue();
    switchEl(fixture.nativeElement).click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeFalse();
  });

  it('readonly блокирует переключение без disabled-класса', async () => {
    const fixture = await make((host) => (host.readonly = true));
    switchEl(fixture.nativeElement).click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBeFalse();
    expect(switchEl(fixture.nativeElement).classList.contains('p-disabled')).toBeFalse();
  });

  it('required делает контрол невалидным, пока свитч выключен', async () => {
    const fixture = await make((host) => (host.required = true));
    fixture.componentInstance.control.setValidators(Validators.requiredTrue);
    fixture.componentInstance.control.updateValueAndValidity();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.invalid).toBeTrue();
    expect(switchEl(fixture.nativeElement).classList.contains('p-invalid')).toBeTrue();
  });

  it('label и caption связаны с полем, labelPosition=left меняет порядок', async () => {
    const fixture = await make((host) => {
      host.label = 'Тема';
      host.caption = 'Пояснение';
      host.labelPosition = 'left';
    });
    const label = fixture.nativeElement.querySelector('.toggleswitch-label') as HTMLLabelElement;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(label.textContent?.trim()).toBe('Тема');
    expect(label.getAttribute('for')).toBe(input.id);
    expect(fixture.nativeElement.querySelector('.toggleswitch-caption')?.textContent?.trim()).toBe('Пояснение');
    expect(
      (fixture.nativeElement.querySelector('.extra-toggleswitch') as HTMLElement).classList.contains(
        'extra-toggleswitch--left'
      )
    ).toBeTrue();
  });

  it('tabindex без значения не превращается в NaN', async () => {
    const fixture = await make();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('tabindex')).toBe('0');
  });
});
