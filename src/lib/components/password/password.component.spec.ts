import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraPasswordComponent } from './password.component';

@Component({
  imports: [ReactiveFormsModule, ExtraPasswordComponent],
  template: `<extra-password
    [formControl]="control"
    [required]="required"
    [requiredMark]="requiredMark"
    [showFeedback]="false"
    [showMaskToggle]="true"
    [clearable]="true"
    (onFocus)="focusEvents.push($event)"
    (onBlur)="blurEvents.push($event)"
    (onClear)="clears = clears + 1"
  />`
})
class ReactiveHost {
  control = new FormControl<string | null>(null);
  required = false;
  requiredMark = false;
  focusEvents: Event[] = [];
  blurEvents: Event[] = [];
  clears = 0;
}

@Component({
  imports: [FormsModule, ExtraPasswordComponent],
  template: `<extra-password [(ngModel)]="value" [showFeedback]="false" />`
})
class NgModelHost {
  value: string | null = 'secret';
}

@Component({
  imports: [ReactiveFormsModule, ExtraPasswordComponent],
  template: `<form [formGroup]="form"><extra-password formControlName="password" [showFeedback]="false" /></form>`
})
class NamedHost {
  form = new FormGroup({ password: new FormControl<string | null>('secret') });
}

const input = (el: HTMLElement): HTMLInputElement => el.querySelector('input')!;
const type = (el: HTMLElement, value: string): void => {
  input(el).value = value;
  input(el).dispatchEvent(new Event('input', { bubbles: true }));
};

describe('ExtraPasswordComponent: формы и управление паролем', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideNoopAnimations(), provideExtraThemes()]
    })
  );

  it('обновляет OnPush-поле при setValue/reset без обратной записи в форму', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    const values: (string | null)[] = [];
    fixture.componentInstance.control.valueChanges.subscribe((value) => values.push(value));
    fixture.componentInstance.control.setValue('secret');
    await fixture.whenStable();
    expect(input(fixture.nativeElement).value).toBe('secret');
    fixture.componentInstance.control.reset();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).value).toBe('');
    expect(values).toEqual(['secret', null]);
  });

  it('меняет модель при вводе, а touched и onBlur — только при потере фокуса', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    input(fixture.nativeElement).focus();
    type(fixture.nativeElement, 'secret');
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('secret');
    expect(fixture.componentInstance.control.dirty).toBeTrue();
    expect(fixture.componentInstance.control.touched).toBeFalse();
    expect(fixture.componentInstance.focusEvents.length).toBe(1);
    input(fixture.nativeElement).blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.touched).toBeTrue();
    expect(fixture.componentInstance.blurEvents.length).toBe(1);
  });

  it('помечает пустой контрол touched при blur без ввода и показывает required', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.required = true;
    await fixture.whenStable();
    expect(fixture.componentInstance.control.invalid).toBeTrue();
    expect(input(fixture.nativeElement).classList.contains('p-invalid')).toBeFalse();
    input(fixture.nativeElement).focus();
    input(fixture.nativeElement).blur();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.touched).toBeTrue();
    expect(input(fixture.nativeElement).getAttribute('aria-invalid')).toBe('true');
    fixture.componentInstance.required = false;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.valid).toBeTrue();
  });

  it('не превращает requiredMark в валидатор и исключает отключённое поле из формы', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    fixture.componentInstance.requiredMark = true;
    await fixture.whenStable();
    expect(fixture.componentInstance.control.valid).toBeTrue();
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).disabled).toBeTrue();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTrue();
    fixture.componentInstance.control.enable();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).disabled).toBeFalse();
  });

  it('очищает модель единожды и не показывает clear для пустого значения', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    fixture.componentInstance.control.setValue('secret');
    await fixture.whenStable();
    const values: (string | null)[] = [];
    fixture.componentInstance.control.valueChanges.subscribe((value) => values.push(value));
    fixture.nativeElement.querySelector('.extra-password-clear').click();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).value).toBe('');
    expect(values).toEqual([null]);
    expect(fixture.componentInstance.clears).toBe(1);
    expect(fixture.nativeElement.querySelector('.extra-password-clear')).toBeNull();
  });

  it('переключает видимость без изменения значения формы', async () => {
    const fixture = TestBed.createComponent(ReactiveHost);
    await fixture.whenStable();
    fixture.componentInstance.control.setValue('secret');
    await fixture.whenStable();
    fixture.nativeElement.querySelector('.extra-password-mask-toggle').click();
    await fixture.whenStable();
    expect(input(fixture.nativeElement).type).toBe('text');
    expect(fixture.componentInstance.control.value).toBe('secret');
    expect(fixture.nativeElement.querySelector('.extra-password-mask-toggle').getAttribute('aria-label')).toBe(
      'Скрыть пароль'
    );
  });

  it('поддерживает ngModel и formControlName без регистрации внутреннего ngModel в родительской форме', async () => {
    const model = TestBed.createComponent(NgModelHost);
    await model.whenStable();
    type(model.nativeElement, 'changed');
    await model.whenStable();
    expect(model.componentInstance.value).toBe('changed');
    const named = TestBed.createComponent(NamedHost);
    await named.whenStable();
    type(named.nativeElement, 'named');
    await named.whenStable();
    expect(named.componentInstance.form.value).toEqual({ password: 'named' });
  });
});
