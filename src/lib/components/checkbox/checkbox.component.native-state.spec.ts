import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ExtraCheckboxComponent } from './checkbox.component';

@Component({
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: `<extra-checkbox [formControl]="control" [indeterminate]="true"></extra-checkbox>`
})
class HostComponent {
  control = new FormControl(false);
}

describe('ExtraCheckboxComponent: нативное состояние input', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('выставляет нативный indeterminate', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.p-checkbox-input');
    expect(input.indeterminate).toBeTrue();
  });

  it('не оставляет tabindex=NaN', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.p-checkbox-input');
    expect(input.getAttribute('tabindex')).toBe('0');
  });
});
