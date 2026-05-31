import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { name: 'Profile', description: 'Manage your account', icon: 'ti ti-user' },
  { name: 'Settings', description: 'App preferences', icon: 'ti ti-settings' },
  { name: 'Messages', description: 'Your inbox', icon: 'ti ti-message' }
];

const template = `
<extra-listbox [formControl]="ctrl" [options]="options" optionLabel="name" [itemTemplate]="customItem"></extra-listbox>

<ng-template #customItem let-item>
  <i [class]="item.icon"></i>
  <div class="p-listbox-option-label-group">
    <span>{{ item.name }}</span>
    <small class="p-listbox-option-caption">{{ item.description }}</small>
  </div>
</ng-template>
`;

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template
})
export class ListboxCustomComponent {
  ctrl = new FormControl(null);
  options = options;
}

export const Custom: StoryObj = {
  render: () => ({
    template: `<app-listbox-custom></app-listbox-custom>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Кастомный шаблон элемента с иконкой и подписью через `itemTemplate`.' },
      source: {
        language: 'ts',
        code: `
import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template: \`
    <extra-listbox [formControl]="ctrl" [options]="options" optionLabel="name" [itemTemplate]="customItem"></extra-listbox>

    <ng-template #customItem let-item>
      <i [class]="item.icon"></i>
      <div class="p-listbox-option-label-group">
        <span>{{ item.name }}</span>
        <small class="p-listbox-option-caption">{{ item.description }}</small>
      </div>
    </ng-template>
  \`,
})
export class ListboxCustomComponent {
  ctrl = new FormControl(null);
  options = [
    { name: 'Profile', description: 'Manage your account', icon: 'ti ti-user' },
    { name: 'Settings', description: 'App preferences', icon: 'ti ti-settings' },
    { name: 'Messages', description: 'Your inbox', icon: 'ti ti-message' },
  ];
}
        `
      }
    }
  }
};
