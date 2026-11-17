import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideExtraThemes } from '../../providers/theme-preset';
import { ExtraSliderComponent } from './slider.component';

@Component({
  imports: [ReactiveFormsModule, ExtraSliderComponent],
  template: `<extra-slider [formControl]="control" [step]="step" [range]="range" [required]="required" />`
})
class Host {
  control = new FormControl<number | number[]>(50);
  step: number | undefined = undefined;
  range = false;
  required = false;
}

const make = async (configure?: (host: Host) => void) => {
  const fixture = TestBed.createComponent(Host);
  configure?.(fixture.componentInstance);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
};

describe('ExtraSliderComponent: формы и клавиатура', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection(), provideExtraThemes()] })
  );

  it('внешнее значение обновляет бегунок без эмита onChange', async () => {
    const fixture = await make();
    fixture.componentInstance.control.setValue(75);
    await fixture.whenStable();
    const handle = fixture.nativeElement.querySelector('.p-slider-handle') as HTMLElement;
    expect(handle.getAttribute('aria-valuenow')).toBe('75');
  });

  it('disable убирает бегунок из Tab и возвращает после enable', async () => {
    const fixture = await make();
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    const slider = fixture.nativeElement.querySelector('.p-slider') as HTMLElement;
    expect(slider.classList.contains('p-disabled')).toBeTrue();
    expect((slider.querySelector('.p-slider-handle') as HTMLElement).getAttribute('tabindex')).toBeNull();
    fixture.componentInstance.control.enable();
    await fixture.whenStable();
    expect(slider.classList.contains('p-disabled')).toBeFalse();
  });

  it('required делает контрол невалидным без значения', async () => {
    const fixture = await make((host) => {
      host.control.setValue(null as unknown as number);
      host.control.setValidators(Validators.required);
      host.control.updateValueAndValidity();
    });
    expect(fixture.componentInstance.control.invalid).toBeTrue();
  });

  it('range переключает модель на массив и заполняет aria-valuenow обеих ручек', async () => {
    const fixture = await make((host) => {
      host.control.setValue([20, 80]);
      host.range = true;
    });
    await fixture.whenStable();
    const handles = fixture.nativeElement.querySelectorAll('.p-slider-handle') as NodeListOf<HTMLElement>;
    expect(handles.length).toBe(2);
    expect([...handles].map((handle) => handle.getAttribute('aria-valuenow'))).toEqual(['20', '80']);
  });

  it('focusout помечает контрол touched', async () => {
    const fixture = await make();
    const handle = fixture.nativeElement.querySelector('.p-slider-handle') as HTMLElement;
    expect(fixture.componentInstance.control.touched).toBeFalse();
    handle.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.control.touched).toBeTrue();
  });
});
