import { provideHttpClient } from '@angular/common/http';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ExtraCheckboxComponent } from './checkbox/checkbox.component';
import { ExtraFileUploadComponent } from './fileupload/fileupload.component';
import { ExtraInputTextComponent } from './inputtext/inputtext.component';
import { ExtraRadiobuttonComponent } from './radiobutton/radiobutton.component';
import { ExtraSelectButtonComponent } from './select-button/select-button.component';
import { ExtraSelectComponent } from './select/select.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ExtraCheckboxComponent,
    ExtraFileUploadComponent,
    ExtraInputTextComponent,
    ExtraRadiobuttonComponent,
    ExtraSelectButtonComponent,
    ExtraSelectComponent
  ],
  template: ''
})
class FormControlsHost {
  control = new FormControl<unknown>(null);
  model: string | null = null;
}

describe('Form controls: forms and keyboard interaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormControlsHost],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations(), provideHttpClient()]
    });
  });

  async function create(
    template: string,
    control: FormControl = new FormControl(null)
  ): Promise<ComponentFixture<FormControlsHost>> {
    TestBed.overrideComponent(FormControlsHost, { set: { template } });
    const fixture = TestBed.createComponent(FormControlsHost);
    fixture.componentInstance.control = control;
    await fixture.whenStable();
    return fixture;
  }

  it('connects SelectButton to a required reactive control and propagates selection', async () => {
    const fixture = await create(`
      <extra-select-button [formControl]="control" [required]="true"
        [options]="[{ name: 'A', code: 'a' }]" />
    `);
    expect(fixture.componentInstance.control.hasError('required')).toBeTrue();

    fixture.nativeElement.querySelector('[role="button"]').click();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe('a');
    expect(fixture.componentInstance.control.valid).toBeTrue();
  });

  it('connects SelectButton to ngModel', async () => {
    const fixture = await create(`
      <extra-select-button [(ngModel)]="model" [options]="[{ name: 'A', code: 'a' }]" />
    `);
    fixture.nativeElement.querySelector('[role="button"]').click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toBe('a');
  });

  it('keeps Select in the default Tab order and removes it when disabled', async () => {
    const fixture = await create('<extra-select [formControl]="control" />');
    const input: HTMLElement = fixture.nativeElement.querySelector('[role="combobox"]');
    expect(input.tabIndex).toBe(0);
    input.focus();
    expect(document.activeElement).toBe(input);

    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(input.tabIndex).toBe(-1);
  });

  it('respects an explicit negative tabindex on Select', async () => {
    const fixture = await create('<extra-select [formControl]="control" [tabindex]="-1" />');
    expect(fixture.nativeElement.querySelector('[role="combobox"]').tabIndex).toBe(-1);
  });

  it('validates a shared required radio control on the first selection and after reset', async () => {
    const fixture = await create(`
      <extra-radiobutton [formControl]="control" [value]="0" name="group" [required]="true" />
      <extra-radiobutton [formControl]="control" [value]="1" name="group" [required]="true" />
    `);
    const inputs: NodeListOf<HTMLInputElement> = fixture.nativeElement.querySelectorAll('input');
    inputs[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe(0);
    expect(fixture.componentInstance.control.valid).toBeTrue();
    expect(inputs[0].checked).toBeTrue();
    expect(inputs[1].checked).toBeFalse();

    fixture.componentInstance.control.reset();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.hasError('required')).toBeTrue();
    expect(Array.from(inputs).every((input) => !input.checked)).toBeTrue();
  });

  it('validates the actual control value when a view update is suppressed', async () => {
    const fixture = await create('<extra-input-text [formControl]="control" [required]="true" />');
    fixture.componentInstance.control.setValue('filled', { emitModelToViewChange: false });

    expect(fixture.componentInstance.control.valid).toBeTrue();
    expect(fixture.nativeElement.querySelector('input').value).toBe('');
  });

  for (const state of ['readonly', 'disabled']) {
    it(`prevents InputText clearing when ${state}`, async () => {
      const control = new FormControl({ value: 'protected', disabled: state === 'disabled' });
      const fixture = await create(
        `
        <extra-input-text [formControl]="control" [clearable]="true" [readonly]="${state === 'readonly'}" />
      `,
        control
      );
      const component: ExtraInputTextComponent = fixture.debugElement.query(
        By.directive(ExtraInputTextComponent)
      ).componentInstance;
      const cleared = spyOn(component.onClear, 'emit');
      expect(fixture.nativeElement.querySelector('p-inputicon')).toBeNull();

      component.clearValue();
      expect(control.value).toBe('protected');
      expect(cleared).not.toHaveBeenCalled();
    });
  }

  it('clears editable InputText with the keyboard and prevents Space scrolling', async () => {
    const fixture = await create(
      '<extra-input-text [formControl]="control" [clearable]="true" />',
      new FormControl('text')
    );
    const icon: HTMLElement = fixture.nativeElement.querySelector('p-inputicon');
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    icon.dispatchEvent(event);
    await fixture.whenStable();

    expect(event.defaultPrevented).toBeTrue();
    expect(fixture.componentInstance.control.value).toBe('');
    expect(fixture.nativeElement.querySelector('p-inputicon')).toBeNull();
  });

  it('autofocuses Checkbox after rendering', async () => {
    const fixture = await create('<extra-checkbox [formControl]="control" [autofocus]="true" />');
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('input'));
  });

  it('does not autofocus a disabled Checkbox', async () => {
    const fixture = await create(
      '<extra-checkbox [formControl]="control" [autofocus]="true" />',
      new FormControl({ value: false, disabled: true })
    );
    expect(document.activeElement).not.toBe(fixture.nativeElement.querySelector('input'));
  });

  it('opens FileUpload with Enter and Space and prevents Space scrolling', async () => {
    const fixture = await create('<extra-fileupload [formControl]="control" />');
    const component: ExtraFileUploadComponent = fixture.debugElement.query(
      By.directive(ExtraFileUploadComponent)
    ).componentInstance;
    const choose = spyOn(component.fuRef, 'choose');
    const zone: HTMLElement = fixture.nativeElement.querySelector('.fu-dropzone');
    expect(zone.tabIndex).toBe(0);
    zone.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(choose).toHaveBeenCalledTimes(1);

    const space = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    zone.dispatchEvent(space);
    expect(space.defaultPrevented).toBeTrue();
    expect(choose).toHaveBeenCalledTimes(1);
    zone.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));
    expect(choose).toHaveBeenCalledTimes(2);

    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(zone.tabIndex).toBe(-1);
    zone.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    zone.click();
    expect(choose).toHaveBeenCalledTimes(2);
  });
});
