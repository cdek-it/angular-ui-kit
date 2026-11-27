import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

import { ExtraSelectComponent } from './select.component';

@Component({
  standalone: true,
  imports: [ExtraSelectComponent],
  template: `
    <extra-select
      [options]="options"
      optionLabel="name"
      optionGroupLabel="name"
      optionGroupChildren="items"
      [group]="true"
    ></extra-select>
  `
})
class GroupedHostComponent {
  options = [
    { name: 'Германия', items: [{ name: 'Берлин' }, { name: 'Гамбург' }] },
    { name: 'США', items: [{ name: 'Чикаго' }, { name: 'Нью-Йорк' }] }
  ];
}

@Component({
  standalone: true,
  imports: [ExtraSelectComponent],
  template: `<extra-select [editable]="true" [options]="[]"></extra-select>`
})
class EditableHostComponent {}

describe('ExtraSelectComponent: семантика', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedHostComponent, EditableHostComponent],
      providers: [provideNoopAnimations(), providePrimeNG({})]
    }).compileComponents();
  });

  afterEach(() => {
    document.querySelectorAll('.p-select-overlay').forEach((overlay) => overlay.remove());
  });

  it('заголовки групп не объявляются опциями', async () => {
    const fixture: ComponentFixture<GroupedHostComponent> = TestBed.createComponent(GroupedHostComponent);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('[role=combobox]') as HTMLElement).click();
    await fixture.whenStable();

    const groups = Array.from(document.querySelectorAll('.p-select-option-group'));
    expect(groups.length).toBe(2);
    expect(groups.map((group) => group.getAttribute('role'))).toEqual(['presentation', 'presentation']);
  });

  it('editable-поле объявлено combobox с aria-expanded', async () => {
    const fixture: ComponentFixture<EditableHostComponent> = TestBed.createComponent(EditableHostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input.p-select-label');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });
});
