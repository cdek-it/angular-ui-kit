import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraRadiobuttonComponent } from './radiobutton.component';

@Component({
  imports: [ReactiveFormsModule, ExtraRadiobuttonComponent],
  template: `
    <extra-radiobutton [formControl]="delivery" name="delivery" value="pickup" label="Самовывоз" />
    <extra-radiobutton [formControl]="delivery" name="delivery" value="courier" label="Курьер" />
    <extra-radiobutton [formControl]="payment" name="payment" value="card" label="Карта" />
    <extra-radiobutton [formControl]="payment" name="payment" value="cash" label="Наличные" />
  `
})
class GroupHost {
  delivery = new FormControl('pickup');
  payment = new FormControl('card');
}

@Component({
  imports: [FormsModule, ExtraRadiobuttonComponent],
  template: `
    <extra-radiobutton [(ngModel)]="delivery" name="shipping" value="pickup" label="Самовывоз" />
    <extra-radiobutton [(ngModel)]="delivery" name="shipping" value="courier" label="Курьер" />
  `
})
class NgModelHost {
  delivery = 'pickup';
}

@Component({
  imports: [ReactiveFormsModule, ExtraRadiobuttonComponent],
  template: `
    <form [formGroup]="form">
      <extra-radiobutton formControlName="delivery" name="delivery" value="pickup" label="Самовывоз" />
      <extra-radiobutton formControlName="delivery" name="delivery" value="courier" label="Курьер" />
    </form>
  `
})
class NamedHost {
  form = new FormGroup({ delivery: new FormControl('pickup') });
}

const inputs = (element: HTMLElement): HTMLInputElement[] => [...element.querySelectorAll<HTMLInputElement>('input')];
const checked = (element: HTMLElement): boolean[] => inputs(element).map((input) => input.checked);

describe('ExtraRadiobuttonComponent: forms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideExtraThemes()]
    });
  });

  it('общий FormControl синхронизирует соседей и сохраняет независимость групп', async () => {
    const fixture = TestBed.createComponent(GroupHost);
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([true, false, true, false]);
    inputs(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.delivery.value).toBe('courier');
    expect(fixture.componentInstance.payment.value).toBe('card');
    expect(checked(fixture.nativeElement)).toEqual([false, true, true, false]);
    inputs(fixture.nativeElement)[3].click();
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([false, true, false, true]);
  });

  it('внешние setValue, disable/enable обновляют все OnPush-поля', async () => {
    const fixture = TestBed.createComponent(GroupHost);
    await fixture.whenStable();
    const control = fixture.componentInstance.delivery;
    control.setValue('courier');
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([false, true, true, false]);
    control.disable();
    await fixture.whenStable();
    expect(inputs(fixture.nativeElement).map((input) => input.disabled)).toEqual([true, true, false, false]);
    inputs(fixture.nativeElement)[0].click();
    await fixture.whenStable();
    expect(control.value).toBe('courier');
    control.enable();
    await fixture.whenStable();
    inputs(fixture.nativeElement)[0].click();
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([true, false, true, false]);
  });

  it('ngModel поддерживает двустороннюю привязку группы', async () => {
    const fixture = TestBed.createComponent(NgModelHost);
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([true, false]);
    inputs(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.delivery).toBe('courier');
    expect(checked(fixture.nativeElement)).toEqual([false, true]);
    fixture.componentInstance.delivery = 'pickup';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(checked(fixture.nativeElement)).toEqual([true, false]);
  });

  it('formControlName поддерживает общий выбор', async () => {
    const fixture = TestBed.createComponent(NamedHost);
    await fixture.whenStable();
    inputs(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.form.controls.delivery.value).toBe('courier');
    expect(checked(fixture.nativeElement)).toEqual([false, true]);
  });

  it('blur отмечает контрол touched без изменения значения', async () => {
    const fixture = TestBed.createComponent(GroupHost);
    await fixture.whenStable();
    const input = inputs(fixture.nativeElement)[0];
    input.focus();
    input.blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.delivery.touched).toBeTrue();
    expect(fixture.componentInstance.delivery.value).toBe('pickup');
  });

  it('внешняя валидация обновляет error-состояние группы', async () => {
    const fixture = TestBed.createComponent(GroupHost);
    await fixture.whenStable();
    const control = fixture.componentInstance.delivery;
    control.setValue(null);
    control.setValidators(Validators.required);
    control.markAsTouched();
    control.updateValueAndValidity();
    await fixture.whenStable();
    expect(control.invalid).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('.p-invalid').length).toBe(2);
    inputs(fixture.nativeElement)[1].click();
    await fixture.whenStable();
    expect(control.valid).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('.p-invalid').length).toBe(0);
  });

  it('объектное значение сохраняет тип и передаётся в onClick', async () => {
    const fixture = TestBed.createComponent(ExtraRadiobuttonComponent);
    const value = { id: 42 };
    fixture.componentRef.setInput('value', value);
    const events: unknown[] = [];
    fixture.componentInstance.registerOnChange((next) => events.push(next));
    const clicked: unknown[] = [];
    fixture.componentInstance.onClick.subscribe((event) => clicked.push(event.value));
    await fixture.whenStable();
    inputs(fixture.nativeElement)[0].click();
    await fixture.whenStable();
    expect(events).toEqual([value]);
    expect(clicked).toEqual([value]);
  });
});
