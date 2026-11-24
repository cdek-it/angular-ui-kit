import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ExtraTextareaComponent } from './textarea.component';

@Component({
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: `<extra-textarea [formControl]="control"></extra-textarea>`
})
class HostComponent {
  control = new FormControl('');
}

describe('ExtraTextareaComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('передаёт disabled в нативный textarea', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea.disabled).toBeTrue();
  });
});
