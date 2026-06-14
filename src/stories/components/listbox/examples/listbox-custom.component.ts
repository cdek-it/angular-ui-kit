import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent, ExtraListboxItemDirective } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { name: 'Profile', description: 'Manage your account', icon: 'ti ti-user' },
  { name: 'Settings', description: 'App preferences', icon: 'ti ti-settings' },
  { name: 'Messages', description: 'Your inbox', icon: 'ti ti-message' }
];

const template = `
<extra-listbox [formControl]="ctrl" [options]="options" optionLabel="name">
  <ng-template extraListboxItem let-item>
    <i [class]="item.icon"></i>
    <div class="p-listbox-option-label-group">
      <span>{{ item.name }}</span>
      <small class="p-listbox-option-caption">{{ item.description }}</small>
    </div>
  </ng-template>
</extra-listbox>
`;

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [ExtraListboxComponent, ExtraListboxItemDirective, ReactiveFormsModule],
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
      description: { story: 'Кастомный шаблон элемента с иконкой и подписью через директиву `extraListboxItem`.' },
      source: {
        language: 'ts',
        code: `
import { ExtraListboxComponent, ExtraListboxItemDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [ExtraListboxComponent, ExtraListboxItemDirective, ReactiveFormsModule],
  template: \`
    <extra-listbox [formControl]="ctrl" [options]="options" optionLabel="name">
      <ng-template extraListboxItem let-item>
        <i [class]="item.icon"></i>
        <div class="p-listbox-option-label-group">
          <span>{{ item.name }}</span>
          <small class="p-listbox-option-caption">{{ item.description }}</small>
        </div>
      </ng-template>
    </extra-listbox>
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
