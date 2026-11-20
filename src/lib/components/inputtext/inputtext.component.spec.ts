import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
