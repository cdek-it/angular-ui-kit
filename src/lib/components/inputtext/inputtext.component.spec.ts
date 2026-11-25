import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ExtraInputTextComponent } from './inputtext.component';

@Component({
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: `<extra-input-text [formControl]="control" [clearable]="true"></extra-input-text>`
})
class HostComponent {
  control = new FormControl('текст');
}

describe('ExtraInputTextComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('возвращает фокус в поле после очистки', () => {
    const component = fixture.debugElement.query(By.directive(ExtraInputTextComponent))
      .componentInstance as ExtraInputTextComponent;
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.focus();
    component.clearValue();
    fixture.detectChanges();

    expect(document.activeElement).toBe(input);
  });
});

@Component({
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: `<extra-input-text [formControl]="control" label="Label"></extra-input-text>`
})
class RequiredHostComponent {
  control = new FormControl('', Validators.required);
}

describe('ExtraInputTextComponent — invalid до touched', () => {
  let fixture: ComponentFixture<RequiredHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RequiredHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(RequiredHostComponent);
    fixture.detectChanges();
  });

  it('не показывает ошибку, пока поле не тронуто', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    expect(input.classList.contains('p-invalid')).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('показывает ошибку после touched', () => {
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    expect(input.classList.contains('p-invalid')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});

@Component({
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: `<extra-input-text
    [formControl]="control"
    label="Label"
    labelPosition="left"
    [floatLabel]="true"
  ></extra-input-text>`
})
class FloatLabelHostComponent {
  control = new FormControl('');
}

describe('ExtraInputTextComponent — канонический API лейбла', () => {
  let fixture: ComponentFixture<FloatLabelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FloatLabelHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(FloatLabelHostComponent);
    fixture.detectChanges();
  });

  it('floatLabel перекрывает labelPosition="left"', () => {
    expect(fixture.nativeElement.querySelector('.p-floatlabel')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.extra-inputtext--left')).toBeNull();
  });
});
