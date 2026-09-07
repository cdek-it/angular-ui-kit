import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<div class="flex flex-col gap-3">
  <extra-checkbox
    [formControl]="parentControl"
    [indeterminate]="isIndeterminate"
    (onChange)="onParentChange($event.checked)"
    label="Выбрать всё"
  ></extra-checkbox>
  <div class="flex flex-col gap-2 pl-6" [formGroup]="childrenGroup">
    <extra-checkbox formControlName="pizza" label="Pizza" (onChange)="onChildChange()"></extra-checkbox>
    <extra-checkbox formControlName="burger" label="Burger" (onChange)="onChildChange()"></extra-checkbox>
    <extra-checkbox formControlName="sushi" label="Sushi" (onChange)="onChildChange()"></extra-checkbox>
  </div>
</div>
`;

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template
})
export class CheckboxIndeterminateComponent {
  childrenGroup = new FormGroup({
    pizza: new FormControl(true),
    burger: new FormControl(false),
    sushi: new FormControl(false)
  });

  parentControl = new FormControl(false);
  isIndeterminate = true;

  constructor() {
    this.updateParentState();
  }

  onParentChange(checked: boolean): void {
    this.childrenGroup.setValue({ pizza: checked, burger: checked, sushi: checked });
    this.isIndeterminate = false;
  }

  onChildChange(): void {
    this.updateParentState();
  }

  private updateParentState(): void {
    const values = Object.values(this.childrenGroup.value);
    const checkedCount = values.filter(Boolean).length;

    this.parentControl.setValue(checkedCount === values.length, { emitEvent: false });
    this.isIndeterminate = checkedCount > 0 && checkedCount < values.length;
  }
}

export const Indeterminate: StoryObj = {
  render: () => ({
    template: `<app-checkbox-indeterminate></app-checkbox-indeterminate>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Indeterminate — неопределённое состояние родительского чекбокса при частичном выборе дочерних.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <extra-checkbox
      [formControl]="parentControl"
      [indeterminate]="isIndeterminate"
      (onChange)="onParentChange($event.checked)"
      label="Выбрать всё"
    ></extra-checkbox>

    <div [formGroup]="childrenGroup">
      <extra-checkbox formControlName="pizza" label="Pizza" (onChange)="onChildChange()"></extra-checkbox>
      <extra-checkbox formControlName="burger" label="Burger" (onChange)="onChildChange()"></extra-checkbox>
      <extra-checkbox formControlName="sushi" label="Sushi" (onChange)="onChildChange()"></extra-checkbox>
    </div>
  \`,
})
export class CheckboxIndeterminateComponent {
  childrenGroup = new FormGroup({
    pizza: new FormControl(true),
    burger: new FormControl(false),
    sushi: new FormControl(false),
  });

  parentControl = new FormControl(false);
  isIndeterminate = true;

  onParentChange(checked: boolean): void {
    this.childrenGroup.setValue({ pizza: checked, burger: checked, sushi: checked });
    this.isIndeterminate = false;
  }

  onChildChange(): void {
    const values = Object.values(this.childrenGroup.value);
    const checkedCount = values.filter(Boolean).length;

    this.parentControl.setValue(checkedCount === values.length, { emitEvent: false });
    this.isIndeterminate = checkedCount > 0 && checkedCount < values.length;
  }
}
        `
      }
    }
  }
};
