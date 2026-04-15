import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { Listbox } from 'primeng/listbox';

const options = [
  { name: 'Профиль', description: 'Управление аккаунтом', icon: 'ti ti-user' },
  { name: 'Настройки', description: 'Параметры приложения', icon: 'ti ti-settings' },
  { name: 'Сообщения', description: 'Ваш почтовый ящик', icon: 'ti ti-message' },
];

const template = `
<p-listbox [formControl]="ctrl" [options]="options" optionLabel="name">
  <ng-template #option let-item>
    <div class="flex items-center gap-2">
      <i [class]="item.icon"></i>
      <div class="p-listbox-option-label-group">
        <span>{{ item.name }}</span>
        <small class="p-listbox-option-caption">{{ item.description }}</small>
      </div>
    </div>
  </ng-template>
</p-listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [Listbox, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxCustomComponent {
  ctrl = new FormControl(null);
  options = options;
}

export const Custom: StoryObj = {
  render: () => ({
    template: `<app-listbox-custom></app-listbox-custom>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон элемента с иконкой и подписью.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

@Component({
  selector: 'app-listbox-custom',
  standalone: true,
  imports: [Listbox, ReactiveFormsModule],
  template: \`
    <p-listbox [formControl]="ctrl" [options]="options" optionLabel="name">
      <ng-template #option let-item>
        <div class="flex items-center gap-2">
          <i [class]="item.icon"></i>
          <div class="p-listbox-option-label-group">
            <span>{{ item.name }}</span>
            <small class="p-listbox-option-caption">{{ item.description }}</small>
          </div>
        </div>
      </ng-template>
    </p-listbox>
  \`,
})
export class ListboxCustomComponent {
  ctrl = new FormControl(null);
  options = [
    { name: 'Профиль', description: 'Управление аккаунтом', icon: 'ti ti-user' },
    { name: 'Настройки', description: 'Параметры приложения', icon: 'ti ti-settings' },
    { name: 'Сообщения', description: 'Ваш почтовый ящик', icon: 'ti ti-message' },
  ];
}
        `,
      },
    },
  },
};
