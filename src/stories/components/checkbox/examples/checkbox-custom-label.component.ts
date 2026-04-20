import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-custom-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, ReactiveFormsModule],
  styles,
  template: `
    <div class="flex items-center gap-3.5">
      @if (labelPosition === 'left') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true" [invalid]="invalid"></checkbox>
      }
      <div class="flex flex-col gap-[3.5px]">
        <label [for]="inputId" [class]="labelClass">{{ label }}</label>
        @if (caption) {
          <span [class]="captionClass">{{ caption }}</span>
        }
      </div>
      @if (labelPosition === 'right') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true" [invalid]="invalid"></checkbox>
      }
    </div>
  `,
})
export class CheckboxCustomLabelComponent {
  @Input() label = 'Checkbox';
  @Input() caption = 'caption';
  @Input() labelPosition: 'left' | 'right' = 'left';
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() inputId = 'custom-checkbox';

  formControl = new FormControl(false);

  get labelClass(): string {
    return this.disabled ? 'checkbox-label checkbox-label--disabled' : 'checkbox-label';
  }

  get captionClass(): string {
    return this.disabled ? 'checkbox-caption checkbox-caption--disabled' : 'checkbox-caption';
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}

export const CustomLabel: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `
      <app-checkbox-custom-label
        [label]="label"
        [caption]="caption"
        [labelPosition]="labelPosition"
        [invalid]="invalid"
        [disabled]="disabled"
        inputId="custom-label"
      ></app-checkbox-custom-label>
    `,
  }),
  args: {
    label: 'Checkbox',
    caption: 'caption',
    labelPosition: 'left',
    invalid: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки',
      table: { category: 'Props' },
    },
    caption: {
      control: 'text',
      description: 'Подпись под меткой',
      table: { category: 'Props' },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция чекбокса относительно метки',
      table: { category: 'Props', defaultValue: { summary: 'left' } },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Чекбокс с label и caption. Управляйте состоянием через Controls.',
      },
      source: {
        language: 'ts',
        code: `
import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-custom-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: \`
    <div class="flex items-center gap-3.5">
      @if (labelPosition === 'left') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true" [invalid]="invalid"></checkbox>
      }
      <div class="flex flex-col gap-[3.5px]">
        <label [for]="inputId" [class]="labelClass">{{ label }}</label>
        @if (caption) {
          <span [class]="captionClass">{{ caption }}</span>
        }
      </div>
      @if (labelPosition === 'right') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true" [invalid]="invalid"></checkbox>
      }
    </div>
  \`,
})
export class CheckboxCustomLabelComponent implements OnChanges {
  @Input() label = 'Checkbox';
  @Input() caption = 'caption';
  @Input() labelPosition: 'left' | 'right' = 'left';
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() inputId = 'custom-checkbox';

  formControl = new FormControl(false);

  get labelClass(): string {
    return this.disabled ? 'checkbox-label checkbox-label--disabled' : 'checkbox-label';
  }

  get captionClass(): string {
    return this.disabled ? 'checkbox-caption checkbox-caption--disabled' : 'checkbox-caption';
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
        `,
      },
    },
  },
};
