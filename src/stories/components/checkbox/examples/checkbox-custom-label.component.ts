import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

@Component({
  selector: 'app-checkbox-custom-label',
  standalone: true,
  imports: [CheckboxComponent, ReactiveFormsModule],
  styles: [`
    .custom-label-wrapper {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .label-container {
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }

    .label-text {
      color: var(--text-color, #2B2E33);
      font-family: var(--typography-font-family-base, "PT Sans");
      font-size: var(--typography-font-size-text-base, 14px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
    }

    .label-text.hover {
      color: var(--text-primary-color, #1DC831);
    }

    .label-text.disabled {
      color: var(--text-muted-color, #85888E);
      cursor: default;
    }

    .caption-text {
      color: var(--text-secondary-color, #6D7076);
      font-family: var(--typography-font-family-heading, "TT Fellows");
      font-size: var(--typography-font-size-text-sm, 12.25px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .caption-text.hover {
      color: var(--text-primary-color, #1DC831);
    }

    .caption-text.disabled {
      color: var(--text-disabled-color, #CECFD2);
    }
  `],
  template: `
    <div class="custom-label-wrapper">
      @if (labelPosition === 'left') {
        <checkbox
          [formControl]="formControl"
          [inputId]="inputId"
          [binary]="true"
        ></checkbox>
      }
      <div class="label-container">
        <label [for]="inputId" [class]="'label-text ' + state">{{ label }}</label>
        @if (caption) {
          <span [class]="'caption-text ' + state">{{ caption }}</span>
        }
      </div>
      @if (labelPosition === 'right') {
        <checkbox
          [formControl]="formControl"
          [inputId]="inputId"
          [binary]="true"
        ></checkbox>
      }
    </div>
  `,
})
export class CheckboxCustomLabelComponent {
  @Input() label = 'Checkbox';
  @Input() caption = 'caption';
  @Input() labelPosition: 'left' | 'right' = 'left';
  @Input() state: 'default' | 'hover' | 'disabled' = 'default';
  @Input() inputId = 'custom-checkbox';

  formControl = new FormControl(false);

  ngOnChanges(): void {
    if (this.state === 'disabled') {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}

export const CustomLabel: StoryObj = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <app-checkbox-custom-label
          label="Checkbox"
          caption="caption"
          labelPosition="left"
          state="default"
          inputId="cl-default"
        ></app-checkbox-custom-label>
        <app-checkbox-custom-label
          label="Checkbox"
          caption="caption"
          labelPosition="left"
          state="hover"
          inputId="cl-hover"
        ></app-checkbox-custom-label>
        <app-checkbox-custom-label
          label="Checkbox"
          caption="caption"
          labelPosition="left"
          state="disabled"
          inputId="cl-disabled"
        ></app-checkbox-custom-label>
        <app-checkbox-custom-label
          label="Checkbox"
          caption="caption"
          labelPosition="right"
          state="default"
          inputId="cl-right"
        ></app-checkbox-custom-label>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Чекбокс с label и caption. Состояния: default, hover, disabled. Позиция метки: left / right.',
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
  imports: [CheckboxComponent, ReactiveFormsModule],
  styles: [\`
    .custom-label-wrapper {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .label-container {
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }
    .label-text {
      color: var(--text-color, #2B2E33);
      font-family: var(--typography-font-family-base, "PT Sans");
      font-size: var(--typography-font-size-text-base, 14px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
    }
    .label-text.disabled { color: var(--text-muted-color, #85888E); cursor: default; }
    .caption-text {
      color: var(--text-secondary-color, #6D7076);
      font-family: var(--typography-font-family-heading, "TT Fellows");
      font-size: var(--typography-font-size-text-sm, 12.25px);
      font-weight: 400;
      line-height: normal;
    }
    .caption-text.disabled { color: var(--text-disabled-color, #CECFD2); }
  \`],
  template: \`
    <div class="custom-label-wrapper">
      @if (labelPosition === 'left') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true"></checkbox>
      }
      <div class="label-container">
        <label [for]="inputId" [class]="'label-text ' + state">{{ label }}</label>
        @if (caption) {
          <span [class]="'caption-text ' + state">{{ caption }}</span>
        }
      </div>
      @if (labelPosition === 'right') {
        <checkbox [formControl]="formControl" [inputId]="inputId" [binary]="true"></checkbox>
      }
    </div>
  \`,
})
export class CheckboxCustomLabelComponent implements OnChanges {
  @Input() label = 'Checkbox';
  @Input() caption = 'caption';
  @Input() labelPosition: 'left' | 'right' = 'left';
  @Input() state: 'default' | 'hover' | 'disabled' = 'default';
  @Input() inputId = 'custom-checkbox';

  formControl = new FormControl(false);

  ngOnChanges(): void {
    if (this.state === 'disabled') {
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
